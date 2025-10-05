import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slideshow } from '@/shared/components';

/**
 * Repository/Ports Interactive Slideshow
 * Teaches the Repository pattern and Ports & Adapters architecture
 */

export function RepositorySlides() {
  const slides = [
    // Slide 1: What is a Repository?
    {
      title: "What is a Repository?",
      content: (
        <div className="space-y-6">
          <div className="card bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3">Repository = Collection Abstraction</h4>
            <p className="text-sm text-gray-700 mb-4">
              A Repository provides the <strong>illusion of an in-memory collection</strong> of domain objects.
              Behind the scenes, it might use a database, file system, API, or anything else.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                className="bg-white border-2 border-blue-300 rounded-lg p-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h5 className="font-semibold text-sm mb-3">What You Think You're Using</h5>
                <pre className="text-xs font-mono bg-gray-50 p-3 rounded">
{`// Looks like a collection!
var rides = new List<Ride>();

// Add
rides.Add(new Ride(passengerId));

// Get
var ride = rides
  .FirstOrDefault(r => r.Id == id);

// Remove
rides.Remove(ride);`}
                </pre>
              </motion.div>

              <motion.div
                className="bg-white border-2 border-green-300 rounded-lg p-4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h5 className="font-semibold text-sm mb-3">What You're Actually Using</h5>
                <pre className="text-xs font-mono bg-gray-50 p-3 rounded">
{`// Repository interface
interface IRideRepository {
  Task Save(Ride ride);
  Task<Ride?> Get(Guid id);
  Task Delete(Guid id);
}

// Use it like a collection
await repo.Save(ride);
var ride = await repo.Get(id);
await repo.Delete(id);

// But it's actually a DATABASE!`}
                </pre>
              </motion.div>
            </div>
          </div>

          <div className="card bg-purple-50">
            <p className="text-sm">
              <strong>Key insight:</strong> Your domain code doesn't care if data is stored in PostgreSQL, MongoDB,
              files, or memory. The Repository interface lets you think in terms of <em>collections</em> (add, get,
              remove), not <em>databases</em> (SQL queries, transactions, connection strings).
            </p>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              <strong>For complete beginners:</strong> Imagine you have a magic box. You can put things in the box,
              take things out, or check what's inside. You don't know (or care) if the box stores items in a filing
              cabinet, a warehouse, or on the cloud. That's what a Repository does for your code—it hides the storage
              details.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 2: Ports and Adapters
    {
      title: "Ports (Interfaces) and Adapters (Implementations)",
      content: (
        <div className="space-y-6">
          <div className="card bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3">Hexagonal Architecture</h4>
            <p className="text-sm text-gray-700 mb-4">
              Also called "Ports and Adapters" - your domain is a hexagon at the center,
              surrounded by ports (interfaces) that adapters (implementations) plug into.
            </p>

            <div className="relative py-8">
              <motion.div
                className="relative mx-auto"
                style={{ width: '300px', height: '300px' }}
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Hexagon (approximated with rounded div) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-green-400 to-green-500 rounded-lg rotate-45 flex items-center justify-center border-4 border-green-600 shadow-xl">
                    <div className="-rotate-45 text-white font-bold text-sm text-center">
                      Domain
                      <br />
                      <span className="text-xs">(Business Logic)</span>
                    </div>
                  </div>
                </div>

                {/* Ports (interfaces) around the hexagon */}
                {[
                  { label: 'IRideRepository', angle: 0, color: 'blue' },
                  { label: 'IPaymentGateway', angle: 90, color: 'purple' },
                  { label: 'INotificationService', angle: 180, color: 'pink' },
                  { label: 'IAuthService', angle: 270, color: 'orange' },
                ].map((port, i) => (
                  <motion.div
                    key={port.label}
                    className={`absolute w-32 px-3 py-2 bg-${port.color}-100 border-2 border-${port.color}-400 rounded text-xs font-semibold text-center`}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${port.angle}deg) translateY(-140px) rotate(-${port.angle}deg)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                  >
                    {port.label}
                    <div className="text-[10px] text-gray-600">(Port)</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card bg-green-50 border-green-200">
              <h5 className="font-semibold text-green-900 mb-3">Ports (Interfaces)</h5>
              <ul className="text-sm space-y-2">
                <li>• Defined by the <strong>domain/application</strong></li>
                <li>• Describe <strong>WHAT</strong> the domain needs</li>
                <li>• Independent of technology</li>
                <li>• Abstract contracts</li>
              </ul>
              <pre className="text-xs font-mono bg-white p-2 rounded mt-3">
{`interface IRideRepository {
  Task Save(Ride ride);
  Task<Ride?> Get(Guid id);
}`}
              </pre>
            </div>

            <div className="card bg-purple-50 border-purple-200">
              <h5 className="font-semibold text-purple-900 mb-3">Adapters (Implementations)</h5>
              <ul className="text-sm space-y-2">
                <li>• Defined by <strong>infrastructure</strong></li>
                <li>• Implement <strong>HOW</strong> it works</li>
                <li>• Technology-specific</li>
                <li>• Concrete implementations</li>
              </ul>
              <pre className="text-xs font-mono bg-white p-2 rounded mt-3">
{`class SqlRideRepository
  : IRideRepository {
  async Task Save(Ride r) {
    // SQL implementation
  }
}`}
              </pre>
            </div>
          </div>

          <div className="card bg-yellow-50 border-yellow-300">
            <div className="flex gap-3">
              <span className="text-2xl">🔌</span>
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">Plug and Play</h4>
                <p className="text-sm text-gray-700">
                  Different adapters can plug into the same port. Your domain doesn't change—just swap the adapter!
                </p>
                <div className="mt-3 text-xs space-y-1">
                  <div>• <code className="bg-white px-2 py-1 rounded">PostgreSqlRideRepository</code> - Production</div>
                  <div>• <code className="bg-white px-2 py-1 rounded">MongoDbRideRepository</code> - Alternative DB</div>
                  <div>• <code className="bg-white px-2 py-1 rounded">InMemoryRideRepository</code> - Testing</div>
                  <div>• <code className="bg-white px-2 py-1 rounded">FakeRideRepository</code> - Unit tests</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> Alistair Cockburn's Hexagonal Architecture (2005) formalizes the
              principle that the domain should be at the center, with all external concerns (databases, UI, APIs)
              as interchangeable adapters on the outside. The "ports" are the interfaces defined by the application
              (the "inside"), and "adapters" are the implementations provided by the infrastructure (the "outside").
              This is isomorphic to Clean Architecture's Dependency Rule.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 3: Repository Interface Design
    {
      title: "Designing Repository Interfaces",
      content: (
        <div className="space-y-6">
          <div className="card bg-purple-50">
            <h4 className="font-semibold text-purple-900 mb-3">Best Practices for Repository Interfaces</h4>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card bg-red-50 border-red-200">
              <h5 className="font-semibold text-red-900 mb-2">❌ Bad: Exposing Implementation Details</h5>
              <pre className="text-xs font-mono bg-white p-3 rounded">
{`interface IRideRepository {
  // ❌ SQL-specific!
  Task<Ride?> ExecuteQuery(
    string sql
  );

  // ❌ Exposes ORM!
  IQueryable<Ride> GetQueryable();

  // ❌ Database-specific!
  Task<DbConnection> GetConnection();
}`}
              </pre>
              <p className="text-xs text-red-700 mt-2">
                These expose infrastructure details. Domain code now depends on SQL and ORMs!
              </p>
            </div>

            <div className="card bg-green-50 border-green-200">
              <h5 className="font-semibold text-green-900 mb-2">✅ Good: Domain-Focused Methods</h5>
              <pre className="text-xs font-mono bg-white p-3 rounded">
{`interface IRideRepository {
  // ✅ Domain concepts
  Task Save(Ride ride);
  Task<Ride?> Get(Guid id);
  Task<List<Ride>> GetByPassenger(
    Guid passengerId
  );
  Task<List<Ride>> GetByDriver(
    Guid driverId
  );
  Task<List<Ride>> GetActive();
}`}
              </pre>
              <p className="text-xs text-green-700 mt-2">
                These express business needs. No SQL, no ORM, just domain concepts.
              </p>
            </div>
          </div>

          <div className="card bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3">Design Principles</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="font-semibold">1.</span>
                <div>
                  <strong>Use domain language</strong>
                  <br />
                  <span className="text-xs text-gray-600">
                    Methods should express business concepts: <code className="bg-white px-1 rounded">GetActive()</code>,
                    not <code className="bg-white px-1 rounded">FindByStatus("active")</code>
                  </span>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">2.</span>
                <div>
                  <strong>Return domain objects</strong>
                  <br />
                  <span className="text-xs text-gray-600">
                    Return <code className="bg-white px-1 rounded">Ride</code> or <code className="bg-white px-1 rounded">List&lt;Ride&gt;</code>,
                    not <code className="bg-white px-1 rounded">DataRow</code> or <code className="bg-white px-1 rounded">Dictionary&lt;string, object&gt;</code>
                  </span>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">3.</span>
                <div>
                  <strong>One aggregate per repository</strong>
                  <br />
                  <span className="text-xs text-gray-600">
                    <code className="bg-white px-1 rounded">IRideRepository</code> for Rides,
                    <code className="bg-white px-1 rounded">IUserRepository</code> for Users—don't mix aggregates
                  </span>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">4.</span>
                <div>
                  <strong>Task-based, not query-based</strong>
                  <br />
                  <span className="text-xs text-gray-600">
                    Design around use cases: <code className="bg-white px-1 rounded">GetRidesForInvoice()</code> is better
                    than a generic query that clients filter themselves
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> Eric Evans (DDD): "A Repository represents all objects of a certain type
              as a conceptual set... It acts like a collection, except with more elaborate querying capability." The
              interface should be designed around the domain's needs, not the database's capabilities. This is the
              Interface Segregation Principle (ISP) applied: clients (domain) shouldn't depend on methods they don't use.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 4: Multiple Implementations
    {
      title: "One Interface, Many Implementations",
      content: (
        <div className="space-y-6">
          <div className="card bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3">The Power of Abstraction</h4>
            <p className="text-sm text-gray-700">
              The same interface can have multiple implementations for different contexts.
            </p>
          </div>

          <div className="space-y-4">
            {/* Production */}
            <motion.div
              className="card bg-green-50 border-green-200"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h5 className="font-semibold text-green-900 mb-2">Production: SQL Repository</h5>
              <pre className="text-xs font-mono bg-white p-3 rounded">
{`public class SqlRideRepository : IRideRepository {
  private readonly DbContext _db;

  public async Task Save(Ride ride) {
    _db.Rides.Add(ride);
    await _db.SaveChangesAsync();
  }

  public async Task<Ride?> Get(Guid id) {
    return await _db.Rides
      .Include(r => r.Route)
      .Include(r => r.Price)
      .FirstOrDefaultAsync(r => r.Id == id);
  }
}

// Used in production for persistent storage`}
              </pre>
            </motion.div>

            {/* Testing */}
            <motion.div
              className="card bg-yellow-50 border-yellow-200"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h5 className="font-semibold text-yellow-900 mb-2">Integration Tests: In-Memory Repository</h5>
              <pre className="text-xs font-mono bg-white p-3 rounded">
{`public class InMemoryRideRepository : IRideRepository {
  private readonly List<Ride> _rides = new();

  public Task Save(Ride ride) {
    _rides.Add(ride);
    return Task.CompletedTask;
  }

  public Task<Ride?> Get(Guid id) {
    return Task.FromResult(
      _rides.FirstOrDefault(r => r.Id == id)
    );
  }
}

// Used in integration tests - fast, no database needed`}
              </pre>
            </motion.div>

            {/* Unit Tests */}
            <motion.div
              className="card bg-purple-50 border-purple-200"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h5 className="font-semibold text-purple-900 mb-2">Unit Tests: Fake Repository</h5>
              <pre className="text-xs font-mono bg-white p-3 rounded">
{`public class FakeRideRepository : IRideRepository {
  public Ride? ReturnValue { get; set; }
  public bool SaveCalled { get; private set; }

  public Task Save(Ride ride) {
    SaveCalled = true;
    return Task.CompletedTask;
  }

  public Task<Ride?> Get(Guid id) {
    return Task.FromResult(ReturnValue);
  }
}

// Used in unit tests to verify behavior without I/O`}
              </pre>
            </motion.div>

            {/* Event Sourcing */}
            <motion.div
              className="card bg-blue-50 border-blue-200"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <h5 className="font-semibold text-blue-900 mb-2">Advanced: Event Store Repository</h5>
              <pre className="text-xs font-mono bg-white p-3 rounded">
{`public class EventStoreRideRepository : IRideRepository {
  private readonly IEventStore _eventStore;

  public async Task Save(Ride ride) {
    var events = ride.GetUncommittedEvents();
    await _eventStore.AppendEvents(ride.Id, events);
  }

  public async Task<Ride?> Get(Guid id) {
    var events = await _eventStore.GetEvents(id);
    return Ride.FromEvents(events);
  }
}

// Used for event sourcing - stores events, not state`}
              </pre>
            </motion.div>
          </div>

          <div className="card bg-green-50">
            <h4 className="font-semibold text-green-900 mb-2">Key Benefit</h4>
            <p className="text-sm text-gray-700">
              Your Use Cases don't change when you swap implementations! The same <code className="bg-white px-2 py-1 rounded">RequestRideUseCase</code>
              works with SQL in production, in-memory during integration tests, and a fake during unit tests.
            </p>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> This is the Strategy pattern at the architectural level. Each repository
              implementation is a different strategy for persistence. The Liskov Substitution Principle (LSP) ensures
              that any implementation can be substituted without affecting correctness. This enables Test-Driven
              Development at scale—you can write tests with fakes/in-memory repos, then later add real persistence
              without changing test logic.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 5: Real-World Impact
    {
      title: "Why Repositories and Ports Matter",
      content: (
        <div className="space-y-6">
          <div className="card bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3">Story: Migration from SQL to NoSQL</h4>
            <div className="space-y-3 text-sm">
              <p className="text-gray-700">
                A startup built their ride-sharing app with PostgreSQL. After a year, they needed to switch to
                MongoDB for better scalability. How long did it take?
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-100 border-2 border-red-300 rounded p-3">
                  <p className="font-semibold text-red-900 mb-2">Without Repositories</p>
                  <p className="text-xs text-gray-700">
                    ⏱️ <strong>6 months</strong>
                    <br />
                    Had to rewrite every service, controller, and business logic method that touched the database.
                    Introduced dozens of bugs. Features stopped shipping.
                  </p>
                </div>

                <div className="bg-green-100 border-2 border-green-300 rounded p-3">
                  <p className="font-semibold text-green-900 mb-2">With Repositories</p>
                  <p className="text-xs text-gray-700">
                    ⏱️ <strong>2 weeks</strong>
                    <br />
                    Implemented <code className="bg-white px-1 rounded">MongoDbRideRepository</code>,
                    swapped it in dependency injection config. Use Cases and domain logic unchanged. Zero bugs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-green-50">
            <h4 className="font-semibold text-green-900 mb-3">Benefits in Production Systems</h4>
            <div className="space-y-4">
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-2xl">🧪</span>
                <div>
                  <p className="font-semibold">Fast, Reliable Tests</p>
                  <p className="text-sm text-gray-700">
                    Unit tests run in milliseconds with fake repositories. Integration tests use in-memory repos.
                    No need to spin up databases, leading to 100x faster test suites.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-2xl">🔄</span>
                <div>
                  <p className="font-semibold">Easy to Swap Infrastructure</p>
                  <p className="text-sm text-gray-700">
                    Switch databases, add caching layers, or implement event sourcing without touching business logic.
                    Just implement the interface and swap it in.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-semibold">Multiple Data Sources</p>
                  <p className="text-sm text-gray-700">
                    Use different implementations in different contexts: SQL for transactional data,
                    Redis for caching, Elasticsearch for search—all through the same interface.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <span className="text-2xl">🛡️</span>
                <div>
                  <p className="font-semibold">Protected from Vendor Lock-In</p>
                  <p className="text-sm text-gray-700">
                    Not tied to a specific ORM, cloud provider, or database. If AWS decides to 10x their prices,
                    you can migrate to GCP in weeks, not years.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="card bg-purple-50">
            <h4 className="font-semibold text-purple-900 mb-2">Real Example: Uber's Architecture</h4>
            <p className="text-sm text-gray-700">
              Uber uses a Ports and Adapters architecture with repositories. They've migrated between different
              databases (MySQL → Postgres → custom solutions) multiple times without rewriting business logic.
              Their domain layer has zero database dependencies. Tests run without databases. New engineers can
              understand the business rules without learning SQL.
            </p>
          </div>

          <div className="card bg-yellow-50 border-yellow-300">
            <div className="flex gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">The Bottom Line</h4>
                <p className="text-sm text-gray-700">
                  Repositories and Ports aren't "extra work"—they're <strong>insurance</strong> against the inevitable:
                  <br />• Requirements will change
                  <br />• Technology will change
                  <br />• Teams will change
                  <br />
                  <br />
                  By isolating infrastructure behind interfaces, you make your system <strong>resilient to change</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> Martin Fowler (Patterns of Enterprise Application Architecture):
              "A Repository mediates between the domain and data mapping layers, acting like an in-memory collection
              of domain objects." This pattern, combined with Dependency Inversion, enables what Robert C. Martin calls
              "The Plugin Architecture"—your infrastructure becomes a plugin to your business logic, not the foundation
              it's built on. This is the core insight of Clean Architecture, Onion Architecture, and Hexagonal Architecture.
              The result: systems that survive technology churn and scale with business needs, not despite them.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return <Slideshow slides={slides} />;
}
