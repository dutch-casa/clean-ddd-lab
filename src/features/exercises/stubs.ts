export type ExerciseStub = {
  name: string;
  filename: string;
  code: string;
  description: string;
};

export const exerciseStubs: ExerciseStub[] = [
  {
    name: 'Money Value Object',
    filename: 'Money.cs',
    description: 'Implement validation: amount >= 0, currency is 3-letter ISO code',
    code: `namespace Domain.ValueObjects;

public readonly record struct Money(decimal Amount, string Currency)
{
  public static Money Create(decimal amount, string currency)
  {
    // TODO: enforce amount >= 0, 3-letter currency A-Z
    throw new NotImplementedException();
  }
}`,
  },
  {
    name: 'Ride Entity',
    filename: 'Ride.cs',
    description: 'Implement state transitions: AssignDriver and Complete with guards',
    code: `namespace Domain.Entities;

public enum RideStatus { Requested, Accepted, Completed }

public class Ride
{
  public Guid Id { get; }
  public Guid PassengerId { get; }
  public Guid? DriverId { get; private set; }
  public RideStatus Status { get; private set; }

  public Ride(Guid passengerId)
  {
    Id = Guid.NewGuid();
    PassengerId = passengerId;
    Status = RideStatus.Requested;
  }

  public void AssignDriver(Guid driverId)
  {
    // TODO: only from Requested -> Accepted
    throw new NotImplementedException();
  }

  public void Complete()
  {
    // TODO: only if Accepted and DriverId != null
    throw new NotImplementedException();
  }
}`,
  },
  {
    name: 'Ride Aggregate',
    filename: 'RideAggregate.cs',
    description: 'Enforce aggregate invariants: cannot complete without driver',
    code: `namespace Domain.Aggregates;
using Domain.Entities;

public class RideAggregate
{
  public Ride Root { get; }

  public RideAggregate(Ride root) => Root = root;

  public void EnforceInvariants()
  {
    // TODO: cannot complete without driver
    // throw if invalid
  }
}`,
  },
  {
    name: 'Request Ride Use Case',
    filename: 'RequestRideUseCase.cs',
    description: 'Implement use case: create ride, persist via repository',
    code: `namespace Application.UseCases;
using Domain.Entities;
using Application.Ports;

public record Request(Guid PassengerId);
public record Response(Guid RideId);

public interface IRideRepository
{
  Task Save(Ride ride);
  Task<Ride?> Get(Guid id);
}

public class RequestRideUseCase
{
  private readonly IRideRepository repo;

  public RequestRideUseCase(IRideRepository repo) => this.repo = repo;

  public async Task<Response> ExecuteAsync(Request req, CancellationToken ct = default)
  {
    // TODO: create Ride, persist, return Response
    throw new NotImplementedException();
  }
}`,
  },
];
