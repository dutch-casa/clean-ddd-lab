import { create } from 'zustand';
import type { Node, Edge } from 'reactflow';
import type {
  DomainGraph,
  ValueObject,
  Entity,
  Aggregate,
  Repository,
  UseCase,
  ValidationError,
} from '@/shared/types';

type GraphStore = {
  graph: DomainGraph;
  nodes: Node[];
  edges: Edge[];
  errors: ValidationError[];

  // Value Objects
  addValueObject: (vo: Omit<ValueObject, 'id'>) => void;
  updateValueObject: (id: string, vo: Partial<ValueObject>) => void;
  deleteValueObject: (id: string) => void;

  // Entities
  addEntity: (entity: Omit<Entity, 'id'>) => void;
  updateEntity: (id: string, entity: Partial<Entity>) => void;
  deleteEntity: (id: string) => void;

  // Aggregates
  addAggregate: (aggregate: Omit<Aggregate, 'id'>) => void;
  updateAggregate: (id: string, aggregate: Partial<Aggregate>) => void;
  deleteAggregate: (id: string) => void;

  // Repositories
  addRepository: (repo: Omit<Repository, 'id'>) => void;
  updateRepository: (id: string, repo: Partial<Repository>) => void;
  deleteRepository: (id: string) => void;

  // Use Cases
  addUseCase: (useCase: Omit<UseCase, 'id'>) => void;
  updateUseCase: (id: string, useCase: Partial<UseCase>) => void;
  deleteUseCase: (id: string) => void;

  // React Flow
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;

  // Validation
  setErrors: (errors: ValidationError[]) => void;

  // Project
  loadGraph: (graph: DomainGraph) => void;
  resetGraph: () => void;
};

const initialGraph: DomainGraph = {
  valueObjects: [],
  entities: [],
  aggregates: [],
  repositories: [],
  useCases: [],
  meta: {
    name: 'Untitled Project',
    version: 1,
  },
};

let idCounter = 1;
const generateId = () => `node-${idCounter++}`;

export const useGraphStore = create<GraphStore>((set) => ({
  graph: initialGraph,
  nodes: [],
  edges: [],
  errors: [],

  addValueObject: (vo) =>
    set((state) => ({
      graph: {
        ...state.graph,
        valueObjects: [...state.graph.valueObjects, { ...vo, id: generateId() }],
      },
    })),

  updateValueObject: (id, vo) =>
    set((state) => ({
      graph: {
        ...state.graph,
        valueObjects: state.graph.valueObjects.map((v) =>
          v.id === id ? { ...v, ...vo } : v
        ),
      },
    })),

  deleteValueObject: (id) =>
    set((state) => ({
      graph: {
        ...state.graph,
        valueObjects: state.graph.valueObjects.filter((v) => v.id !== id),
      },
    })),

  addEntity: (entity) =>
    set((state) => ({
      graph: {
        ...state.graph,
        entities: [...state.graph.entities, { ...entity, id: generateId() }],
      },
    })),

  updateEntity: (id, entity) =>
    set((state) => ({
      graph: {
        ...state.graph,
        entities: state.graph.entities.map((e) =>
          e.id === id ? { ...e, ...entity } : e
        ),
      },
    })),

  deleteEntity: (id) =>
    set((state) => ({
      graph: {
        ...state.graph,
        entities: state.graph.entities.filter((e) => e.id !== id),
      },
    })),

  addAggregate: (aggregate) =>
    set((state) => ({
      graph: {
        ...state.graph,
        aggregates: [...state.graph.aggregates, { ...aggregate, id: generateId() }],
      },
    })),

  updateAggregate: (id, aggregate) =>
    set((state) => ({
      graph: {
        ...state.graph,
        aggregates: state.graph.aggregates.map((a) =>
          a.id === id ? { ...a, ...aggregate } : a
        ),
      },
    })),

  deleteAggregate: (id) =>
    set((state) => ({
      graph: {
        ...state.graph,
        aggregates: state.graph.aggregates.filter((a) => a.id !== id),
      },
    })),

  addRepository: (repo) =>
    set((state) => ({
      graph: {
        ...state.graph,
        repositories: [...state.graph.repositories, { ...repo, id: generateId() }],
      },
    })),

  updateRepository: (id, repo) =>
    set((state) => ({
      graph: {
        ...state.graph,
        repositories: state.graph.repositories.map((r) =>
          r.id === id ? { ...r, ...repo } : r
        ),
      },
    })),

  deleteRepository: (id) =>
    set((state) => ({
      graph: {
        ...state.graph,
        repositories: state.graph.repositories.filter((r) => r.id !== id),
      },
    })),

  addUseCase: (useCase) =>
    set((state) => ({
      graph: {
        ...state.graph,
        useCases: [...state.graph.useCases, { ...useCase, id: generateId() }],
      },
    })),

  updateUseCase: (id, useCase) =>
    set((state) => ({
      graph: {
        ...state.graph,
        useCases: state.graph.useCases.map((u) =>
          u.id === id ? { ...u, ...useCase } : u
        ),
      },
    })),

  deleteUseCase: (id) =>
    set((state) => ({
      graph: {
        ...state.graph,
        useCases: state.graph.useCases.filter((u) => u.id !== id),
      },
    })),

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setErrors: (errors) => set({ errors }),

  loadGraph: (graph) => set({ graph }),
  resetGraph: () => set({ graph: initialGraph, nodes: [], edges: [], errors: [] }),
}));
