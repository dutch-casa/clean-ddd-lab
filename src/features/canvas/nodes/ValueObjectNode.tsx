import { Handle, Position, type NodeProps } from 'reactflow';
import type { ValueObject } from '@/shared/types';
import { motion } from 'framer-motion';

export type ValueObjectNodeData = ValueObject & {
  errors?: string[];
};

export function ValueObjectNode({ data, selected }: NodeProps<ValueObjectNodeData>) {
  return (
    <motion.div
      className={`rounded-xl shadow-lg p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 ${
        selected ? 'border-blue-500' : 'border-blue-300'
      } min-w-[200px]`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />

      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-blue-500" />
        <div className="font-semibold text-gray-800 text-sm">Value Object</div>
      </div>

      <div className="text-lg font-bold text-gray-900 mb-2">{data.name}</div>

      <div className="space-y-1">
        {data.fields.map((field, i) => (
          <div key={i} className="text-xs text-gray-700 font-mono">
            {field.name}: <span className="text-blue-600">{field.type}</span>
          </div>
        ))}
      </div>

      {data.errors && data.errors.length > 0 && (
        <div className="mt-2 text-xs text-red-600">
          ⚠ {data.errors[0]}
        </div>
      )}

      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </motion.div>
  );
}
