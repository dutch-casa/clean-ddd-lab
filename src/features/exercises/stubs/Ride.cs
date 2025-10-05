namespace Domain.Entities;

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
}
