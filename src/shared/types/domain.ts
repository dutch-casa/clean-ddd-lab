export type Primitive = 'string' | 'int' | 'decimal' | 'Guid' | 'DateTime' | 'bool';

export type VOField = {
  name: string;
  type: Primitive;
};

export type ValueObject = {
  id: string;
  name: string;
  fields: VOField[];
};

export type EntityField =
  | { kind: 'primitive'; name: string; type: Primitive }
  | { kind: 'vo'; name: string; voId: string };

export type Entity = {
  id: string;
  name: string;
  idType: Primitive;
  fields: EntityField[];
};

export type Aggregate = {
  id: string;
  name: string;
  rootEntityId: string;
  entityIds: string[];
  invariants: string[];
};

export type RepositoryMethod = {
  name: string;
  signature: string;
};

export type Repository = {
  id: string;
  name: string;
  methods: RepositoryMethod[];
};

export type UseCaseIO = {
  name: string;
  fields: { name: string; type: Primitive }[];
};

export type UseCase = {
  id: string;
  name: string;
  input: UseCaseIO;
  output: UseCaseIO;
  repoIds: string[];
  reads: string[];
  writes: string[];
};

export type DomainGraph = {
  valueObjects: ValueObject[];
  entities: Entity[];
  aggregates: Aggregate[];
  repositories: Repository[];
  useCases: UseCase[];
  meta: {
    name: string;
    version: number;
  };
};

// React Flow node data types
export type NodeType = 'valueObject' | 'entity' | 'aggregate' | 'repository' | 'useCase';

export type EdgeType = 'has-field' | 'aggregates' | 'uses-repo' | 'reads' | 'writes';

export type ValidationError = {
  nodeId: string;
  message: string;
  severity: 'error' | 'warning';
};

// Test types
export type TestResult = {
  name: string;
  passed: boolean;
  message?: string;
};

export type TestReport = {
  passed: number;
  failed: number;
  details: TestResult[];
};
