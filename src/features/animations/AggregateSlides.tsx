import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slideshow } from '@/shared/components';

/**
 * Aggregate Interactive Slideshow
 * Teaches the Aggregate pattern: consistency boundaries in DDD
 */

export function AggregateSlides() {
  const slides = [
    // Slide 1: The Problem Aggregates Solve
    {
      title: "The Problem: Scattered Consistency",
      content: (
        <div className="space-y-6">
          <div className="card bg-red-50 border-red-200">
            <h4 className="font-semibold text-red-900 mb-3">Without Aggregates</h4>
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                Imagine a ride-sharing system where you can access entities directly:
              </p>

              <motion.div
                className="bg-white p-4 rounded border-2 border-red-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <pre className="text-xs font-mono">
{`// Anyone can modify the ride directly
var ride = await rideRepo.Get(rideId);
ride.Status = RideStatus.Completed; // Oops!
await rideRepo.Save(ride);

// Wait... we forgot to check if there's a driver!
// Now we have a COMPLETED ride with NO DRIVER 🐛`}
                </pre>
              </motion.div>

              <motion.div
                className="flex gap-3 items-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-2xl">💥</span>
                <div>
                  <p className="font-semibold text-red-700">Data Corruption!</p>
                  <p className="text-xs text-gray-600">
                    Business rule violated: "A ride can't be completed without a driver."
                    But nothing prevented it because the logic is scattered across the codebase.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="card bg-green-50 border-green-200">
            <h4 className="font-semibold text-green-900 mb-3">With Aggregates</h4>
            <motion.div
              className="bg-white p-4 rounded border-2 border-green-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <pre className="text-xs font-mono">
{`// Access goes through the aggregate
var rideAggregate = await repo.Get(rideId);
rideAggregate.Complete(); // ✅ Throws exception!

// InvalidOperationException:
// "Cannot complete ride without a driver"`}
              </pre>
            </motion.div>
            <p className="text-sm text-green-700 mt-3">
              The aggregate <strong>enforces invariants</strong> so invalid states are impossible.
            </p>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              <strong>For complete beginners:</strong> Think of an aggregate like a protective wrapper around your data.
              Instead of letting anyone touch the data directly (which causes bugs), you must go through the wrapper,
              which checks all the rules first.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 2: Consistency Boundary
    {
      title: "Aggregates Define Consistency Boundaries",
      content: (
        <div className="space-y-6">
          <div className="card">
            <h4 className="font-semibold mb-4">The Boundary</h4>
            <div className="relative p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
              <motion.div
                className="border-4 border-purple-500 rounded-lg p-6 bg-white relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute -top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  RideAggregate
                </div>

                <div className="space-y-4 mt-4">
                  <motion.div
                    className="bg-blue-100 border-2 border-blue-300 rounded p-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="font-semibold text-sm">Ride Entity (Root)</p>
                    <p className="text-xs text-gray-600">Id, PassengerId, DriverId, Status</p>
                  </motion.div>

                  <motion.div
                    className="ml-8 bg-green-100 border-2 border-green-300 rounded p-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p className="font-semibold text-sm">Route (Value Object)</p>
                    <p className="text-xs text-gray-600">Pickup, Dropoff</p>
                  </motion.div>

                  <motion.div
                    className="ml-8 bg-green-100 border-2 border-green-300 rounded p-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    <p className="font-semibold text-sm">Price (Value Object)</p>
                    <p className="text-xs text-gray-600">Amount, Currency</p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-4 top-1/2 -translate-y-1/2 text-4xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
              >
                🔒
              </motion.div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card bg-green-50 border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">✅ Inside the Boundary</h4>
              <ul className="text-sm space-y-2">
                <li>• Changes happen <strong>together</strong></li>
                <li>• Must stay <strong>consistent</strong></li>
                <li>• Saved in one <strong>transaction</strong></li>
                <li>• Rules <strong>always enforced</strong></li>
              </ul>
            </div>

            <div className="card bg-blue-50 border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">📏 Outside the Boundary</h4>
              <ul className="text-sm space-y-2">
                <li>• Other aggregates (User, Payment)</li>
                <li>• Referenced by <strong>ID only</strong></li>
                <li>• <strong>Eventual consistency</strong> okay</li>
                <li>• Different transactions</li>
              </ul>
            </div>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> Eric Evans: "An Aggregate is a cluster of associated objects that we
              treat as a unit for the purpose of data changes." The boundary defines transactional consistency guarantees.
              Everything inside must be consistent at the end of each transaction. Between aggregates, use eventual consistency.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 3: The Aggregate Root is the Entry Point
    {
      title: "All Access Goes Through the Root",
      content: (
        <div className="space-y-6">
          <div className="card bg-purple-50">
            <h4 className="font-semibold text-purple-900 mb-4">The Aggregate Root Pattern</h4>
            <div className="space-y-4">
              <motion.div
                className="bg-white p-4 rounded border-2 border-purple-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <pre className="text-xs font-mono">
{`public class RideAggregate {
  // Root is PRIVATE - external code cannot access it
  private readonly Ride _root;

  // Expose only what's needed for queries
  public Guid Id => _root.Id;
  public RideStatus Status => _root.Status;

  // ALL operations go through the aggregate
  public void AssignDriver(Guid driverId) {
    // Enforce business rules
    if (Status != RideStatus.Requested)
      throw new InvalidOperationException(...);

    // Make the change through the root
    _root.AssignDriver(driverId);

    // Verify invariants still hold
    EnforceInvariants();
  }
}`}
                </pre>
              </motion.div>

              <motion.div
                className="bg-red-50 border-2 border-red-300 rounded p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="font-semibold text-red-900 mb-2">❌ What You Can't Do</p>
                <pre className="text-xs font-mono">
{`// WRONG: Access root directly
var ride = rideAggregate.Root; // ❌ _root is private!
ride.Status = RideStatus.Completed; // ❌ Can't access!

// WRONG: Bypass the aggregate
var ride = await rideRepo.Get(id); // ❌ No! Get aggregate!
ride.Complete(); // ❌ Rules not enforced!`}
                </pre>
              </motion.div>

              <motion.div
                className="bg-green-50 border-2 border-green-300 rounded p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="font-semibold text-green-900 mb-2">✅ What You Should Do</p>
                <pre className="text-xs font-mono">
{`// RIGHT: Get the aggregate
var rideAgg = await repo.Get(id);

// RIGHT: Call methods on the aggregate
rideAgg.AssignDriver(driverId); // ✅ Rules enforced!
rideAgg.Complete();             // ✅ Invariants checked!

// RIGHT: Save the whole aggregate
await repo.Save(rideAgg); // ✅ One transaction!`}
                </pre>
              </motion.div>
            </div>
          </div>

          <div className="card bg-blue-50">
            <p className="text-sm">
              <strong>Key Point:</strong> The aggregate root is the <em>only entry point</em> for making changes.
              External code cannot bypass it to modify entities inside. This guarantees consistency.
            </p>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> This is the Law of Demeter applied at the aggregate level.
              External objects can only hold references to the aggregate, not to entities inside it.
              The aggregate encapsulates its internal structure, exposing only a behavioral interface.
              This is crucial for maintaining invariants across distributed systems.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 4: Invariants
    {
      title: "Aggregates Enforce Invariants",
      content: (
        <div className="space-y-6">
          <div className="card">
            <h4 className="font-semibold mb-3">What is an Invariant?</h4>
            <p className="text-sm text-gray-700 mb-4">
              An <strong>invariant</strong> is a business rule that must <em>always</em> be true.
              The aggregate is responsible for maintaining these rules.
            </p>

            <div className="bg-purple-50 border-2 border-purple-300 rounded p-4">
              <p className="font-semibold text-purple-900 mb-3">Example Invariant:</p>
              <p className="text-sm text-purple-800 font-mono">
                "A completed ride must have an assigned driver"
              </p>
            </div>
          </div>

          <div className="card bg-white">
            <h4 className="font-semibold mb-3">How Aggregates Enforce Invariants</h4>
            <motion.div
              className="bg-gray-50 p-4 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <pre className="text-xs font-mono">
{`private void EnforceInvariants() {
  // INVARIANT: Can't complete without driver
  if (Status == RideStatus.Completed && DriverId == null)
    throw new InvalidOperationException(
      "Aggregate invariant violated: " +
      "Cannot complete a ride without an assigned driver"
    );

  // INVARIANT: Price must be positive
  if (Price != null && Price.Amount <= 0)
    throw new InvalidOperationException(
      "Aggregate invariant violated: " +
      "Price must be positive"
    );

  // More invariants...
}

public void Complete() {
  // Guard clauses
  if (Status != RideStatus.Accepted) throw ...;
  if (DriverId == null) throw ...;

  // Make the change
  _root.Complete();

  // CRITICAL: Verify all invariants
  EnforceInvariants(); // ✅
}`}
              </pre>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              className="card bg-red-50 border-red-200"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h4 className="font-semibold text-red-900 mb-2">Without Invariants</h4>
              <ul className="text-sm space-y-2">
                <li>• Status = Completed, DriverId = null ❌</li>
                <li>• Price = -$50 ❌</li>
                <li>• Pickup = Dropoff ❌</li>
                <li>• Data corruption ❌</li>
              </ul>
            </motion.div>

            <motion.div
              className="card bg-green-50 border-green-200"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <h4 className="font-semibold text-green-900 mb-2">With Invariants</h4>
              <ul className="text-sm space-y-2">
                <li>• Completed always has driver ✅</li>
                <li>• Price always positive ✅</li>
                <li>• Pickup ≠ Dropoff ✅</li>
                <li>• Data integrity guaranteed ✅</li>
              </ul>
            </motion.div>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> Invariants are the contract that defines the aggregate's consistency boundary.
              Bertrand Meyer's Design by Contract: the aggregate maintains class invariants that hold before and after
              every public method call. This enables local reasoning—you can understand an aggregate in isolation without
              considering the entire system state.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 5: Why This Matters
    {
      title: "Real-World Impact of Aggregates",
      content: (
        <div className="space-y-6">
          <div className="card bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3">The Problems Aggregates Solve</h4>
            <div className="space-y-4">
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-2xl">🐛</span>
                <div>
                  <p className="font-semibold">Data Corruption</p>
                  <p className="text-sm text-gray-700">
                    Without aggregates: scattered business logic means invalid states slip through.
                    <br />
                    <span className="text-green-600">With aggregates: impossible to violate invariants.</span>
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-semibold">Concurrency Issues</p>
                  <p className="text-sm text-gray-700">
                    Without aggregates: race conditions when multiple users edit same data.
                    <br />
                    <span className="text-green-600">With aggregates: clear transaction boundaries prevent conflicts.</span>
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-2xl">🔍</span>
                <div>
                  <p className="font-semibold">Testing Complexity</p>
                  <p className="text-sm text-gray-700">
                    Without aggregates: must test scattered logic across entire system.
                    <br />
                    <span className="text-green-600">With aggregates: test the aggregate in isolation—all rules in one place.</span>
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-2xl">📈</span>
                <div>
                  <p className="font-semibold">Scalability</p>
                  <p className="text-sm text-gray-700">
                    Without aggregates: monolithic transactions lock entire database.
                    <br />
                    <span className="text-green-600">With aggregates: small, focused transactions = better performance.</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="card bg-green-50">
            <h4 className="font-semibold text-green-900 mb-3">Design Rules (from Eric Evans' DDD)</h4>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Keep aggregates small</strong> - Ideally just the root + a few value objects</li>
              <li>• <strong>Reference other aggregates by ID only</strong> - Not by direct object reference</li>
              <li>• <strong>Use eventual consistency between aggregates</strong> - Don't span transactions</li>
              <li>• <strong>Enforce invariants only within the boundary</strong> - Not across aggregates</li>
              <li>• <strong>One aggregate per transaction</strong> - Keeps transactions fast and focused</li>
            </ul>
          </div>

          <div className="card bg-purple-50">
            <h4 className="font-semibold mb-2">Example from the Real World</h4>
            <p className="text-sm text-gray-700">
              At Uber, each Ride is an aggregate. You can't edit a ride's driver, status, or route directly.
              You must go through methods like <code className="bg-white px-2 py-1 rounded">AssignDriver()</code>,
              <code className="bg-white px-2 py-1 rounded">StartTrip()</code>, or{' '}
              <code className="bg-white px-2 py-1 rounded">CompleteRide()</code>.
              Each method checks business rules (invariants) before making changes. This prevents millions of dollars
              in data corruption bugs.
            </p>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> Aggregates are isomorphic to transactional boundaries in distributed systems.
              They align with Pat Helland's "Data on the Outside vs Data on the Inside"—data inside an aggregate is
              strongly consistent, while data across aggregates is eventually consistent. This enables horizontal scaling
              while maintaining correctness. In event-sourced systems, aggregates are the write-side consistency units,
              with event streams forming the transaction log.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return <Slideshow slides={slides} />;
}
