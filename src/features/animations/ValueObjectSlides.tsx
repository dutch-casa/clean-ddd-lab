import { motion } from 'framer-motion';
import { Slideshow, type Slide } from '@/shared/components/Slideshow';

const ValueVisual1 = () => (
  <div className="flex items-center justify-center gap-8">
    <motion.div
      className="w-32 h-32 rounded-lg bg-blue-500 flex flex-col items-center justify-center text-white text-sm font-mono shadow-lg"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring' }}
    >
      <div className="font-bold mb-2">Money</div>
      <div>$100</div>
      <div>USD</div>
    </motion.div>
  </div>
);

const ValueVisual2 = () => (
  <div className="flex items-center justify-center gap-4">
    <div className="w-28 h-28 rounded-lg bg-blue-500 flex flex-col items-center justify-center text-white text-sm font-mono shadow-lg">
      <div className="font-bold mb-1 text-xs">Money A</div>
      <div>$100</div>
      <div>USD</div>
    </div>
    <motion.div
      className="text-4xl font-bold"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ delay: 0.3 }}
    >
      =
    </motion.div>
    <div className="w-28 h-28 rounded-lg bg-blue-500 flex flex-col items-center justify-center text-white text-sm font-mono shadow-lg">
      <div className="font-bold mb-1 text-xs">Money B</div>
      <div>$100</div>
      <div>USD</div>
    </div>
  </div>
);

const ValueVisual3 = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-center gap-4">
      <div className="w-28 h-28 rounded-lg bg-blue-500 flex flex-col items-center justify-center text-white text-sm font-mono shadow-lg relative">
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
          Original
        </div>
        <div>$100</div>
        <div>USD</div>
      </div>
      <motion.div
        className="text-2xl"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        →
      </motion.div>
      <motion.div
        className="w-28 h-28 rounded-lg bg-green-500 flex flex-col items-center justify-center text-white text-sm font-mono shadow-lg relative"
        initial={{ scale: 0, x: -50 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <div className="absolute -top-2 -right-2 bg-emerald-400 text-black text-xs px-2 py-1 rounded-full font-bold">
          New!
        </div>
        <div>$150</div>
        <div>USD</div>
      </motion.div>
    </div>
    <motion.p
      className="text-center text-sm text-gray-600 italic"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      Original stays unchanged, new object created
    </motion.p>
  </div>
);

const ValueVisual4 = () => (
  <div className="space-y-4">
    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className="text-3xl">❌</div>
        <div>
          <div className="font-mono text-sm text-red-900">money.Amount = -50</div>
          <div className="text-xs text-red-700 mt-1">ERROR: Amount cannot be negative!</div>
        </div>
      </div>
    </div>
    <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className="text-3xl">✅</div>
        <div>
          <div className="font-mono text-sm text-emerald-900">Money.Create(100, "USD")</div>
          <div className="text-xs text-emerald-700 mt-1">SUCCESS: Valid money created!</div>
        </div>
      </div>
    </div>
  </div>
);

const slides: Slide[] = [
  {
    title: '1. What is a Value Object?',
    content: (
      <>
        <p className="text-lg">
          <strong>Value Objects</strong> are like numbers or measurements - they're defined by what they contain, not by who they are.
        </p>
        <p>
          Think of money: Two $100 bills are the same, even if they have different serial numbers. We care about the <em>value</em> (100 dollars), not the <em>identity</em> (which specific bill).
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 text-sm">
          <strong>Real-world examples:</strong> Money, dates, email addresses, colors, phone numbers, addresses
        </div>
      </>
    ),
    visual: <ValueVisual1 />,
  },
  {
    title: '2. Equality by Value',
    content: (
      <>
        <p className="text-lg">
          Two Value Objects are <strong>equal</strong> if all their values match.
        </p>
        <p>
          Money A ($100 USD) = Money B ($100 USD), even though they're different objects in memory.
          This is different from comparing by reference/identity.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 text-sm">
          <strong>For programmers:</strong> Value Objects override equality (Equals/==) to compare by value, not reference.
          In C#, we use <code className="bg-gray-200 px-1 rounded">record struct</code> which does this automatically.
        </div>
      </>
    ),
    visual: <ValueVisual2 />,
  },
  {
    title: '3. Immutability',
    content: (
      <>
        <p className="text-lg">
          Value Objects <strong>cannot be changed</strong> after creation. Instead, you create a new one.
        </p>
        <p>
          Want to change $100 to $150? You don't modify the original - you create a new Money object with $150.
          The original $100 stays exactly as it was.
        </p>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-3 text-sm">
          <strong>Why this matters:</strong> Immutability prevents bugs! Once created, you know it can never be in an invalid state.
          Multiple parts of your code can safely share the same Value Object without worrying about someone changing it.
        </div>
      </>
    ),
    visual: <ValueVisual3 />,
  },
  {
    title: '4. Self-Validation',
    content: (
      <>
        <p className="text-lg">
          Value Objects <strong>validate themselves</strong> when created. Invalid Value Objects cannot exist.
        </p>
        <p>
          Try to create Money with a negative amount? BOOM! Error. Invalid currency code? BOOM! Error.
          Once a Value Object exists, you know it's valid.
        </p>
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 text-sm">
          <strong>Clean Architecture principle:</strong> Business rules (like "money can't be negative") live in the domain,
          not in the database or UI. The Value Object enforces these rules at creation time.
        </div>
      </>
    ),
    visual: <ValueVisual4 />,
  },
  {
    title: '5. Real-World Impact',
    content: (
      <>
        <p className="text-lg font-semibold text-brand-600">
          Using Value Objects eliminates entire categories of bugs.
        </p>
        <div className="space-y-3">
          <div className="bg-white border-2 border-gray-300 rounded p-3">
            <div className="font-semibold text-red-600 mb-1">❌ Without Value Objects:</div>
            <code className="text-sm">decimal amount = -100; // Oops, negative money!</code>
          </div>
          <div className="bg-white border-2 border-emerald-300 rounded p-3">
            <div className="font-semibold text-emerald-600 mb-1">✅ With Value Objects:</div>
            <code className="text-sm">Money.Create(-100, "USD") // Throws error immediately!</code>
          </div>
        </div>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-3 text-sm mt-4">
          <strong>For experts:</strong> Value Objects are the building blocks of your domain model.
          They push validation to the edges (creation time) and make invalid states unrepresentable.
          This is "type-driven development" - using the type system to enforce business rules at compile time.
        </div>
      </>
    ),
  },
];

export function ValueObjectSlides() {
  return <Slideshow slides={slides} title="Understanding Value Objects" />;
}
