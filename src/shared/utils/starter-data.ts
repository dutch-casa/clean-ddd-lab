import type { DomainGraph } from '@/shared/types';

export const starterGraph: DomainGraph = {
  valueObjects: [
    {
      id: 'vo-1',
      name: 'Money',
      fields: [
        { name: 'Amount', type: 'decimal' },
        { name: 'Currency', type: 'string' },
      ],
    },
  ],
  entities: [
    {
      id: 'entity-1',
      name: 'Ride',
      idType: 'Guid',
      fields: [
        { kind: 'primitive', name: 'PassengerId', type: 'Guid' },
        { kind: 'primitive', name: 'DriverId', type: 'Guid' },
        { kind: 'primitive', name: 'Pickup', type: 'string' },
        { kind: 'primitive', name: 'Dropoff', type: 'string' },
        { kind: 'primitive', name: 'Status', type: 'string' },
      ],
    },
  ],
  aggregates: [
    {
      id: 'agg-1',
      name: 'RideAggregate',
      rootEntityId: 'entity-1',
      entityIds: ['entity-1'],
      invariants: ['Cannot complete ride without driver assigned'],
    },
  ],
  repositories: [
    {
      id: 'repo-1',
      name: 'IRideRepository',
      methods: [
        { name: 'Save', signature: 'Task Save(Ride ride)' },
        { name: 'Get', signature: 'Task<Ride?> Get(Guid id)' },
      ],
    },
  ],
  useCases: [
    {
      id: 'uc-1',
      name: 'RequestRideUseCase',
      input: {
        name: 'Request',
        fields: [{ name: 'PassengerId', type: 'Guid' }],
      },
      output: {
        name: 'Response',
        fields: [{ name: 'RideId', type: 'Guid' }],
      },
      repoIds: ['repo-1'],
      reads: [],
      writes: ['entity-1'],
    },
  ],
  meta: {
    name: 'Ride Sharing Domain',
    version: 1,
  },
};
