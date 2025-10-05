import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slideshow } from '@/shared/components';

/**
 * Use Case Interactive Slideshow
 * Teaches the Use Case pattern: application orchestration layer
 */

export function UseCaseSlides() {
  const slides = [
    // Slide 1: What is a Use Case?
    {
      title: "What is a Use Case?",
      content: (
        <div className="space-y-6">
          <div className="card bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3">Use Cases = User Actions</h4>
            <p className="text-sm text-gray-700 mb-4">
              A Use Case represents <strong>one thing a user can do</strong> in your application.
              It's the glue that connects the outside world (UI, API) to your domain logic (entities, aggregates).
            </p>

            <div className="grid md:grid-cols-3 gap-3">
              <motion.div
                className="bg-white border-2 border-blue-300 rounded-lg p-4 text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-3xl mb-2">🚗</div>
                <p className="font-semibold text-sm">RequestRide</p>
                <p className="text-xs text-gray-600">User requests a ride</p>
              </motion.div>

              <motion.div
                className="bg-white border-2 border-blue-300 rounded-lg p-4 text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl mb-2">❌</div>
                <p className="font-semibold text-sm">CancelRide</p>
                <p className="text-xs text-gray-600">User cancels a ride</p>
              </motion.div>

              <motion.div
                className="bg-white border-2 border-blue-300 rounded-lg p-4 text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-3xl mb-2">✅</div>
                <p className="font-semibold text-sm">CompleteRide</p>
                <p className="text-xs text-gray-600">Driver completes ride</p>
              </motion.div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card bg-purple-50 border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Not a Use Case</h4>
              <ul className="text-sm space-y-1">
                <li>❌ "Get all rides" (just a query)</li>
                <li>❌ "Update database" (too technical)</li>
                <li>❌ "Process data" (too vague)</li>
                <li>❌ "Handle request" (too generic)</li>
              </ul>
            </div>

            <div className="card bg-green-50 border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Is a Use Case</h4>
              <ul className="text-sm space-y-1">
                <li>✅ "Request a ride" (clear user action)</li>
                <li>✅ "Assign driver to ride" (specific business operation)</li>
                <li>✅ "Apply promo code" (domain logic)</li>
                <li>✅ "Rate completed ride" (user feature)</li>
              </ul>
            </div>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              <strong>For complete beginners:</strong> If you can describe it as "User does X" or "System does Y",
              it's probably a Use Case. Think of the features list in your app—each feature is a Use Case.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 2: Use Cases Orchestrate Domain Logic
    {
      title: "Use Cases Orchestrate, Entities Enforce",
      content: (
        <div className="space-y-6">
          <div className="card">
            <h4 className="font-semibold mb-4">Division of Responsibility</h4>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Domain Layer */}
              <motion.div
                className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h5 className="font-semibold text-purple-900 mb-3">Domain (Entities/Aggregates)</h5>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Business rules</strong> - the "what"
                </p>
                <div className="bg-white p-3 rounded text-xs font-mono">
{`class Ride {
  void AssignDriver(Guid id) {
    // Rule: Only Requested rides
    if (Status != Requested)
      throw ...;

    DriverId = id;
    Status = Accepted;
  }
}`}
                </div>
                <p className="text-xs text-purple-700 mt-2">
                  "A ride can only be assigned a driver if it's in Requested status"
                </p>
              </motion.div>

              {/* Application Layer */}
              <motion.div
                className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h5 className="font-semibold text-blue-900 mb-3">Application (Use Cases)</h5>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Workflow orchestration</strong> - the "how"
                </p>
                <div className="bg-white p-3 rounded text-xs font-mono">
{`class AssignDriverUseCase {
  async Execute(req) {
    // 1. Get aggregate
    var ride = await repo.Get(
      req.RideId
    );

    // 2. Apply business logic
    ride.AssignDriver(
      req.DriverId
    );

    // 3. Persist changes
    await repo.Save(ride);

    // 4. Return result
    return new Response(
      ride.Id
    );
  }
}`}
                </div>
                <p className="text-xs text-blue-700 mt-2">
                  Coordinates: fetch → apply logic → save → respond
                </p>
              </motion.div>
            </div>
          </div>

          <div className="card bg-yellow-50 border-yellow-300">
            <div className="flex gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">Common Mistake: Fat Use Cases</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Don't put business logic in Use Cases! That belongs in entities/aggregates.
                  Use Cases should be <em>thin orchestration layers</em>.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-red-50 border border-red-200 rounded p-2">
                    <p className="font-semibold text-red-700 mb-1">❌ Wrong</p>
                    <pre className="font-mono">
{`// Business logic in use case
if (ride.Status != Requested)
  throw ...;
ride.DriverId = driverId;
ride.Status = Accepted;`}
                    </pre>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-2">
                    <p className="font-semibold text-green-700 mb-1">✅ Right</p>
                    <pre className="font-mono">
{`// Delegate to entity
ride.AssignDriver(driverId);
// Entity enforces rules`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> This is the Single Responsibility Principle at the architectural level.
              Use Cases handle application concerns (transaction management, orchestration), while Entities handle
              domain concerns (business rules, invariants). This separation enables independent evolution of each layer.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 3: Input/Output DTOs
    {
      title: "Use Cases Use DTOs (Data Transfer Objects)",
      content: (
        <div className="space-y-6">
          <div className="card bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3">Why DTOs?</h4>
            <p className="text-sm text-gray-700">
              DTOs are simple data containers that cross the application boundary.
              They keep the domain isolated from external formats (JSON, XML, etc.).
            </p>
          </div>

          <div className="card">
            <h4 className="font-semibold mb-4">Anatomy of a Use Case</h4>
            <motion.div
              className="bg-gray-50 p-4 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <pre className="text-xs font-mono">
{`// INPUT DTO - comes from outside world (API, UI, CLI)
public record RequestRideRequest(Guid PassengerId, string Pickup, string Dropoff);

// OUTPUT DTO - goes back to outside world
public record RequestRideResponse(Guid RideId, DateTime CreatedAt);

// USE CASE - orchestrates domain logic
public class RequestRideUseCase {
  private readonly IRideRepository _repo;

  public RequestRideUseCase(IRideRepository repo) => _repo = repo;

  public async Task<RequestRideResponse> Execute(
    RequestRideRequest req,
    CancellationToken ct = default
  ) {
    // 1. Create domain entity (not DTO!)
    var ride = new Ride(req.PassengerId);

    // 2. Persist through repository (port)
    await _repo.Save(ride);

    // 3. Return DTO (not domain entity!)
    return new RequestRideResponse(ride.Id, DateTime.UtcNow);
  }
}`}
              </pre>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <motion.div
              className="card bg-green-50 border-green-200"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h5 className="font-semibold text-green-900 mb-2">Input DTO</h5>
              <ul className="text-xs space-y-1">
                <li>• From outside world</li>
                <li>• Simple data (primitives)</li>
                <li>• No business logic</li>
                <li>• Easy to serialize</li>
              </ul>
            </motion.div>

            <motion.div
              className="card bg-purple-50 border-purple-200"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h5 className="font-semibold text-purple-900 mb-2">Domain Logic</h5>
              <ul className="text-xs space-y-1">
                <li>• Inside the system</li>
                <li>• Rich domain objects</li>
                <li>• Business rules enforced</li>
                <li>• Never exposed directly</li>
              </ul>
            </motion.div>

            <motion.div
              className="card bg-blue-50 border-blue-200"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <h5 className="font-semibold text-blue-900 mb-2">Output DTO</h5>
              <ul className="text-xs space-y-1">
                <li>• To outside world</li>
                <li>• Only necessary data</li>
                <li>• No domain internals</li>
                <li>• Easy to version</li>
              </ul>
            </motion.div>
          </div>

          <div className="card bg-red-50 border-red-200">
            <h4 className="font-semibold text-red-900 mb-2">❌ Don't Return Domain Objects!</h4>
            <div className="text-xs space-y-2">
              <pre className="bg-white p-2 rounded font-mono">
{`// WRONG: Exposes domain to outside world
public async Task<Ride> Execute(...) {
  var ride = new Ride(...);
  await _repo.Save(ride);
  return ride; // ❌ Leaking domain internals!
}`}
              </pre>
              <p className="text-sm text-gray-700">
                This couples the API to your domain model. If you change Ride, you break the API.
                Use DTOs instead to decouple external contracts from internal implementation.
              </p>
            </div>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> DTOs are an application of the Adapter pattern at the boundary.
              They translate between the domain model (optimized for business rules) and external representations
              (optimized for transport/serialization). This enables independent evolution of each side—change the
              domain without breaking clients, or add new API versions without touching domain logic.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 4: Dependency Injection
    {
      title: "Use Cases Depend on Ports (Interfaces)",
      content: (
        <div className="space-y-6">
          <div className="card bg-purple-50">
            <h4 className="font-semibold text-purple-900 mb-3">The Dependency Inversion Principle</h4>
            <p className="text-sm text-gray-700">
              Use Cases don't depend on <em>concrete</em> implementations (like SQL databases).
              They depend on <strong>interfaces (ports)</strong> that define <em>what</em> they need.
            </p>
          </div>

          <div className="card">
            <h4 className="font-semibold mb-4">How It Works</h4>
            <div className="space-y-4">
              <motion.div
                className="bg-blue-50 border-2 border-blue-300 rounded p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="font-semibold text-blue-900 mb-2">1. Define the Port (Interface)</p>
                <pre className="text-xs font-mono bg-white p-3 rounded">
{`// Application layer defines WHAT it needs
public interface IRideRepository {
  Task Save(Ride ride);
  Task<Ride?> Get(Guid id);
  Task<List<Ride>> GetByPassenger(Guid passengerId);
}`}
                </pre>
                <p className="text-xs text-gray-600 mt-2">
                  This is a contract. Use Cases depend on this interface, not any specific database.
                </p>
              </motion.div>

              <motion.div
                className="bg-green-50 border-2 border-green-300 rounded p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="font-semibold text-green-900 mb-2">2. Use Case Depends on Interface</p>
                <pre className="text-xs font-mono bg-white p-3 rounded">
{`public class RequestRideUseCase {
  private readonly IRideRepository _repo;

  // Constructor injection - receive the interface
  public RequestRideUseCase(IRideRepository repo) {
    _repo = repo ?? throw new ArgumentNullException(nameof(repo));
  }

  public async Task<Response> Execute(Request req) {
    var ride = new Ride(req.PassengerId);
    await _repo.Save(ride); // Using interface, not concrete class
    return new Response(ride.Id);
  }
}`}
                </pre>
                <p className="text-xs text-gray-600 mt-2">
                  The Use Case doesn't know if it's saving to SQL, NoSQL, or an in-memory list!
                </p>
              </motion.div>

              <motion.div
                className="bg-yellow-50 border-2 border-yellow-300 rounded p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <p className="font-semibold text-yellow-900 mb-2">3. Infrastructure Provides Implementation</p>
                <pre className="text-xs font-mono bg-white p-3 rounded">
{`// Infrastructure layer implements HOW
public class SqlRideRepository : IRideRepository {
  private readonly DbContext _db;

  public async Task Save(Ride ride) {
    _db.Rides.Add(ride);
    await _db.SaveChangesAsync();
  }

  public async Task<Ride?> Get(Guid id) {
    return await _db.Rides.FindAsync(id);
  }

  // ... more methods
}`}
                </pre>
                <p className="text-xs text-gray-600 mt-2">
                  Tomorrow you could create MongoRideRepository, InMemoryRideRepository, etc.
                  The Use Case doesn't change!
                </p>
              </motion.div>
            </div>
          </div>

          <div className="card bg-green-50">
            <h4 className="font-semibold text-green-900 mb-3">Benefits</h4>
            <ul className="space-y-2 text-sm">
              <li>✅ <strong>Testable</strong> - Use fake repositories in tests (no database needed)</li>
              <li>✅ <strong>Flexible</strong> - Swap SQL for NoSQL without changing Use Cases</li>
              <li>✅ <strong>Independent</strong> - Core logic doesn't depend on infrastructure</li>
              <li>✅ <strong>Maintainable</strong> - Changes to database don't break Use Cases</li>
            </ul>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> This is the "D" in SOLID (Dependency Inversion Principle).
              High-level modules (Use Cases) don't depend on low-level modules (databases).
              Both depend on abstractions (interfaces). This inverts the typical dependency flow,
              enabling the "Ports and Adapters" architecture: the domain defines ports (interfaces),
              and infrastructure provides adapters (implementations).
            </p>
          </div>
        </div>
      ),
    },

    // Slide 5: Real-World Impact
    {
      title: "Why Use Cases Matter",
      content: (
        <div className="space-y-6">
          <div className="card bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3">Use Cases Make Your App Testable</h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                Because Use Cases depend on interfaces, you can test them without any infrastructure:
              </p>
              <motion.div
                className="bg-white p-4 rounded border-2 border-blue-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <pre className="text-xs font-mono">
{`[Test]
public async Task ShouldCreateRideWithPassengerId() {
  // Arrange - Create fake repository (no database!)
  var fakeRepo = new InMemoryRideRepository();
  var useCase = new RequestRideUseCase(fakeRepo);
  var request = new Request(Guid.NewGuid());

  // Act - Execute the use case
  var response = await useCase.Execute(request);

  // Assert - Verify behavior
  var savedRide = await fakeRepo.Get(response.RideId);
  Assert.NotNull(savedRide);
  Assert.Equal(request.PassengerId, savedRide.PassengerId);
  Assert.Equal(RideStatus.Requested, savedRide.Status);
}

// Test runs in MILLISECONDS, no database needed!`}
                </pre>
              </motion.div>
            </div>
          </div>

          <div className="card bg-green-50">
            <h4 className="font-semibold text-green-900 mb-3">Use Cases Are UI-Independent</h4>
            <p className="text-sm text-gray-700 mb-3">
              The same Use Case works with <strong>any UI</strong>:
            </p>
            <div className="grid md:grid-cols-4 gap-3">
              <motion.div
                className="bg-white border-2 border-green-300 rounded p-3 text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-2xl mb-1">🌐</div>
                <p className="text-xs font-semibold">REST API</p>
              </motion.div>
              <motion.div
                className="bg-white border-2 border-green-300 rounded p-3 text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-2xl mb-1">📱</div>
                <p className="text-xs font-semibold">Mobile App</p>
              </motion.div>
              <motion.div
                className="bg-white border-2 border-green-300 rounded p-3 text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="text-2xl mb-1">💻</div>
                <p className="text-xs font-semibold">Desktop App</p>
              </motion.div>
              <motion.div
                className="bg-white border-2 border-green-300 rounded p-3 text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-2xl mb-1">⚡</div>
                <p className="text-xs font-semibold">CLI Tool</p>
              </motion.div>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              Each UI adapts <em>to</em> the Use Case. The Use Case doesn't change for different UIs.
            </p>
          </div>

          <div className="card bg-purple-50">
            <h4 className="font-semibold text-purple-900 mb-3">Screaming Architecture</h4>
            <p className="text-sm text-gray-700 mb-3">
              Looking at your Use Cases should tell you <strong>what the application does</strong>:
            </p>
            <div className="bg-white p-3 rounded text-xs font-mono">
              <div>📁 UseCases/</div>
              <div className="ml-4">RequestRideUseCase.cs</div>
              <div className="ml-4">CancelRideUseCase.cs</div>
              <div className="ml-4">AssignDriverUseCase.cs</div>
              <div className="ml-4">CompleteRideUseCase.cs</div>
              <div className="ml-4">RateRideUseCase.cs</div>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              The architecture <em>screams</em> "I'm a ride-sharing app!" Not "I'm an ASP.NET app" or "I use Entity Framework."
            </p>
          </div>

          <div className="card bg-yellow-50">
            <h4 className="font-semibold text-yellow-900 mb-2">Real-World Example</h4>
            <p className="text-sm text-gray-700">
              At Uber, Use Cases like <code className="bg-white px-2 py-1 rounded">RequestRideUseCase</code> are called
              from multiple clients: iOS app, Android app, web app, and internal admin tools. The <em>same code</em> runs
              for all of them. When a business rule changes (e.g., "rides can't be more than 100 miles"), they change it
              in <strong>one place</strong>—the Use Case—and all clients automatically get the new behavior.
            </p>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> Use Cases are the application of the Open-Closed Principle at the
              system level. The domain (entities) is closed for modification but open for extension via Use Cases.
              This is also the Command pattern: each Use Case is a command object encapsulating a single user intention.
              In CQRS architectures, Use Cases become Commands (write operations) and Queries (read operations),
              enabling independent scaling and optimization of each concern.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return <Slideshow slides={slides} />;
}
