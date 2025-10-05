namespace Domain.ValueObjects;

public readonly record struct Money(decimal Amount, string Currency)
{
  public static Money Create(decimal amount, string currency)
  {
    // TODO: enforce amount >= 0, 3-letter currency A-Z
    throw new NotImplementedException();
  }
}
