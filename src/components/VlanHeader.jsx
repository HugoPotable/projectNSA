import React from 'react';
import PropTypes from 'prop-types';

const COLOR_CLASSES = {
  indigo: {
    bar: 'bg-indigo-500',
    pill: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  },
  emerald: {
    bar: 'bg-emerald-500',
    pill: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  blue: {
    bar: 'bg-blue-500',
    pill: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  rose: {
    bar: 'bg-rose-500',
    pill: 'bg-rose-100 text-rose-700 border-rose-200',
  },
  cyan: {
    bar: 'bg-cyan-500',
    pill: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  },
  violet: {
    bar: 'bg-violet-500',
    pill: 'bg-violet-100 text-violet-700 border-violet-200',
  },
  amber: {
    bar: 'bg-amber-500',
    pill: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  slate: {
    bar: 'bg-slate-400',
    pill: 'bg-slate-100 text-slate-600 border-slate-200',
  },
};

const VlanHeader = ({ name, subnet, color = 'indigo', tag, hint }) => {
  const c = COLOR_CLASSES[color] ?? COLOR_CLASSES.indigo;

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className={`h-5 w-1 rounded-full ${c.bar}`} />
      <div className="flex items-center gap-2 flex-wrap">
        {tag && (
          <span className="text-[9px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
            {tag}
          </span>
        )}
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${c.pill}`}
        >
          {name}
        </span>
        <span className="text-[10px] font-mono text-slate-400">{subnet}</span>
        {hint && (
          <span className="text-[10px] text-slate-400 italic hidden md:inline">
            — {hint}
          </span>
        )}
      </div>
    </div>
  );
};

VlanHeader.propTypes = {
  name: PropTypes.string.isRequired,
  subnet: PropTypes.string.isRequired,
  color: PropTypes.string,
  tag: PropTypes.string,
  hint: PropTypes.string,
};

export default VlanHeader;
