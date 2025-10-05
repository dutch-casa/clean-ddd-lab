import { Handle, Position, type NodeProps } from 'reactflow';
import type { Repository } from '@/shared/types';
import { motion } from 'framer-motion';

export type RepositoryNodeData = Repository & {
  errors?: string[];
};

export function RepositoryNode({ data, selected }: NodeProps<RepositoryNodeData>) {
  return (
    <motion.div
      className={`rounded-xl shadow-lg p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-2 ${
        selected ? 'border-orange-500' : 'border-orange-300'
      } min-w-[260px]`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />

      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-orange-500" />
        <div className="font-semibold text-gray-800 text-sm">Repository (Port)</div>
      </div>

      <div className="text-lg font-bold text-gray-900 mb-3">{data.name}</div>

      {data.methods.length > 0 && (
        <div className="space-y-2">
          {data.methods.slice(0, 3).map((method, i) => (
            <div key={i} className="text-xs font-mono text-gray-700 bg-white p-2 rounded">
              {method.signature}
            </div>
          ))}
          {data.methods.length > 3 && (
            <div className="text-xs text-gray-500">
              +{data.methods.length - 3} more methods
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
