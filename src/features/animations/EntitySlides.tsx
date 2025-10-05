import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slideshow } from '@/shared/components';

/**
 * Entity Interactive Slideshow
 * Teaches the concept of Entities: objects with identity that persist over time
 */

export function EntitySlides() {
  const slides = [
    // Slide 1: What makes something an Entity?
    {
      title: "What is an Entity?",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Value Object side */}
            <div className="card bg-blue-50 border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">Value Objects</h4>
              <p className="text-sm text-gray-700 mb-4">Defined by their VALUE</p>
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-white p-3 rounded border border-blue-200">
                  <code className="text-sm">Money(100, "USD")</code>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <code className="text-sm">Money(100, "USD")</code>
                </div>
                <p className="text-xs text-blue-700 mt-2">
                  ✓ These are <strong>identical</strong>
                  <br />
                  Same amount + currency = Same object
                </p>
              </motion.div>
            </div>

            {/* Entity side */}
            <div className="card bg-purple-50 border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-3">Entities</h4>
              <p className="text-sm text-gray-700 mb-4">Defined by their IDENTITY</p>
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-white p-3 rounded border border-purple-200">
                  <code className="text-sm">User(Id: 123, Name: "Alice")</code>
                </div>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <code className="text-sm">User(Id: 456, Name: "Alice")</code>
                </div>
                <p className="text-xs text-purple-700 mt-2">
                  ✗ These are <strong>different</strong>
                  <br />
                  Different IDs = Different users (even with same name!)
                </p>
              </motion.div>
            </div>
          </div>

          <div className="card bg-gray-50">
            <p className="text-sm text-gray-700">
              <strong>For complete beginners:</strong> Think of your social media account. Even if you change your profile picture,
              bio, or posts, it's still <em>your</em> account. The account ID never changes - that's what makes it an Entity.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 2: Identity Over Time
    {
      title: "Identity Persists Over Time",
      content: (
        <div className="space-y-6">
          <div className="card">
            <h4 className="font-semibold mb-4">A Ride-Share Journey</h4>
            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-4 p-4 bg-yellow-50 rounded border border-yellow-200"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-2xl">📱</div>
                <div>
                  <p className="font-semibold text-sm">Ride #789 - Requested</p>
                  <p className="text-xs text-gray-600">No driver yet, status: Requested</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 bg-blue-50 rounded border border-blue-200"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-2xl">🚗</div>
                <div>
                  <p className="font-semibold text-sm">Ride #789 - Accepted</p>
                  <p className="text-xs text-gray-600">Driver assigned, status: Accepted</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 bg-green-50 rounded border border-green-200"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-2xl">✅</div>
                <div>
                  <p className="font-semibold text-sm">Ride #789 - Completed</p>
                  <p className="text-xs text-gray-600">Trip finished, status: Completed</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="card bg-purple-50">
            <p className="text-sm">
              <strong>Same Ride (ID #789), Different States</strong>
              <br />
              The <em>identity</em> never changes, but the <em>attributes</em> (driver, status) change over time.
              This is what makes it an Entity, not a Value Object.
            </p>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> Entities are mutable by design because they model real-world objects
              that change over time while maintaining continuity of identity. This is fundamentally different from
              Value Objects, which are immutable and lack diachronic identity.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 3: Entities Contain Behavior
    {
      title: "Entities Encapsulate Domain Logic",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Anemic model (bad) */}
            <div className="card bg-red-50 border-red-200">
              <h4 className="font-semibold text-red-900 mb-3">❌ Anemic Model (Bad)</h4>
              <div className="bg-white p-3 rounded font-mono text-xs space-y-2">
                <div className="text-gray-600">// Just data, no behavior</div>
                <div>class Ride {'{'}</div>
                <div className="ml-4">public Guid Id;</div>
                <div className="ml-4">public string Status;</div>
                <div className="ml-4">public Guid? DriverId;</div>
                <div>{'}'}</div>
                <div className="mt-4 text-gray-600">// Logic scattered in services</div>
                <div>void AssignDriver(Ride ride, Guid id) {'{'}</div>
                <div className="ml-4">ride.DriverId = id;</div>
                <div className="ml-4">ride.Status = "Accepted";</div>
                <div>{'}'}</div>
              </div>
              <p className="text-xs text-red-700 mt-3">
                Business rules are outside the entity. Anyone can set invalid states!
              </p>
            </div>

            {/* Rich model (good) */}
            <div className="card bg-green-50 border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">✅ Rich Domain Model (Good)</h4>
              <motion.div
                className="bg-white p-3 rounded font-mono text-xs space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-gray-600">// Behavior + data together</div>
                <div>class Ride {'{'}</div>
                <div className="ml-4">private Guid Id;</div>
                <div className="ml-4">private RideStatus Status;</div>
                <div className="ml-4">private Guid? DriverId;</div>
                <div className="mt-2 ml-4 text-blue-600">// Domain method</div>
                <div className="ml-4">public void AssignDriver(Guid id) {'{'}</div>
                <div className="ml-8 text-orange-600">if (Status != Requested)</div>
                <div className="ml-10">throw new Exception();</div>
                <div className="ml-8">DriverId = id;</div>
                <div className="ml-8">Status = Accepted;</div>
                <div className="ml-4">{'}'}</div>
                <div>{'}'}</div>
              </motion.div>
              <p className="text-xs text-green-700 mt-3">
                Business rules are protected inside the entity. Invalid states are impossible!
              </p>
            </div>
          </div>

          <div className="card bg-blue-50">
            <p className="text-sm">
              <strong>Tell, Don't Ask</strong>
              <br />
              Instead of asking for data and manipulating it externally, we <em>tell</em> the entity what to do.
              The entity decides <em>how</em> based on its internal business rules.
            </p>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> This is the core principle of object-oriented design as originally
              conceived by Alan Kay: objects are autonomous agents that respond to messages. The entity is not a
              data structure with getters/setters—it's a behavioral contract that maintains its own invariants.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 4: State Transitions
    {
      title: "Entities Enforce State Transitions",
      content: (
        <div className="space-y-6">
          <div className="card">
            <h4 className="font-semibold mb-4">Valid State Machine</h4>
            <div className="flex items-center justify-center gap-8 py-8">
              <motion.div
                className="px-6 py-3 bg-yellow-100 border-2 border-yellow-400 rounded-lg font-semibold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                Requested
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl"
              >
                →
              </motion.div>
              <motion.div
                className="px-6 py-3 bg-blue-100 border-2 border-blue-400 rounded-lg font-semibold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                Accepted
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.8 }}
                className="text-2xl"
              >
                →
              </motion.div>
              <motion.div
                className="px-6 py-3 bg-green-100 border-2 border-green-400 rounded-lg font-semibold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.0 }}
              >
                Completed
              </motion.div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              className="card bg-green-50 border-green-200"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <h4 className="font-semibold text-green-900 mb-2">✅ Allowed</h4>
              <ul className="text-sm space-y-1">
                <li>• Requested → Accepted (assign driver)</li>
                <li>• Accepted → Completed (finish ride)</li>
              </ul>
            </motion.div>

            <motion.div
              className="card bg-red-50 border-red-200"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <h4 className="font-semibold text-red-900 mb-2">❌ Prevented</h4>
              <ul className="text-sm space-y-1">
                <li>• Requested → Completed (no driver!)</li>
                <li>• Completed → Accepted (already done!)</li>
                <li>• Accepted → Requested (going backwards!)</li>
              </ul>
            </motion.div>
          </div>

          <div className="card bg-purple-50">
            <p className="text-sm">
              <strong>Guard Clauses</strong> prevent invalid state transitions:
            </p>
            <pre className="bg-white p-3 rounded mt-2 text-xs font-mono">
{`public void Complete() {
  if (Status != RideStatus.Accepted)
    throw new InvalidOperationException(
      "Cannot complete ride in Requested status"
    );

  if (DriverId == null)
    throw new InvalidOperationException(
      "Cannot complete ride without a driver"
    );

  Status = RideStatus.Completed;
}`}
            </pre>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> This is a finite state machine (FSM) encoded in the entity's methods.
              Each method represents a valid state transition with preconditions (guards) and postconditions (new state).
              This ensures type-state programming: illegal states are unrepresentable at runtime.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 5: Real-World Impact
    {
      title: "Why This Matters",
      content: (
        <div className="space-y-6">
          <div className="card bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-3">Without Entities (Anemic Model)</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="text-red-500">❌</span>
                <div>
                  <p className="font-semibold">Business logic scattered everywhere</p>
                  <p className="text-xs text-gray-600">Controllers, services, helpers all manipulate data directly</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-red-500">❌</span>
                <div>
                  <p className="font-semibold">Easy to create invalid states</p>
                  <p className="text-xs text-gray-600">ride.Status = "Completed" without checking for driver</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-red-500">❌</span>
                <div>
                  <p className="font-semibold">Hard to test</p>
                  <p className="text-xs text-gray-600">Need to spin up entire app to test business rules</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-red-500">❌</span>
                <div>
                  <p className="font-semibold">Bugs creep in easily</p>
                  <p className="text-xs text-gray-600">Developer forgets to check status before changing driver</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-green-50">
            <h4 className="font-semibold text-green-900 mb-3">With Entities (Rich Model)</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="text-green-500">✅</span>
                <div>
                  <p className="font-semibold">Business logic in one place</p>
                  <p className="text-xs text-gray-600">All ride rules live in the Ride class</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-green-500">✅</span>
                <div>
                  <p className="font-semibold">Invalid states impossible</p>
                  <p className="text-xs text-gray-600">Can't complete a ride without a driver - the code won't compile or will throw</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-green-500">✅</span>
                <div>
                  <p className="font-semibold">Easy to test</p>
                  <p className="text-xs text-gray-600">var ride = new Ride(passengerId); ride.Complete(); // should throw</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-green-500">✅</span>
                <div>
                  <p className="font-semibold">Self-documenting</p>
                  <p className="text-xs text-gray-600">Reading Ride.cs tells you all the business rules</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-purple-50">
            <h4 className="font-semibold mb-2">The Bottom Line</h4>
            <p className="text-sm">
              Entities put business logic where it belongs: <strong>inside the objects that own that behavior</strong>.
              This makes your codebase easier to understand, safer to change, and faster to test.
            </p>
          </div>

          <div className="card bg-gray-50">
            <p className="text-xs text-gray-700">
              🎓 <strong>For experts:</strong> Eric Evans (Domain-Driven Design): "Many objects are not fundamentally
              defined by their attributes, but rather by a thread of continuity and identity." Entities model this
              continuity. They are the locus of domain behavior, not mere data holders. This aligns with the
              Command-Query Separation principle: queries read state, commands mutate state through well-defined methods.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return <Slideshow slides={slides} />;
}
