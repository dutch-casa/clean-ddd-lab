import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ComponentInfo = {
  name: string;
  description: string;
  examples: string[];
  layer: string;
};

const components: Record<string, ComponentInfo> = {
  valueObject: {
    name: 'Value Object',
    description: 'Immutable objects defined by their values. No identity, just attributes.',
    examples: ['Money(100, "USD")', 'Email("user@example.com")', 'Address'],
    layer: 'Domain Layer',
  },
  entity: {
    name: 'Entity',
    description: 'Objects with unique identity that persist over time. Same ID = same object.',
    examples: ['Ride (Id: 123)', 'User (Id: 456)', 'Order (Id: 789)'],
    layer: 'Domain Layer',
  },
  aggregate: {
    name: 'Aggregate',
    description: 'Consistency boundary. Groups entities/VOs that change together. Root is the entry point.',
    examples: ['RideAggregate', 'OrderAggregate', 'CartAggregate'],
    layer: 'Domain Layer',
  },
  domainService: {
    name: 'Domain Service (Advanced)',
    description: 'Stateless domain logic that doesn\'t belong in a single entity. Pure business logic, NO infrastructure.',
    examples: ['TransferMoney(fromAccount, toAccount)', 'CalculateShippingCost(order, address)'],
    layer: 'Domain Layer',
  },
  domainEvent: {
    name: 'Domain Event (Advanced)',
    description: 'Records that something happened in the domain. Published by aggregates when state changes.',
    examples: ['RideRequested', 'OrderPlaced', 'PaymentReceived'],
    layer: 'Domain Layer',
  },
  repository: {
    name: 'Repository (Port)',
    description: 'Interface for persistence. Domain defines WHAT it needs, infrastructure provides HOW.',
    examples: ['IRideRepository', 'IOrderRepository', 'IUserRepository'],
    layer: 'Application Layer (Interface)',
  },
  useCase: {
    name: 'Use Case',
    description: 'Application workflow. Orchestrates ACROSS aggregates, calls repositories, returns DTOs. This is where cross-aggregate logic lives!',
    examples: ['RequestRideUseCase', 'CreateOrderUseCase', 'TransferMoneyUseCase'],
    layer: 'Application Layer',
  },
};

export function SimpleArchitectureDiagram() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Main Diagram */}
      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-12 border-2 border-gray-200">
        <svg viewBox="0 0 1000 700" className="w-full h-auto">
          {/* Title */}
          <text x="500" y="40" textAnchor="middle" fontSize="24" fontWeight="700" fill="#1f2937">
            Clean Architecture Flow
          </text>

          {/* Layer labels */}
          <text x="50" y="120" fontSize="16" fontWeight="600" fill="#059669">DOMAIN LAYER</text>
          <text x="50" y="400" fontSize="16" fontWeight="600" fill="#0284c7">APPLICATION LAYER</text>
          <text x="50" y="600" fontSize="16" fontWeight="600" fill="#dc2626">INFRASTRUCTURE LAYER</text>

          {/* DOMAIN LAYER */}

          {/* Domain Service (Advanced) */}
          <motion.g
            onMouseEnter={() => setHoveredComponent('domainService')}
            onMouseLeave={() => setHoveredComponent(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="cursor-pointer"
          >
            <rect x="100" y="280" width="160" height="70" rx="10" fill="#a5f3fc" stroke="#0891b2" strokeWidth="2" strokeDasharray="5,5" />
            <text x="180" y="310" textAnchor="middle" fontSize="14" fontWeight="600">Domain Service</text>
            <text x="180" y="328" textAnchor="middle" fontSize="10" fill="#164e63">(Advanced)</text>
          </motion.g>

          {/* Domain Event (Advanced) */}
          <motion.g
            onMouseEnter={() => setHoveredComponent('domainEvent')}
            onMouseLeave={() => setHoveredComponent(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="cursor-pointer"
          >
            <rect x="520" y="60" width="160" height="70" rx="10" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="2" strokeDasharray="5,5" />
            <text x="600" y="90" textAnchor="middle" fontSize="14" fontWeight="600">Domain Event</text>
            <text x="600" y="108" textAnchor="middle" fontSize="10" fill="#5b21b6">(Advanced)</text>
          </motion.g>

          {/* Value Object */}
          <motion.g
            onMouseEnter={() => setHoveredComponent('valueObject')}
            onMouseLeave={() => setHoveredComponent(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="cursor-pointer"
          >
            <rect x="100" y="160" width="180" height="80" rx="40" fill="#fecaca" stroke="#dc2626" strokeWidth="3" />
            <text x="190" y="205" textAnchor="middle" fontSize="18" fontWeight="600">Value Object</text>
            <text x="190" y="225" textAnchor="middle" fontSize="12" fill="#7f1d1d">Money, Email, Address</text>
          </motion.g>

          {/* Entity */}
          <motion.g
            onMouseEnter={() => setHoveredComponent('entity')}
            onMouseLeave={() => setHoveredComponent(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="cursor-pointer"
          >
            <rect x="340" y="160" width="180" height="80" rx="40" fill="#d8b4fe" stroke="#9333ea" strokeWidth="3" />
            <text x="430" y="205" textAnchor="middle" fontSize="18" fontWeight="600">Entity</text>
            <text x="430" y="225" textAnchor="middle" fontSize="12" fill="#581c87">Ride, User, Order</text>
          </motion.g>

          {/* Aggregate */}
          <motion.g
            onMouseEnter={() => setHoveredComponent('aggregate')}
            onMouseLeave={() => setHoveredComponent(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="cursor-pointer"
          >
            <rect x="580" y="160" width="200" height="80" rx="40" fill="#86efac" stroke="#16a34a" strokeWidth="3" />
            <text x="680" y="200" textAnchor="middle" fontSize="18" fontWeight="600">Aggregate</text>
            <text x="680" y="220" textAnchor="middle" fontSize="12" fill="#14532d">(wraps Entity)</text>
          </motion.g>

          {/* Arrow: VO -> Entity */}
          <motion.g
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
              </marker>
            </defs>
            <path d="M 280 200 L 340 200" stroke="#374151" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="310" y="190" textAnchor="middle" fontSize="11" fill="#374151">has</text>
          </motion.g>

          {/* Arrow: Entity -> Aggregate */}
          <motion.g
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <path d="M 520 200 L 580 200" stroke="#374151" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="550" y="190" textAnchor="middle" fontSize="11" fill="#374151">root of</text>
          </motion.g>

          {/* APPLICATION LAYER */}

          {/* Repository Interface */}
          <motion.g
            onMouseEnter={() => setHoveredComponent('repository')}
            onMouseLeave={() => setHoveredComponent(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="cursor-pointer"
          >
            <rect x="580" y="440" width="200" height="80" rx="10" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
            <text x="680" y="475" textAnchor="middle" fontSize="18" fontWeight="600">Repository</text>
            <text x="680" y="495" textAnchor="middle" fontSize="12" fill="#713f12">(IRideRepository)</text>
          </motion.g>

          {/* Use Case */}
          <motion.g
            onMouseEnter={() => setHoveredComponent('useCase')}
            onMouseLeave={() => setHoveredComponent(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="cursor-pointer"
          >
            <rect x="200" y="440" width="200" height="80" rx="10" fill="#93c5fd" stroke="#2563eb" strokeWidth="3" />
            <text x="300" y="475" textAnchor="middle" fontSize="18" fontWeight="600">Use Case</text>
            <text x="300" y="495" textAnchor="middle" fontSize="12" fill="#1e3a8a">RequestRideUseCase</text>
          </motion.g>

          {/* Arrow: Use Case -> Aggregate (uses) */}
          <motion.g
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <path d="M 400 460 L 650 240" stroke="#2563eb" strokeWidth="3" markerEnd="url(#arrow)" strokeDasharray="5,5" />
            <text x="500" y="330" textAnchor="middle" fontSize="13" fontWeight="600" fill="#2563eb">creates/uses</text>
          </motion.g>

          {/* Arrow: Use Case -> Repository (depends on) */}
          <motion.g
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <path d="M 400 480 L 580 480" stroke="#374151" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="490" y="470" textAnchor="middle" fontSize="11" fill="#374151">depends on</text>
          </motion.g>

          {/* Arrow: Aggregate -> Domain Event (publishes) - Advanced */}
          <motion.g
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 1.7 }}
          >
            <path d="M 650 160 L 620 130" stroke="#7c3aed" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
            <text x="640" y="140" textAnchor="middle" fontSize="10" fill="#7c3aed">publishes</text>
          </motion.g>

          {/* Arrow: Domain Service -> Aggregate (uses) - Advanced */}
          <motion.g
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <path d="M 260 300 L 580 220" stroke="#0891b2" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
            <text x="420" y="250" textAnchor="middle" fontSize="10" fill="#0891b2">coordinates</text>
          </motion.g>

          {/* INFRASTRUCTURE LAYER */}

          {/* Database Implementation */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <rect x="580" y="620" width="200" height="60" rx="10" fill="#f87171" stroke="#dc2626" strokeWidth="3" />
            <text x="680" y="650" textAnchor="middle" fontSize="18" fontWeight="600">SQL Database</text>
            <text x="680" y="670" textAnchor="middle" fontSize="11" fill="#7f1d1d">(implements IRepository)</text>
          </motion.g>

          {/* Arrow: Repository -> Database (implemented by) */}
          <motion.g
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <path d="M 680 520 L 680 620" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="710" y="570" textAnchor="start" fontSize="12" fontWeight="600" fill="#dc2626">implements</text>
          </motion.g>

          {/* Dependency Direction Indicator */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
          >
            <rect x="820" y="300" width="150" height="200" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" rx="10" />
            <text x="895" y="330" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1f2937">Dependencies</text>
            <text x="895" y="355" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669">Point INWARD</text>

            <path d="M 895 380 L 895 450" stroke="#16a34a" strokeWidth="4" markerEnd="url(#arrow)" />

            <text x="895" y="475" textAnchor="middle" fontSize="11" fill="#374151">Infrastructure</text>
            <text x="895" y="490" textAnchor="middle" fontSize="11" fill="#374151">↓ depends on ↓</text>
            <text x="895" y="505" textAnchor="middle" fontSize="11" fill="#374151">Domain</text>
          </motion.g>
        </svg>

        {/* Info Panel */}
        <AnimatePresence>
          {hoveredComponent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-4 right-4 bg-white border-2 border-gray-400 rounded-lg p-4 shadow-xl max-w-sm z-10"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-900">{components[hoveredComponent].name}</h3>
              <p className="text-sm text-gray-700 mb-3">{components[hoveredComponent].description}</p>
              <div className="mb-3">
                <p className="text-xs font-semibold text-blue-600 mb-1">Layer:</p>
                <p className="text-xs text-gray-600">{components[hoveredComponent].layer}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Examples:</p>
                <div className="space-y-1">
                  {components[hoveredComponent].examples.map((example) => (
                    <div key={example} className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Clarifications */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card bg-green-50 border-green-200">
          <h3 className="font-semibold text-green-900 mb-3">✅ Core Concepts (Beginners)</h3>
          <ul className="text-sm space-y-2 text-gray-700">
            <li><strong>Value Objects</strong> - Immutable, equality by value</li>
            <li><strong>Entities</strong> - Mutable, identity over time</li>
            <li><strong>Aggregates</strong> - Consistency boundary, root is entry point</li>
            <li><strong>Repositories (Ports)</strong> - Persistence interface</li>
            <li><strong>Use Cases</strong> - Application orchestration</li>
          </ul>
        </div>

        <div className="card bg-purple-50 border-purple-200">
          <h3 className="font-semibold text-purple-900 mb-3">🎓 Advanced Concepts</h3>
          <ul className="text-sm space-y-2 text-gray-700">
            <li><strong>Domain Services</strong> - Domain logic that coordinates multiple aggregates (in domain layer, NO infrastructure)</li>
            <li><strong>Domain Events</strong> - Record of something that happened. Published by aggregates when state changes</li>
          </ul>
          <p className="text-xs text-purple-700 mt-3">
            💡 Dashed lines = advanced concepts
          </p>
        </div>

        <div className="card bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">🤔 Use Case vs Domain Service</h3>
          <div className="text-sm space-y-2 text-gray-700">
            <p><strong>Use Case (Application):</strong></p>
            <p className="text-xs">Orchestrates workflow, calls repos, returns DTOs. Can access infrastructure (via ports).</p>
            <p className="mt-2"><strong>Domain Service (Domain):</strong></p>
            <p className="text-xs">Pure business logic across entities. NO infrastructure access. Lives in domain layer.</p>
          </div>
        </div>
      </div>

      {/* Interactive Tip */}
      <div className="card bg-purple-50 border-purple-200">
        <p className="text-sm text-gray-700">
          💡 <strong>Hover over any component</strong> to see its description, layer, and examples!
        </p>
      </div>
    </div>
  );
}
