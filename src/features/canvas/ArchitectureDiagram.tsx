import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ComponentInfo = {
  name: string;
  description: string;
  examples: string[];
  role: string;
};

const components: Record<string, ComponentInfo> = {
  valueObject: {
    name: 'Value Object',
    description: 'Immutable objects defined by their attributes, not identity',
    examples: ['Money', 'Email', 'Address', 'DateRange'],
    role: 'Building blocks that describe properties',
  },
  entity: {
    name: 'Entity',
    description: 'Objects with unique identity that persist over time',
    examples: ['User', 'Order', 'Ride', 'Product'],
    role: 'Core domain objects with lifecycle and behavior',
  },
  aggregate: {
    name: 'Aggregate',
    description: 'Cluster of entities and value objects treated as a unit',
    examples: ['OrderAggregate', 'RideAggregate', 'CartAggregate'],
    role: 'Consistency boundary that enforces invariants',
  },
  repository: {
    name: 'Repository',
    description: 'Interface for persisting and retrieving aggregates',
    examples: ['IOrderRepository', 'IRideRepository', 'IUserRepository'],
    role: 'Persistence abstraction (Port)',
  },
  useCase: {
    name: 'Use Case',
    description: 'Application workflow that orchestrates domain logic',
    examples: ['CreateOrder', 'RequestRide', 'UpdateProfile'],
    role: 'Entry point for business operations',
  },
  domainService: {
    name: 'Domain Service',
    description: 'Stateless operation that doesn\'t belong to an entity',
    examples: ['PricingService', 'DistanceCalculator', 'InventoryChecker'],
    role: 'Cross-aggregate business logic',
  },
};

export function ArchitectureDiagram() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Main Diagram */}
      <div className="relative bg-white rounded-lg p-8 border-2 border-gray-200">
        <svg viewBox="0 0 1200 800" className="w-full h-auto">
          {/* Composition boundary */}
          <motion.ellipse
            cx="350"
            cy="500"
            rx="300"
            ry="350"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
            strokeDasharray="10,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
          <text x="350" y="150" textAnchor="middle" fontSize="18" fill="#6b7280" fontWeight="600">
            Composition
          </text>

          {/* Behavior boundary */}
          <motion.ellipse
            cx="350"
            cy="350"
            rx="250"
            ry="180"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="3"
            strokeDasharray="10,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
          />
          <text x="350" y="210" textAnchor="middle" fontSize="18" fill="#6b7280" fontWeight="600">
            Behavior
          </text>

          {/* Lifecycle boundary */}
          <motion.ellipse
            cx="900"
            cy="500"
            rx="250"
            ry="300"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
            strokeDasharray="10,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
          <text x="900" y="220" textAnchor="middle" fontSize="18" fill="#6b7280" fontWeight="600">
            Life Cycle
          </text>

          {/* Value Object */}
          <motion.g
            onMouseEnter={() => setHoveredComponent('valueObject')}
            onMouseLeave={() => setHoveredComponent(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="cursor-pointer"
          >
            <ellipse cx="350" cy="650" rx="120" ry="50" fill="#fecaca" stroke="#dc2626" strokeWidth="2" />
            <text x="350" y="660" textAnchor="middle" fontSize="16" fontWeight="600">
              Value Object
            </text>
          </motion.g>

          {/* Entity */}
          <motion.g
            onMouseEnter={() => setHoveredComponent('entity')}
            onMouseLeave={() => setHoveredComponent(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="cursor-pointer"
          >
            <ellipse cx="350" cy="500" rx="120" ry="50" fill="#d4a5f9" stroke="#9333ea" strokeWidth="2" />
            <text x="350" y="505" textAnchor="middle" fontSize="16" fontWeight="600">
              Entity
            </text>
            <text x="350" y="525" textAnchor="middle" fontSize="10" fill="#581c87">
              ID = BTG0281
            </text>
          </motion.g>

          {/* Aggregate (container) */}
          <motion.g
            onMouseEnter={() => setHoveredComponent('aggregate')}
            onMouseLeave={() => setHoveredComponent(null)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="cursor-pointer"
          >
            <ellipse cx="550" cy="350" rx="180" ry="100" fill="#86efac" stroke="#16a34a" strokeWidth="3" />
            <text x="550" y="330" textAnchor="middle" fontSize="18" fontWeight="700">
              Aggregate
            </text>

            {/* Inner entities */}
            <ellipse cx="480" cy="380" rx="60" ry="30" fill="#fecaca" stroke="#dc2626" strokeWidth="1" />
            <text x="480" y="388" textAnchor="middle" fontSize="12">Entity</text>

            <ellipse cx="620" cy="380" rx="60" ry="30" fill="#fecaca" stroke="#dc2626" strokeWidth="1" />
            <text x="620" y="388" textAnchor="middle" fontSize="12">Entity</text>
          </motion.g>

          {/* Aggregate root label */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <ellipse cx="550" y="280" rx="100" ry="35" fill="#d4a5f9" stroke="#9333ea" strokeWidth="2" />
            <text x="550" y="290" textAnchor="middle" fontSize="14" fontWeight="600">
              Aggregate root
            </text>
          </motion.g>

          {/* Domain Service */}
          <motion.g
            onMouseEnter={() => setHoveredComponent('domainService')}
            onMouseLeave={() => setHoveredComponent(null)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
            className="cursor-pointer"
          >
            <ellipse cx="150" cy="350" rx="120" ry="50" fill="#a5f3fc" stroke="#0891b2" strokeWidth="2" />
            <text x="150" y="360" textAnchor="middle" fontSize="14" fontWeight="600">
              Domain Service
            </text>
          </motion.g>

          {/* Repository */}
          <motion.g
            onMouseEnter={() => setHoveredComponent('repository')}
            onMouseLeave={() => setHoveredComponent(null)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 }}
            className="cursor-pointer"
          >
            <ellipse cx="900" cy="400" rx="120" ry="50" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
            <text x="900" y="410" textAnchor="middle" fontSize="14" fontWeight="600">
              Repository
            </text>
          </motion.g>

          {/* Factory */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
          >
            <ellipse cx="850" cy="280" rx="100" ry="45" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
            <text x="850" y="290" textAnchor="middle" fontSize="14" fontWeight="600">
              Factory
            </text>
          </motion.g>

          {/* Domain Event */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <ellipse cx="550" cy="150" rx="120" ry="45" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
            <text x="550" y="160" textAnchor="middle" fontSize="14" fontWeight="600">
              Domain Event
            </text>
          </motion.g>

          {/* Database */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
          >
            <rect x="1050" y="470" width="80" height="100" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" rx="5" />
            <ellipse cx="1090" cy="470" rx="40" ry="10" fill="#d1d5db" stroke="#6b7280" strokeWidth="2" />
            <line x1="1050" y1="490" x2="1130" y2="490" stroke="#6b7280" strokeWidth="1" />
            <line x1="1050" y1="510" x2="1130" y2="510" stroke="#6b7280" strokeWidth="1" />
          </motion.g>

          {/* Arrows */}
          <motion.g
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 2.6 }}
          >
            {/* Value Object -> Entity (describe property) */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
              </marker>
            </defs>

            <path d="M 350 600 L 350 550" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="360" y="575" fontSize="12" fill="#374151">describe property</text>

            {/* Entity -> Aggregate (part of) */}
            <path d="M 400 450 L 480 380" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="420" y="410" fontSize="12" fill="#374151">part of</text>

            {/* Domain Service -> Aggregate (Orchestrate) */}
            <path d="M 250 320 L 400 320" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="280" y="310" fontSize="12" fill="#374151">Orchestrate</text>

            {/* Aggregate -> Domain Event (Publish changes) */}
            <path d="M 550 250 L 550 200" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="560" y="225" fontSize="12" fill="#374151">Publish changes</text>

            {/* Factory -> Aggregate (Create) */}
            <path d="M 820 320 L 700 340" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="740" y="320" fontSize="12" fill="#374151">Create</text>

            {/* Aggregate -> Repository (Store) */}
            <path d="M 680 380 L 800 390" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="720" y="375" fontSize="12" fill="#374151">Store</text>

            {/* Repository -> Aggregate (Load) */}
            <path d="M 820 430 L 700 420" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="740" y="440" fontSize="12" fill="#374151">Load</text>

            {/* Repository -> Database */}
            <path d="M 1000 420 L 1050 480" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
          </motion.g>
        </svg>

        {/* Info Panel */}
        <AnimatePresence>
          {hoveredComponent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-4 right-4 bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg max-w-sm"
            >
              <h3 className="font-bold text-lg mb-2">{components[hoveredComponent].name}</h3>
              <p className="text-sm text-gray-700 mb-3">{components[hoveredComponent].description}</p>
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-600 mb-1">Role:</p>
                <p className="text-xs text-gray-600">{components[hoveredComponent].role}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Examples:</p>
                <div className="flex flex-wrap gap-1">
                  {components[hoveredComponent].examples.map((example) => (
                    <span key={example} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="card">
        <h3 className="font-semibold mb-4">Key Relationships</h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-pink-300 border border-pink-600 rounded-full"></div>
            <span><strong>Value Objects</strong> describe Entity properties</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-300 border border-purple-600 rounded-full"></div>
            <span><strong>Entities</strong> are part of Aggregates</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-300 border border-green-600 rounded-full"></div>
            <span><strong>Aggregates</strong> enforce business rules</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-300 border border-yellow-600 rounded-full"></div>
            <span><strong>Repositories</strong> persist Aggregates</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-300 border border-cyan-600 rounded-full"></div>
            <span><strong>Domain Services</strong> orchestrate across Aggregates</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-violet-300 border border-violet-600 rounded-full"></div>
            <span><strong>Domain Events</strong> notify of changes</span>
          </div>
        </div>
      </div>

      {/* Interactive Tip */}
      <div className="card bg-blue-50 border-blue-200">
        <p className="text-sm text-gray-700">
          💡 <strong>Tip:</strong> Hover over any component in the diagram to see details, examples, and its role in the architecture!
        </p>
      </div>
    </div>
  );
}
