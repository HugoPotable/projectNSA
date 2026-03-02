import React from 'react';
import PropTypes from 'prop-types';

const COLOR_CLASSES = {
  indigo: 'border-indigo-100 text-indigo-700 bg-indigo-50',
  emerald: 'border-emerald-100 text-emerald-700 bg-emerald-50',
  blue: 'border-blue-100 text-blue-700 bg-blue-50',
  rose: 'border-rose-100 text-rose-700 bg-rose-50',
  cyan: 'border-cyan-100 text-cyan-700 bg-cyan-50',
  violet: 'border-violet-100 text-violet-700 bg-violet-50',
  amber: 'border-amber-100 text-amber-700 bg-amber-50',
};

const VlanHeader = ({ name, subnet, color = 'indigo' }) => {
  const classes = COLOR_CLASSES[color] ?? COLOR_CLASSES.indigo;
  return (
    <div className={`mb-3 flex items-center justify-between border-b pb-1 ${classes}`}>
      <span className={`text-xs font-bold px-2 py-0.5 rounded ${classes}`}>{name}</span>
      <span className="text-[10px] font-mono text-gray-400">{subnet}</span>
    </div>
  );
};

VlanHeader.propTypes = {
  name: PropTypes.string.isRequired,
  subnet: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default VlanHeader;
