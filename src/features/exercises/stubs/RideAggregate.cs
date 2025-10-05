namespace Domain.Aggregates;
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
}
