import { motion } from 'framer-motion';
import { Slideshow } from '@/shared/components';

/**
 * Dependency Rule Interactive Slideshow
 * Teaches the core principle of Clean Architecture: the Dependency Rule
 */

export function DependencyRuleSlides() {
  const slides = [
    // Slide 1: The Problem - Typical Architecture
    {
      title: "The Problem: Traditional Layered Architecture",
      content: (
        <div className="space-y-6">
          <div className="card bg-red-50 border-red-200">
            <h4 className="font-semibold text-red-900 mb-3">How Most Apps Are Built (The Wrong Way)</h4>
            <div className="flex flex-col items-center space-y-4 py-6">
              <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-4 text-center">
                  <p className="font-semibold">UI / Controllers</p>
                  <p className="text-xs text-gray-600">React, ASP.NET Controllers</p>
                </div>
              </motion.div>

              <motion.div
                className="text-2xl text-red-600"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                ↓ depends on
              </motion.div>

              <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 text-center">
                  <p className="font-semibold">Business Logic</p>
                  <p className="text-xs text-gray-600">
                    <code className="bg-white px-1 rounded">using EntityFramework;</code>
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="text-2xl text-red-600"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                ↓ depends on
              </motion.div>

              <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-4 text-center">
                  <p className="font-semibold">Database (EF DbContext)</p>
                  <p className="text-xs text-gray-600">
                    <code className="bg-white px-1 rounded">class User : DbContext</code>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="card bg-yellow-50 border-yellow-300">
            <div className="flex gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">The Problems</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>❌ Business logic depends on the database</strong>
                    <br />
                    <span className="text-xs text-gray-600">
                      Your User class inherits from EntityFramework's DbContext. Now you can't test without a database!
                    </span>
                  </li>
                  <li>
                    <strong>❌ Can't swap infrastructure</strong>
                    <br />
                    <span className="text-xs text-gray-600">
                      Want to switch from SQL to NoSQL? Rewrite all your business logic that's coupled to SQL!
                    </span>
                  </li>
                  <li>
                    <strong>❌ Testing requires infrastructure</strong>
                    <br />
                    <span className="text-xs text-gray-600">
                      To test business rules, you must spin up a database, web server, and entire app. Tests take minutes!
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              <strong>For complete beginners:</strong> Imagine if every time you wanted to check if your car's engine
              works, you had to fill the gas tank, turn on the radio, and inflate the tires. That's what it's like when
              your business logic depends on infrastructure—you can't test one piece without ALL the pieces.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 2: The Solution - The Dependency Rule
    {
      title: "The Dependency Rule",
      content: (
        <div className="space-y-6">
          <div className="card bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3 text-center text-xl">
              Source code dependencies point INWARD
            </h4>
            <p className="text-center text-gray-700 text-sm">
              Nothing in an inner circle knows anything about the outer circles
            </p>
          </div>

          <div className="card">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Concentric circles */}
              <motion.div
                className="relative mx-auto"
                style={{ width: '400px', height: '400px' }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Outer circle - Infrastructure */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-200 to-red-100 flex items-center justify-center border-4 border-red-400">
                  {/* Middle-outer circle - Adapters */}
                  <motion.div
                    className="w-72 h-72 rounded-full bg-gradient-to-br from-orange-200 to-orange-100 flex items-center justify-center border-4 border-orange-400"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {/* Middle-inner circle - Application */}
                    <motion.div
                      className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-200 to-blue-100 flex items-center justify-center border-4 border-blue-400"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {/* Inner circle - Domain */}
                      <motion.div
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-300 flex items-center justify-center border-4 border-green-600 text-white font-bold text-sm shadow-lg"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        Domain
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Labels */}
                <motion.div
                  className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-bold text-red-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  Infrastructure
                </motion.div>

                <motion.div
                  className="absolute top-16 left-1/2 -translate-x-1/2 text-xs font-bold text-orange-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Adapters
                </motion.div>

                <motion.div
                  className="absolute top-32 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  Application
                </motion.div>

                {/* Arrows pointing INWARD */}
                <motion.div
                  className="absolute top-1/2 right-8 text-3xl text-green-600 font-bold"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  ←
                </motion.div>
                <motion.div
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 text-3xl text-green-600 font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  ↓
                </motion.div>
                <motion.div
                  className="absolute top-12 left-1/2 -translate-x-1/2 text-3xl text-green-600 font-bold"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 }}
                >
                  ↓
                </motion.div>
                <motion.div
                  className="absolute top-1/2 left-8 text-3xl text-green-600 font-bold"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2 }}
                >
                  →
                </motion.div>
              </motion.div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-3">
            <div className="card bg-green-50 border-green-300">
              <h5 className="font-semibold text-green-900 text-sm mb-2">Domain (Core)</h5>
              <ul className="text-xs space-y-1">
                <li>• Entities</li>
                <li>• Value Objects</li>
                <li>• Aggregates</li>
                <li>• <strong>Zero dependencies</strong></li>
              </ul>
            </div>

            <div className="card bg-blue-50 border-blue-300">
              <h5 className="font-semibold text-blue-900 text-sm mb-2">Application</h5>
              <ul className="text-xs space-y-1">
                <li>• Use Cases</li>
                <li>• Ports (interfaces)</li>
                <li>• DTOs</li>
                <li>• Depends on Domain</li>
              </ul>
            </div>

            <div className="card bg-orange-50 border-orange-300">
              <h5 className="font-semibold text-orange-900 text-sm mb-2">Adapters</h5>
              <ul className="text-xs space-y-1">
                <li>• Controllers</li>
                <li>• Presenters</li>
                <li>• Gateways</li>
                <li>• Depends on Application</li>
              </ul>
            </div>

            <div className="card bg-red-50 border-red-300">
              <h5 className="font-semibold text-red-900 text-sm mb-2">Infrastructure</h5>
              <ul className="text-xs space-y-1">
                <li>• Database</li>
                <li>• Web framework</li>
                <li>• External APIs</li>
                <li>• Outermost layer</li>
              </ul>
            </div>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> The Dependency Rule is the architectural manifestation of the
              Dependency Inversion Principle (SOLID). High-level policy (domain) doesn't depend on low-level details
              (infrastructure). Both depend on abstractions (interfaces). This inverts the traditional layered architecture,
              creating what Alistair Cockburn calls "Ports and Adapters" or "Hexagonal Architecture."
            </p>
          </div>
        </div>
      ),
    },

    // Slide 3: How Dependencies Point Inward
    {
      title: "Inverting Dependencies with Interfaces",
      content: (
        <div className="space-y-6">
          <div className="card bg-purple-50">
            <h4 className="font-semibold text-purple-900 mb-3">The Magic Trick: Dependency Inversion</h4>
            <p className="text-sm text-gray-700">
              How do we make infrastructure depend on the domain, when the domain needs to save data to the database?
              <br />
              <strong>Answer: Interfaces (Ports)</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Wrong way */}
            <div className="card bg-red-50 border-red-200">
              <h5 className="font-semibold text-red-900 mb-3">❌ Wrong (Outward Dependency)</h5>
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-white p-3 rounded border-2 border-red-300">
                  <pre className="text-xs font-mono">
{`// Domain layer
class RequestRideUseCase {
  void Execute() {
    var ride = new Ride();

    // ❌ Depends on infrastructure!
    var db = new SqlDatabase();
    db.SaveRide(ride);
  }
}`}
                  </pre>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="px-4 py-2 bg-green-100 border-2 border-green-400 rounded">
                    Use Case (Domain)
                  </div>
                  <div className="text-2xl text-red-600">↓</div>
                  <div className="px-4 py-2 bg-red-100 border-2 border-red-400 rounded">
                    SqlDatabase (Infrastructure)
                  </div>
                </div>

                <p className="text-xs text-red-700">
                  Domain depends on infrastructure! Can't test without a database. Can't swap databases.
                </p>
              </motion.div>
            </div>

            {/* Right way */}
            <div className="card bg-green-50 border-green-200">
              <h5 className="font-semibold text-green-900 mb-3">✅ Right (Inward Dependency)</h5>
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-white p-3 rounded border-2 border-green-300">
                  <pre className="text-xs font-mono">
{`// Application layer defines interface
interface IRideRepository {
  void Save(Ride ride);
}

// Use Case depends on interface
class RequestRideUseCase {
  IRideRepository _repo;

  void Execute() {
    var ride = new Ride();
    _repo.Save(ride); // ✅
  }
}

// Infrastructure implements interface
class SqlRideRepo : IRideRepository {
  void Save(Ride r) { /* SQL */ }
}`}
                  </pre>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="px-4 py-2 bg-red-100 border-2 border-red-400 rounded text-xs">
                    SqlRideRepo
                  </div>
                  <div className="text-2xl text-green-600">↓ implements</div>
                  <div className="px-4 py-2 bg-blue-100 border-2 border-blue-400 rounded text-xs">
                    IRideRepository
                  </div>
                  <div className="text-2xl text-green-600">↑ depends on</div>
                  <div className="px-4 py-2 bg-green-100 border-2 border-green-400 rounded text-xs">
                    Use Case
                  </div>
                </div>

                <p className="text-xs text-green-700">
                  Infrastructure depends on domain! Domain has zero infrastructure dependencies.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="card bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-2">The Key Insight</h4>
            <p className="text-sm text-gray-700">
              The domain defines <strong>WHAT</strong> it needs (the interface).
              <br />
              The infrastructure provides <strong>HOW</strong> it works (the implementation).
              <br />
              <br />
              The infrastructure must conform to the domain's contract, not the other way around.
            </p>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> This is called the "Dependency Inversion Principle" (DIP).
              Robert C. Martin: "Abstractions should not depend on details. Details should depend on abstractions."
              The interface (abstraction) is owned by the high-level module (domain/application), and the low-level
              module (infrastructure) must implement it. This enables the "Plugin Architecture"—infrastructure is a
              plugin to the domain, not the foundation it's built on.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 4: Benefits in Practice
    {
      title: "What the Dependency Rule Gives You",
      content: (
        <div className="space-y-6">
          <div className="card bg-green-50">
            <h4 className="font-semibold text-green-900 mb-3">1. Independence of Frameworks</h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                Your business logic doesn't depend on ASP.NET, Express, Rails, or any framework.
              </p>
              <motion.div
                className="bg-white p-3 rounded border-2 border-green-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xs font-mono mb-2">Domain/</p>
                <p className="text-xs font-mono ml-4">Ride.cs <span className="text-green-600">← No framework references!</span></p>
                <p className="text-xs font-mono ml-4">Money.cs <span className="text-green-600">← Pure C#</span></p>
                <p className="text-xs font-mono mt-2">Application/</p>
                <p className="text-xs font-mono ml-4">RequestRideUseCase.cs <span className="text-green-600">← No ASP.NET!</span></p>
              </motion.div>
              <p className="text-xs text-gray-600">
                Switch from ASP.NET to gRPC? Change only the infrastructure layer. Domain and application stay unchanged.
              </p>
            </div>
          </div>

          <div className="card bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3">2. Independence of UI</h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                The same business logic works with web, mobile, desktop, or CLI.
              </p>
              <div className="grid grid-cols-4 gap-2">
                {['Web UI', 'iOS App', 'Android', 'CLI'].map((ui, i) => (
                  <motion.div
                    key={ui}
                    className="bg-white border-2 border-blue-300 rounded p-2 text-center text-xs"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {ui}
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="text-center text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                ↓ All call ↓
              </motion.div>
              <div className="bg-white border-2 border-green-400 rounded p-3 text-center">
                <p className="font-semibold text-sm">RequestRideUseCase</p>
                <p className="text-xs text-gray-600">(Same code for all UIs)</p>
              </div>
            </div>
          </div>

          <div className="card bg-purple-50">
            <h4 className="font-semibold text-purple-900 mb-3">3. Independence of Database</h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                Switch from SQL to NoSQL to in-memory—without touching business logic.
              </p>
              <motion.div
                className="bg-white p-4 rounded border-2 border-purple-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <pre className="text-xs font-mono">
{`// Same use case, different repositories:

// Development
services.AddScoped<IRideRepository, InMemoryRideRepository>();

// Production
services.AddScoped<IRideRepository, PostgreSqlRideRepository>();

// Testing
services.AddScoped<IRideRepository, FakeRideRepository>();

// Use Case doesn't change!`}
                </pre>
              </motion.div>
            </div>
          </div>

          <div className="card bg-yellow-50">
            <h4 className="font-semibold text-yellow-900 mb-3">4. Testability</h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                Test business logic without databases, web servers, or any infrastructure.
              </p>
              <motion.div
                className="bg-white p-4 rounded border-2 border-yellow-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <pre className="text-xs font-mono">
{`[Test]
public void ShouldRejectNegativeAmounts() {
  // No database, no web server, no framework!
  // Just pure domain logic:
  Assert.Throws<ArgumentException>(() =>
    Money.Create(-100, "USD")
  );
}

// Test runs in MILLISECONDS`}
                </pre>
              </motion.div>
            </div>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> These benefits emerge from applying the Stable Dependencies Principle
              (SDP) and the Stable Abstractions Principle (SAP). The domain is the most stable part of the system—it
              changes only when business rules change. Infrastructure is the least stable—it changes when technology
              changes. By making infrastructure depend on domain (not vice versa), we achieve architectural stability.
              This is the essence of Clean Architecture, Hexagonal Architecture, and Onion Architecture.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 5: The Rule in Action
    {
      title: "Putting It All Together",
      content: (
        <div className="space-y-6">
          <div className="card">
            <h4 className="font-semibold mb-4">Data Flow in Clean Architecture</h4>
            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-red-100 border-2 border-red-400 rounded px-4 py-2 text-sm font-semibold w-48">
                  1. REST API Request
                </div>
                <span className="text-xl">→</span>
                <p className="text-xs text-gray-600">User clicks "Request Ride"</p>
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-orange-100 border-2 border-orange-400 rounded px-4 py-2 text-sm font-semibold w-48">
                  2. Controller (Adapter)
                </div>
                <span className="text-xl">→</span>
                <p className="text-xs text-gray-600">Converts HTTP to DTO</p>
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-blue-100 border-2 border-blue-400 rounded px-4 py-2 text-sm font-semibold w-48">
                  3. Use Case
                </div>
                <span className="text-xl">→</span>
                <p className="text-xs text-gray-600">Orchestrates workflow</p>
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="bg-green-100 border-2 border-green-400 rounded px-4 py-2 text-sm font-semibold w-48">
                  4. Domain Entity
                </div>
                <span className="text-xl">→</span>
                <p className="text-xs text-gray-600">Enforces business rules</p>
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <div className="bg-blue-100 border-2 border-blue-400 rounded px-4 py-2 text-sm font-semibold w-48">
                  5. Repository Interface
                </div>
                <span className="text-xl">→</span>
                <p className="text-xs text-gray-600">Defined by application</p>
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="bg-red-100 border-2 border-red-400 rounded px-4 py-2 text-sm font-semibold w-48">
                  6. SQL Repository
                </div>
                <span className="text-xl">→</span>
                <p className="text-xs text-gray-600">Implements interface</p>
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <div className="bg-red-100 border-2 border-red-400 rounded px-4 py-2 text-sm font-semibold w-48">
                  7. Database
                </div>
                <span className="text-xl">→</span>
                <p className="text-xs text-gray-600">Data persisted</p>
              </motion.div>
            </div>
          </div>

          <div className="card bg-purple-50">
            <h4 className="font-semibold text-purple-900 mb-3">Key Observations</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span>✅</span>
                <span><strong>Data flows outward</strong> (Request → Domain → Database)</span>
              </li>
              <li className="flex gap-2">
                <span>✅</span>
                <span><strong>Dependencies point inward</strong> (Infrastructure → Application → Domain)</span>
              </li>
              <li className="flex gap-2">
                <span>✅</span>
                <span><strong>Domain has zero dependencies</strong> (Pure business logic)</span>
              </li>
              <li className="flex gap-2">
                <span>✅</span>
                <span><strong>Infrastructure adapts to domain</strong> (Not the other way around)</span>
              </li>
            </ul>
          </div>

          <div className="card bg-green-50">
            <h4 className="font-semibold text-green-900 mb-2">The Bottom Line</h4>
            <p className="text-sm text-gray-700 mb-3">
              The Dependency Rule makes your code:
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>• <strong>Testable</strong> without infrastructure</div>
              <div>• <strong>Flexible</strong> to technology changes</div>
              <div>• <strong>Independent</strong> of frameworks</div>
              <div>• <strong>Maintainable</strong> over time</div>
              <div>• <strong>Portable</strong> across platforms</div>
              <div>• <strong>Understandable</strong> to new developers</div>
            </div>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> Robert C. Martin (Clean Architecture): "The Dependency Rule is the
              overriding rule that makes this architecture work. It says that source code dependencies can only point
              inwards. Nothing in an inner circle can know anything at all about something in an outer circle." This
              enables what Ivar Jacobson calls "Use Case Driven Design"—the system's architecture is organized around
              use cases (business value), not around technical frameworks. The result is a "Screaming Architecture" that
              makes the system's intent obvious from its structure.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return <Slideshow slides={slides} />;
}
