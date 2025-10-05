import type { Node, Edge } from 'reactflow';
import type { DomainGraph } from '@/shared/types';

// Auto-layout helper - simple grid layout
function calculatePosition(index: number, type: string): { x: number; y: number } {
  const typeOffsets: Record<string, number> = {
    valueObject: 0,
    entity: 1,
    aggregate: 2,
    repository: 3,
    useCase: 4,
  };

  const column = typeOffsets[type] || 0;
  const row = index;

  return {
    x: 50 + column * 350,
    y: 50 + row * 200,
  };
}

export function graphToReactFlow(graph: DomainGraph): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Create VO name map for entities
  const voMap = new Map(graph.valueObjects.map((vo) => [vo.id, vo.name]));
  const entityMap = new Map(graph.entities.map((e) => [e.id, e.name]));

  // Value Objects
  graph.valueObjects.forEach((vo, index) => {
    nodes.push({
      id: vo.id,
      type: 'valueObject',
      position: calculatePosition(index, 'valueObject'),
      data: vo,
    });
  });

  // Entities
  graph.entities.forEach((entity, index) => {
    const voNames: Record<string, string> = {};
    entity.fields.forEach((field) => {
      if (field.kind === 'vo') {
        const voName = voMap.get(field.voId);
        if (voName) voNames[field.voId] = voName;
      }
    });

    nodes.push({
      id: entity.id,
      type: 'entity',
      position: calculatePosition(index, 'entity'),
      data: { ...entity, voNames },
    });

    // Create edges for VO relationships
    entity.fields.forEach((field) => {
      if (field.kind === 'vo') {
        edges.push({
          id: `${entity.id}-${field.voId}`,
          source: field.voId,
          target: entity.id,
          type: 'default',
          animated: false,
          label: 'has-field',
        });
      }
    });
  });

  // Aggregates
  graph.aggregates.forEach((agg, index) => {
    const rootName = entityMap.get(agg.rootEntityId);
    nodes.push({
      id: agg.id,
      type: 'aggregate',
      position: calculatePosition(index, 'aggregate'),
      data: { ...agg, rootName },
    });

    // Create edges for aggregate relationships
    if (agg.rootEntityId) {
      edges.push({
        id: `${agg.id}-${agg.rootEntityId}`,
        source: agg.rootEntityId,
        target: agg.id,
        type: 'default',
        animated: true,
        label: 'root',
        style: { stroke: '#9333ea', strokeWidth: 2 },
      });
    }
  });

  // Repositories
  graph.repositories.forEach((repo, index) => {
    nodes.push({
      id: repo.id,
      type: 'repository',
      position: calculatePosition(index, 'repository'),
      data: repo,
    });
  });

  // Use Cases
  graph.useCases.forEach((uc, index) => {
    nodes.push({
      id: uc.id,
      type: 'useCase',
      position: calculatePosition(index, 'useCase'),
      data: uc,
    });

    // Create edges for repository dependencies
    uc.repoIds.forEach((repoId) => {
      edges.push({
        id: `${uc.id}-${repoId}`,
        source: repoId,
        target: uc.id,
        type: 'default',
        animated: false,
        label: 'uses',
        style: { stroke: '#ec4899' },
      });
    });

    // Create edges for writes
    uc.writes.forEach((targetId) => {
      edges.push({
        id: `${uc.id}-writes-${targetId}`,
        source: uc.id,
        target: targetId,
        type: 'default',
        animated: true,
        label: 'writes',
        style: { stroke: '#ef4444', strokeDasharray: '5,5' },
      });
    });
  });

  return { nodes, edges };
}
