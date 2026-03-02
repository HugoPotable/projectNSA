import React from 'react';
import PropTypes from 'prop-types';

const COLOR_CLASSES = {
  indigo: {
    border: 'border-indigo-500',
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    dot: 'bg-indigo-400',
  },
  emerald: {
    border: 'border-emerald-500',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    dot: 'bg-emerald-400',
  },
  blue: {
    border: 'border-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    dot: 'bg-blue-400',
  },
  rose: {
    border: 'border-rose-500',
    bg: 'bg-rose-50',
    text: 'text-rose-600',
    dot: 'bg-rose-400',
  },
  cyan: {
    border: 'border-cyan-500',
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    dot: 'bg-cyan-400',
  },
  violet: {
    border: 'border-violet-500',
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    dot: 'bg-violet-400',
  },
  sky: {
    border: 'border-sky-500',
    bg: 'bg-sky-50',
    text: 'text-sky-600',
    dot: 'bg-sky-400',
  },
  amber: {
    border: 'border-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    dot: 'bg-amber-400',
  },
};

const DEFAULT_COLOR = COLOR_CLASSES.indigo;

const Device = ({ icon: Icon, name, role, ip, color = 'indigo', details = [] }) => {
  const c = COLOR_CLASSES[color] ?? DEFAULT_COLOR;

  return (
    <div className={`bg-white border-l-4 ${c.border} rounded-lg shadow-sm p-4 flex flex-col gap-2 transition-transform hover:scale-105`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 ${c.bg} rounded-lg ${c.text}`}>
          <Icon size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">{name}</h4>
          <p className="text-xs text-gray-500 font-mono">{ip}</p>
        </div>
      </div>
      <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
        {role}
      </div>
      {details.length > 0 && (
        <ul className="mt-1 border-t pt-2 space-y-1">
          {details.map((detail) => (
            <li key={detail} className="text-[10px] text-gray-600 flex items-center gap-1">
              <div className={`w-1 h-1 rounded-full ${c.dot}`} />
              {detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Device.propTypes = {
  icon: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  ip: PropTypes.string.isRequired,
  color: PropTypes.string,
  details: PropTypes.arrayOf(PropTypes.string),
};

export default Device;
