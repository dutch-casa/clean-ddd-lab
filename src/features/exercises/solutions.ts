export type ExerciseSolution = {
  name: string;
  code: string;
};

export const exerciseSolutions: ExerciseSolution[] = [
  {
    name: 'Money Value Object',
    code: `namespace Domain.ValueObjects;

// This is a VALUE OBJECT - an immutable object defined by its attributes
// In Domain-Driven Design, Value Objects represent concepts that:
// 1. Have no unique identity (two Money objects with same amount/currency are identical)
// 2. Are immutable (cannot be changed after creation)
// 3. Are compared by their values, not by reference

// The 'readonly record struct' makes this immutable by default
public readonly record struct Money(decimal Amount, string Currency)
{
  // FACTORY METHOD pattern - the preferred way to create Value Objects
  // This enforces business rules at creation time, making invalid states impossible
  public static Money Create(decimal amount, string currency)
  {
    // DOMAIN INVARIANT #1: Amount must be non-negative
    // This is a business rule that protects data integrity
    // By enforcing this here, we guarantee that no Money object can ever have negative value
    if (amount < 0)
      throw new ArgumentException("Amount cannot be negative", nameof(amount));

    // DOMAIN INVARIANT #2: Currency must be a valid 3-letter ISO code
    // Clean Architecture principle: Business rules live in the domain, not the database
    if (string.IsNullOrWhiteSpace(currency))
      throw new ArgumentException("Currency is required", nameof(currency));

    // Currency codes are always 3 uppercase letters (USD, EUR, GBP, etc.)
    if (currency.Length != 3 || !currency.All(char.IsUpper))
      throw new ArgumentException("Currency must be a 3-letter uppercase code", nameof(currency));

    // Once validation passes, create the Value Object
    // Because it's immutable, we know it will always be in a valid state
    return new Money(amount, currency);
  }
}

// WHY THIS MATTERS (Clean Architecture):
// - The domain layer has NO dependencies on infrastructure
// - No database, no frameworks, just pure business logic
// - This Money class can be tested without any external dependencies
// - It enforces invariants that protect business rules across the entire system`,
  },
  {
    name: 'Ride Entity',
    code: `namespace Domain.Entities;

// ENTITY STATUS - This is often called a "state machine"
// It defines the valid states our Ride can be in
// In DDD, entities often transition through well-defined states
public enum RideStatus { Requested, Accepted, Completed }

// This is an ENTITY - an object with a unique identity that persists over time
// In Domain-Driven Design, Entities:
// 1. Have a unique identifier (Id) that doesn't change
// 2. Can have mutable attributes that change over time
// 3. Are compared by their identity, not their attributes
// 4. Contain domain logic and enforce business rules

public class Ride
{
  // IDENTITY - The Id makes this an Entity
  // Two Rides with the same Id are the SAME ride, even if other properties differ
  // This is different from Value Objects, where equality is based on values
  public Guid Id { get; }

  // IMMUTABLE ATTRIBUTES - Set once at creation, never change
  // PassengerId represents a relationship to another entity
  // In Clean Architecture, we reference other aggregates by ID, not by direct reference
  public Guid PassengerId { get; }

  // MUTABLE ATTRIBUTES - Can change during the entity's lifetime
  // Note: private set - only THIS entity can change its own state
  // This is encapsulation - external code cannot directly modify the state
  public Guid? DriverId { get; private set; }
  public RideStatus Status { get; private set; }

  // CONSTRUCTOR - Creates the entity in a valid initial state
  // Clean Architecture: Entities are created through constructors or factories
  // They start in a consistent, valid state
  public Ride(Guid passengerId)
  {
    // Generate a new unique identity
    Id = Guid.NewGuid();

    // Set immutable attributes
    PassengerId = passengerId;

    // Set initial state - all rides start as Requested
    // This is a business rule: rides don't start as Accepted or Completed
    Status = RideStatus.Requested;

    // DriverId is null initially - no driver assigned yet
  }

  // DOMAIN METHOD - This is where business logic lives
  // Not in a service, not in a controller, but IN THE ENTITY
  // This method enforces the business rule: "Only requested rides can be assigned a driver"
  public void AssignDriver(Guid driverId)
  {
    // GUARD CLAUSE - Enforce state transition rules
    // This is a domain invariant: you can only assign a driver to a Requested ride
    // If someone tries to assign a driver to an already-accepted or completed ride,
    // they're violating a business rule
    if (Status != RideStatus.Requested)
      throw new InvalidOperationException(
        $"Cannot assign driver to ride in {Status} status. Must be Requested."
      );

    // State transition: Requested -> Accepted
    // The entity controls its own state changes
    DriverId = driverId;
    Status = RideStatus.Accepted;

    // Clean Architecture principle: The entity enforces its own invariants
    // External code cannot put the entity in an invalid state
  }

  // DOMAIN METHOD - Complete the ride
  // Business rule: "Only accepted rides with a driver can be completed"
  public void Complete()
  {
    // GUARD CLAUSE #1: Must be in Accepted status
    // Can't complete a ride that hasn't been accepted yet
    if (Status != RideStatus.Accepted)
      throw new InvalidOperationException(
        $"Cannot complete ride in {Status} status. Must be Accepted."
      );

    // GUARD CLAUSE #2: Must have a driver assigned
    // This is an invariant: a ride cannot be completed without a driver
    if (DriverId == null)
      throw new InvalidOperationException(
        "Cannot complete ride without an assigned driver."
      );

    // State transition: Accepted -> Completed
    Status = RideStatus.Completed;
  }
}

// WHY THIS MATTERS (Domain-Driven Design):
// - Business logic is in the domain, not scattered across services
// - The entity protects itself from invalid state transitions
// - You cannot create a Ride in an invalid state
// - State changes go through well-defined methods that enforce business rules
// - This is "Tell, Don't Ask" - we tell the entity what to do, it decides how`,
  },
  {
    name: 'Ride Aggregate',
    code: `namespace Domain.Aggregates;
using Domain.Entities;

// This is an AGGREGATE - a cluster of related entities and value objects
// that are treated as a single unit for data changes
//
// In Domain-Driven Design, Aggregates:
// 1. Have a ROOT entity (the Ride in this case)
// 2. Define a consistency boundary - all changes go through the aggregate, NOT the root directly
// 3. Enforce invariants across multiple entities
// 4. Are the unit of persistence - you save/load the whole aggregate

public class RideAggregate
{
  // AGGREGATE ROOT - The entity inside the aggregate
  // IMPORTANT: This is PRIVATE in proper DDD - external code should NOT access it directly
  // All operations go through the aggregate's public methods
  private readonly Ride _root;

  // Public read-only access to the root's data for querying
  public Guid Id => _root.Id;
  public Guid PassengerId => _root.PassengerId;
  public Guid? DriverId => _root.DriverId;
  public RideStatus Status => _root.Status;

  // CONSTRUCTOR - Creates the aggregate with its root
  // An aggregate cannot exist without its root entity
  public RideAggregate(Guid passengerId)
  {
    // The aggregate creates and owns the root
    _root = new Ride(passengerId);
  }

  // DOMAIN METHODS - The ONLY way to change the aggregate from outside
  // This is the key difference: external code calls the AGGREGATE, not the entity
  public void AssignDriver(Guid driverId)
  {
    // GUARD CLAUSE - Check business rules before making changes
    if (Status != RideStatus.Requested)
      throw new InvalidOperationException(
        $"Cannot assign driver to ride in {Status} status. Must be Requested."
      );

    // Make the change through the root entity
    _root.AssignDriver(driverId);

    // INVARIANT CHECK - Ensure all rules still hold after the change
    EnforceInvariants();
  }

  public void Complete()
  {
    // GUARD CLAUSE #1: Must be in Accepted status
    if (Status != RideStatus.Accepted)
      throw new InvalidOperationException(
        $"Cannot complete ride in {Status} status. Must be Accepted."
      );

    // GUARD CLAUSE #2: Must have a driver (AGGREGATE INVARIANT)
    // This is the key: the aggregate enforces rules that span the boundary
    if (DriverId == null)
      throw new InvalidOperationException(
        "Cannot complete ride without an assigned driver."
      );

    // Make the change
    _root.Complete();

    // Verify invariants still hold
    EnforceInvariants();
  }

  // INVARIANT ENFORCEMENT - Business rules that must ALWAYS be true
  // The aggregate is the guardian of these rules
  private void EnforceInvariants()
  {
    // INVARIANT: "A ride cannot be completed without a driver"
    // This is a cross-cutting rule that involves multiple properties
    if (Status == RideStatus.Completed && DriverId == null)
      throw new InvalidOperationException(
        "Aggregate invariant violated: Cannot complete a ride without an assigned driver"
      );

    // In a real system, you might have more invariants:
    // - "Cannot have more than 4 passengers"
    // - "Pickup and dropoff must be in service area"
    // - "Ride duration cannot exceed 24 hours"
    // All of these would be checked here
  }

  // FACTORY METHOD - Alternative way to create from existing entity
  // Used when loading from database
  public static RideAggregate FromEntity(Ride ride)
  {
    return new RideAggregate(ride);
  }

  private RideAggregate(Ride ride)
  {
    _root = ride ?? throw new ArgumentNullException(nameof(ride));
    EnforceInvariants(); // Always verify on construction
  }

  // ACCESS TO ROOT - Only for persistence layer
  // This breaks encapsulation slightly, but needed for OR/M mapping
  internal Ride GetRoot() => _root;
}

// WHY THIS MATTERS (Clean Architecture & DDD):
//
// 1. CONSISTENCY BOUNDARY: Changes to Ride MUST go through the aggregate
//    External code CANNOT bypass it and modify Ride directly
//    This is enforced by making _root private
//
// 2. TRANSACTION BOUNDARY: When you save a RideAggregate to the database,
//    you save ALL of it in one transaction
//
// 3. INVARIANT PROTECTION: Business rules that span multiple objects
//    are enforced in one place, preventing invalid states
//
// 4. TELL, DON'T ASK: External code tells the aggregate what to do
//    (AssignDriver, Complete), not asking for the root and manipulating it
//
// 5. TESTABILITY: You can test all business logic without a database,
//    without a framework, without any external dependencies

// AGGREGATE DESIGN RULES (from Eric Evans' DDD):
// - Keep aggregates small (ideally just the root)
// - Reference other aggregates by ID only, not by direct reference
// - Use eventual consistency between aggregates
// - Enforce invariants ONLY within the aggregate boundary
// - External objects can only hold references to the Aggregate, not entities inside`,
  },
  {
    name: 'Request Ride Use Case',
    code: `namespace Application.UseCases;
using Domain.Entities;
using Application.Ports;

// INPUT DTO (Data Transfer Object) - Crosses the application boundary
// This represents the request coming from the outside world (UI, API, etc.)
// In Clean Architecture, DTOs keep the domain isolated from external formats
public record Request(Guid PassengerId);

// OUTPUT DTO - The response going back out
// Again, this is a boundary object that doesn't expose domain internals
public record Response(Guid RideId);

// REPOSITORY PORT (Interface) - This is the key to Dependency Inversion
// The application layer defines WHAT it needs (an interface)
// The infrastructure layer provides HOW it works (implementation)
// This keeps the core business logic independent of databases
public interface IRideRepository
{
  // Async methods because I/O operations should be asynchronous
  // This is a PORT - it defines the contract for persistence
  Task Save(Ride ride);
  Task<Ride?> Get(Guid id);
}

// USE CASE - This is APPLICATION LOGIC (not domain logic)
// Use Cases orchestrate domain objects to fulfill a specific user goal
// They represent the "business processes" or "workflows" of your application
//
// In Clean Architecture:
// - Use Cases are in the Application Layer
// - They coordinate Entities and Value Objects (domain layer)
// - They depend on Ports (interfaces) for infrastructure needs
// - They are the entry point for all application operations

public class RequestRideUseCase
{
  // DEPENDENCY INJECTION - Constructor injection of ports
  // This is the Dependency Inversion Principle in action:
  // We depend on an abstraction (IRideRepository), not a concrete database
  private readonly IRideRepository repo;

  public RequestRideUseCase(IRideRepository repo) =>
    this.repo = repo ?? throw new ArgumentNullException(nameof(repo));

  // EXECUTE METHOD - The single public method that executes the use case
  // This follows the Single Responsibility Principle
  // Input: Request DTO from outside world
  // Output: Response DTO to outside world
  public async Task<Response> ExecuteAsync(Request req, CancellationToken ct = default)
  {
    // STEP 1: CREATE DOMAIN ENTITY
    // Use the domain's constructor to create a new Ride
    // The entity enforces its own business rules at creation
    // We're in the domain now - pure business logic, no infrastructure
    var ride = new Ride(req.PassengerId);

    // At this point, the ride is in memory and in a valid state
    // The Ride entity's constructor ensures this

    // STEP 2: PERSIST THROUGH PORT
    // We don't know HOW it's saved (SQL? NoSQL? In-memory? File?)
    // We only know THAT it's saved, through the interface
    // This is the Dependency Inversion Principle:
    // High-level policy (use case) doesn't depend on low-level details (database)
    await repo.Save(ride);

    // Clean Architecture: The use case doesn't know about:
    // - Connection strings
    // - ORM frameworks (Entity Framework, Dapper, etc.)
    // - Table schemas
    // - Database types
    // All of that is in the infrastructure layer, implementing IRideRepository

    // STEP 3: RETURN RESPONSE DTO
    // Extract just the data we need for the response
    // Don't return the domain entity directly - that would couple
    // the outside world to our internal domain model
    return new Response(ride.Id);
  }
}

// WHY THIS MATTERS (Clean Architecture Principles):
//
// 1. INDEPENDENCE OF FRAMEWORKS:
//    This code doesn't depend on ASP.NET, Express, or any web framework
//    It's just pure C# that could run anywhere
//
// 2. TESTABILITY:
//    You can test this with a fake repository (in-memory implementation)
//    No database needed for unit tests
//
// 3. INDEPENDENCE OF UI:
//    The same use case works with REST API, GraphQL, CLI, or desktop UI
//    The UI adapts to the use case, not the other way around
//
// 4. INDEPENDENCE OF DATABASE:
//    Switch from SQL Server to PostgreSQL to MongoDB?
//    Just provide a different IRideRepository implementation
//    This use case doesn't change at all
//
// 5. BUSINESS RULES ARE PROTECTED:
//    Domain logic (in Ride entity) is separate from application logic
//    The use case orchestrates, the entity enforces
//
// 6. SCREAMING ARCHITECTURE:
//    Looking at this code, it's obvious what the business does
//    It "requests a ride" - the architecture screams the intent

// Example test (you would write this in a test project):
/*
public class RequestRideUseCaseTests
{
  [Fact]
  public async Task ShouldCreateRideWithPassengerId()
  {
    // Arrange - Create a fake repository (no database!)
    var fakeRepo = new InMemoryRideRepository();
    var useCase = new RequestRideUseCase(fakeRepo);
    var request = new Request(Guid.NewGuid());

    // Act - Execute the use case
    var response = await useCase.ExecuteAsync(request);

    // Assert - Verify behavior
    var savedRide = await fakeRepo.Get(response.RideId);
    Assert.NotNull(savedRide);
    Assert.Equal(request.PassengerId, savedRide.PassengerId);
    Assert.Equal(RideStatus.Requested, savedRide.Status);
  }
}
*/`,
  },
];
