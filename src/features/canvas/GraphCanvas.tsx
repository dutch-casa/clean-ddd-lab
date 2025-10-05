import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type NodeTypes,
  type Connection,
  type Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import {
  ValueObjectNode,
  EntityNode,
  AggregateNode,
  RepositoryNode,
  UseCaseNode,
} from './nodes';
import { useGraphStore } from './store';
import { graphToReactFlow } from './graphToNodes';

const nodeTypes: NodeTypes = {
  valueObject: ValueObjectNode,
  entity: EntityNode,
  aggregate: AggregateNode,
  repository: RepositoryNode,
  useCase: UseCaseNode,
};

export function GraphCanvas() {
  const { graph } = useGraphStore();

  // Convert graph to React Flow nodes/edges
  const { nodes: initialNodes, edges: initialEdges } = graphToReactFlow(graph);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when graph changes
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = graphToReactFlow(graph);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [graph, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const newEdges = addEdge(params, edges);
      setEdges(newEdges);
    },
    [edges, setEdges]
  );

  return (
    <div className="w-full h-[600px] bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-300">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case 'valueObject':
                return '#bae6fd';
              case 'entity':
                return '#bbf7d0';
              case 'aggregate':
                return '#e9d5ff';
              case 'repository':
                return '#fed7aa';
              case 'useCase':
                return '#fbcfe8';
              default:
                return '#e5e7eb';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
}
