namespace Application.UseCases;
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
}
