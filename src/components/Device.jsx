import React from 'react';
import PropTypes from 'prop-types';

const COLOR_CLASSES = {
  indigo: {
    border: 'border-indigo-500',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    dot: 'bg-indigo-500',
    ring: 'ring-indigo-200',
  },
  emerald: {
    border: 'border-emerald-500',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
    ring: 'ring-emerald-200',
  },
  blue: {
    border: 'border-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
    ring: 'ring-blue-200',
  },
  rose: {
    border: 'border-rose-500',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    dot: 'bg-rose-500',
    ring: 'ring-rose-200',
  },
  cyan: {
    border: 'border-cyan-500',
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    dot: 'bg-cyan-500',
    ring: 'ring-cyan-200',
  },
  violet: {
    border: 'border-violet-500',
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    dot: 'bg-violet-500',
    ring: 'ring-violet-200',
  },
  sky: {
    border: 'border-sky-500',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    dot: 'bg-sky-500',
    ring: 'ring-sky-200',
  },
  amber: {
    border: 'border-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
    ring: 'ring-amber-200',
  },
  slate: {
    border: 'border-slate-400',
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    dot: 'bg-slate-500',
    ring: 'ring-slate-200',
  },
};

const DEFAULT_COLOR = COLOR_CLASSES.indigo;

const Device = ({
  icon: Icon,
  name,
  role,
  ip,
  color = 'indigo',
  details = [],
  badge,
  vmId,
}) => {
  const c = COLOR_CLASSES[color] ?? DEFAULT_COLOR;

  return (
    <div
      className={`bg-white border-l-4 ${c.border} rounded-lg shadow-sm hover:shadow-md p-3 flex flex-col gap-2 transition-all hover:-translate-y-0.5`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 ${c.bg} rounded-lg ${c.text} shrink-0`}>
          <Icon size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-slate-800 text-sm leading-tight">{name}</h4>
            {vmId && (
              <span className="text-[9px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                VM {vmId}
              </span>
            )}
            {badge && (
              <span
                className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${c.bg} ${c.text}`}
              >
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-mono mt-0.5 break-all">{ip}</p>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">
            {role}
          </p>
        </div>
      </div>
      {details.length > 0 && (
        <ul className="border-t border-slate-100 pt-2 space-y-1 pl-1">
          {details.map((detail) => (
            <li
              key={detail}
              className="text-[11px] text-slate-600 flex items-start gap-1.5 leading-snug"
            >
              <div className={`w-1 h-1 rounded-full ${c.dot} mt-1.5 shrink-0`} />
              <span>{detail}</span>
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
  badge: PropTypes.string,
  vmId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Device;
