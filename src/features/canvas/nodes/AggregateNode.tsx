import { Handle, Position, type NodeProps } from 'reactflow';
import type { Aggregate } from '@/shared/types';
import { motion } from 'framer-motion';

export type AggregateNodeData = Aggregate & {
  errors?: string[];
  rootName?: string;
};

export function AggregateNode({ data, selected }: NodeProps<AggregateNodeData>) {
  return (
    <motion.div
      className={`rounded-xl shadow-lg p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-2 ${
        selected ? 'border-purple-500' : 'border-purple-300'
      } min-w-[240px]`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />

      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-purple-500" />
        <div className="font-semibold text-gray-800 text-sm">Aggregate</div>
      </div>

      <div className="text-lg font-bold text-gray-900 mb-2">{data.name}</div>

      <div className="text-xs text-gray-600 mb-2">
        <span className="font-semibold">Root:</span> {data.rootName || 'Not set'}
      </div>

      {data.invariants.length > 0 && (
        <div className="mt-3 space-y-1">
          <div className="text-xs font-semibold text-gray-700">Invariants:</div>
          {data.invariants.slice(0, 2).map((inv, i) => (
            <div key={i} className="text-xs text-gray-600 italic">
              • {inv.length > 40 ? inv.substring(0, 40) + '...' : inv}
            </div>
          ))}
          {data.invariants.length > 2 && (
            <div className="text-xs text-gray-500">
              +{data.invariants.length - 2} more
            </div>
          )}
        </div>
      )}

      {data.errors && data.errors.length > 0 && (
        <div className="mt-2 text-xs text-red-600">
          ⚠ {data.errors[0]}
        </div>
      )}

      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </motion.div>
  );
}
