import React from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, ArrowLeftRight, Power } from 'lucide-react';

const STYLES = {
  inbound: {
    label: 'Inbound from Internet',
    line: 'bg-amber-500',
    text: 'text-amber-700',
    icon: ArrowRight,
  },
  vpn: {
    label: 'Site-to-site VPN',
    line: 'bg-indigo-500',
    text: 'text-indigo-700',
    icon: ArrowLeftRight,
  },
  jump: {
    label: 'Bastion → internal SSH',
    line: 'bg-rose-500',
    text: 'text-rose-700',
    icon: ArrowRight,
  },
  logs: {
    label: 'Logs to Elasticsearch',
    line: 'bg-blue-500',
    text: 'text-blue-700',
    icon: ArrowRight,
  },
  killswitch: {
    label: 'Kill switch (toggle)',
    line: 'bg-red-500',
    text: 'text-red-700',
    icon: Power,
  },
};

const FlowLegend = ({ items }) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
    {items.map((key) => {
      const s = STYLES[key];
      if (!s) return null;
      const Icon = s.icon;
      return (
        <div
          key={key}
          className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2"
        >
          <div className={`h-1.5 w-6 rounded-full ${s.line}`} />
          <Icon size={14} className={s.text} />
          <span className="text-[11px] font-medium text-slate-700">{s.label}</span>
        </div>
      );
    })}
  </div>
);

FlowLegend.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(STYLES))).isRequired,
};

export default FlowLegend;
