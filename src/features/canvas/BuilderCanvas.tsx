import { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  ConnectionMode,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { ValueObjectNode } from './nodes/ValueObjectNode';
import { EntityNode } from './nodes/EntityNode';
import { AggregateNode } from './nodes/AggregateNode';
import { RepositoryNode } from './nodes/RepositoryNode';
import { UseCaseNode } from './nodes/UseCaseNode';
import { generateAllCode } from '../codegen/emitter';
import { DomainGraph } from '@/shared/types';
import { CodePane } from '@/shared/components';

const nodeTypes = {
  valueObject: ValueObjectNode,
  entity: EntityNode,
  aggregate: AggregateNode,
  repository: RepositoryNode,
  useCase: UseCaseNode,
};

// Component palette - drag from here to canvas
const PALETTE_ITEMS = [
  { type: 'valueObject', label: 'Value Object', color: 'bg-blue-100 border-blue-400' },
  { type: 'entity', label: 'Entity', color: 'bg-green-100 border-green-400' },
  { type: 'aggregate', label: 'Aggregate', color: 'bg-purple-100 border-purple-400' },
  { type: 'repository', label: 'Repository', color: 'bg-pink-100 border-pink-400' },
  { type: 'useCase', label: 'Use Case', color: 'bg-orange-100 border-orange-400' },
];

// Solution graph - the "correct" arrangement
const SOLUTION_NODES: Node[] = [
  {
    id: 'vo-1',
    type: 'valueObject',
    position: { x: 50, y: 100 },
    data: { id: 'vo-1', name: 'Money', primitives: ['Amount: decimal', 'Currency: string'] },
  },
  {
    id: 'entity-1',
    type: 'entity',
    position: { x: 400, y: 100 },
    data: {
      id: 'entity-1',
      name: 'Ride',
      fields: [
        { kind: 'primitive', name: 'Id', type: 'Guid' },
        { kind: 'primitive', name: 'PassengerId', type: 'Guid' },
        { kind: 'primitive', name: 'DriverId', type: 'Guid?' },
        { kind: 'primitive', name: 'Status', type: 'RideStatus' },
      ],
      methods: ['AssignDriver(Guid driverId)', 'Complete()'],
    },
  },
  {
    id: 'agg-1',
    type: 'aggregate',
    position: { x: 750, y: 100 },
    data: { id: 'agg-1', name: 'RideAggregate', rootEntityId: 'entity-1' },
  },
  {
    id: 'repo-1',
    type: 'repository',
    position: { x: 400, y: 400 },
    data: { id: 'repo-1', name: 'IRideRepository', aggregateId: 'agg-1' },
  },
  {
    id: 'uc-1',
    type: 'useCase',
    position: { x: 750, y: 400 },
    data: { id: 'uc-1', name: 'RequestRide', repoIds: ['repo-1'], writes: ['agg-1'] },
  },
];

const SOLUTION_EDGES: Edge[] = [
  {
    id: 'e-vo-entity',
    source: 'vo-1',
    target: 'entity-1',
    label: 'used by',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-entity-agg',
    source: 'entity-1',
    target: 'agg-1',
    label: 'root of',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#9333ea', strokeWidth: 2 },
  },
  {
    id: 'e-repo-uc',
    source: 'repo-1',
    target: 'uc-1',
    label: 'used by',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-uc-agg',
    source: 'uc-1',
    target: 'agg-1',
    label: 'writes to',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#ef4444', strokeDasharray: '5,5' },
  },
];

export function BuilderCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeIdCounter, setNodeIdCounter] = useState(1);
  const [showCode, setShowCode] = useState(false);

  // Convert canvas to domain graph for code generation
  const domainGraph = useMemo((): DomainGraph => {
    const valueObjects = nodes
      .filter((n) => n.type === 'valueObject')
      .map((n) => ({
        id: n.id,
        name: n.data.name || 'Unnamed',
        primitives: n.data.primitives || [],
      }));

    const entities = nodes
      .filter((n) => n.type === 'entity')
      .map((n) => ({
        id: n.id,
        name: n.data.name || 'Unnamed',
        fields: n.data.fields || [],
        methods: n.data.methods || [],
      }));

    const aggregates = nodes
      .filter((n) => n.type === 'aggregate')
      .map((n) => ({
        id: n.id,
        name: n.data.name || 'Unnamed',
        rootEntityId: n.data.rootEntityId || '',
      }));

    const repositories = nodes
      .filter((n) => n.type === 'repository')
      .map((n) => ({
        id: n.id,
        name: n.data.name || 'Unnamed',
        aggregateId: n.data.aggregateId || '',
      }));

    const useCases = nodes
      .filter((n) => n.type === 'useCase')
      .map((n) => ({
        id: n.id,
        name: n.data.name || 'Unnamed',
        repoIds: n.data.repoIds || [],
        writes: n.data.writes || [],
      }));

    return { valueObjects, entities, aggregates, repositories, useCases };
  }, [nodes]);

  const generatedFiles = useMemo(() => generateAllCode(domainGraph), [domainGraph]);

  // Validate connections based on domain rules
  const isValidConnection = (connection: Connection): { valid: boolean; message?: string } => {
    const sourceNode = nodes.find((n) => n.id === connection.source);
    const targetNode = nodes.find((n) => n.id === connection.target);

    if (!sourceNode || !targetNode) return { valid: false };

    const sourceType = sourceNode.type;
    const targetType = targetNode.type;

    // Valid connection rules (based on DDD patterns)
    const validRules: Record<string, string[]> = {
      valueObject: ['entity'], // VOs used by Entities
      entity: ['aggregate'], // Entities wrapped by Aggregates
      aggregate: ['repository', 'useCase'], // Aggregates used by Repos and Use Cases
      repository: ['useCase'], // Repositories used by Use Cases
    };

    const allowedTargets = validRules[sourceType || ''] || [];

    if (!allowedTargets.includes(targetType || '')) {
      return {
        valid: false,
        message: `Cannot connect ${sourceType} → ${targetType}. Try: ${allowedTargets.join(', ')}`,
      };
    }

    return { valid: true };
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      const validation = isValidConnection(connection);

      if (!validation.valid) {
        alert(`❌ Invalid connection!\n\n${validation.message}`);
        return;
      }

      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: 'smoothstep',
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed },
            style: { stroke: '#10b981', strokeWidth: 2 }, // Green for valid connections
          },
          eds
        )
      );
    },
    [setEdges, nodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - 250, // Adjust for canvas offset
        y: event.clientY - 100,
      };

      const newNode: Node = {
        id: `${type}-${nodeIdCounter}`,
        type,
        position,
        data: {
          id: `${type}-${nodeIdCounter}`,
          name: `New ${PALETTE_ITEMS.find((p) => p.type === type)?.label}`,
        },
      };

      setNodes((nds) => [...nds, newNode]);
      setNodeIdCounter((c) => c + 1);
    },
    [nodeIdCounter, setNodes]
  );

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const showSolution = () => {
    setNodes(SOLUTION_NODES);
    setEdges(SOLUTION_EDGES);
  };

  const clearCanvas = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <div className="space-y-4">
      {/* Palette */}
      <div className="card">
        <h3 className="font-semibold mb-3">🧩 Component Palette (Drag to Canvas)</h3>
        <div className="flex gap-3 flex-wrap">
          {PALETTE_ITEMS.map((item) => (
            <motion.div
              key={item.type}
              className={`${item.color} border-2 rounded-lg px-4 py-2 cursor-move font-semibold text-sm`}
              draggable
              onDragStart={(e) => onDragStart(e, item.type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={showSolution}
          className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          ✨ Show Solution
        </button>
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          🗑️ Clear Canvas
        </button>
        <button
          onClick={() => setShowCode(!showCode)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          {showCode ? '👁️ Hide Code' : '💻 Show Generated Code'}
        </button>
      </div>

      {/* Canvas */}
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden" style={{ height: '500px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {/* Hints */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card bg-blue-50">
          <p className="text-sm font-semibold text-gray-700 mb-2">💡 How to Build</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>1. <strong>Drag</strong> components from palette to canvas</li>
            <li>2. <strong>Connect</strong> by dragging from one node's edge to another</li>
            <li>3. Follow the flow: <strong>Value Objects → Entities → Aggregates → Repos → Use Cases</strong></li>
            <li>4. Click <strong>"Show Solution"</strong> to see the correct architecture!</li>
          </ul>
        </div>

        <div className="card bg-green-50">
          <p className="text-sm font-semibold text-gray-700 mb-2">✅ Valid Connections</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• <strong>Value Object → Entity</strong> (composition)</li>
            <li>• <strong>Entity → Aggregate</strong> (aggregate root)</li>
            <li>• <strong>Aggregate → Repository</strong> (persistence)</li>
            <li>• <strong>Repository → Use Case</strong> (dependency)</li>
            <li>• <strong>Aggregate → Use Case</strong> (writes to)</li>
          </ul>
        </div>
      </div>

      {/* Generated Code */}
      {showCode && generatedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold">Generated Code</h3>
          {generatedFiles.slice(0, 3).map((file) => (
            <div key={file.path}>
              <h4 className="text-lg font-semibold mb-2">{file.path}</h4>
              <CodePane code={file.content} readonly height="300px" />
            </div>
          ))}
          {generatedFiles.length > 3 && (
            <p className="text-center text-gray-600 text-sm">
              + {generatedFiles.length - 3} more files
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
