import React from 'react';
import PropTypes from 'prop-types';
import { Cloud, Building2, ShieldCheck } from 'lucide-react';

import Device from './Device';
import VlanHeader from './VlanHeader';

const ICONS = {
  onprem: Building2,
  cloud: Cloud,
};

const SiteCard = ({ kind, title, subtitle, fqdn, lan, pfsense, vlans, footer }) => {
  const SiteIcon = ICONS[kind] ?? Building2;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-600">
            <SiteIcon size={14} />
            {subtitle}
          </div>
          <h2 className="text-lg font-black text-slate-800 mt-0.5">{title}</h2>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">{fqdn}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[9px] uppercase tracking-wider font-bold text-slate-400">LAN mgmt</div>
          <div className="text-[11px] font-mono text-slate-600 mt-0.5">{lan}</div>
        </div>
      </div>

      {/* pfSense gateway */}
      <div className="px-6 pt-5 pb-4 bg-indigo-50/40 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-widest font-bold text-indigo-700">
          <ShieldCheck size={12} />
          Gateway / Firewall
        </div>
        <Device
          icon={ShieldCheck}
          name={pfsense.name}
          role={pfsense.role}
          ip={pfsense.ip}
          color="indigo"
          vmId={pfsense.vmId}
          badge={pfsense.badge}
          details={pfsense.details}
        />
      </div>

      {/* VLAN swim lanes */}
      <div className="px-6 py-4 flex flex-col gap-4 flex-1">
        {vlans.map((v) => (
          <div key={v.name}>
            <VlanHeader
              name={v.name}
              subnet={v.subnet}
              color={v.color}
              tag={v.tag}
              hint={v.hint}
            />
            <div className="grid grid-cols-1 gap-2">
              {v.devices.length === 0 ? (
                <div className="text-[11px] italic text-slate-400 border border-dashed border-slate-200 rounded-md py-2 px-3 bg-slate-50">
                  Reserved — no host yet
                </div>
              ) : (
                v.devices.map((d) => (
                  <Device key={d.name} {...d} color={d.color ?? v.color} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {footer && (
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-[10px] font-mono text-slate-500">
          {footer}
        </div>
      )}
    </div>
  );
};

SiteCard.propTypes = {
  kind: PropTypes.oneOf(['onprem', 'cloud']).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  fqdn: PropTypes.string.isRequired,
  lan: PropTypes.string.isRequired,
  pfsense: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    ip: PropTypes.string.isRequired,
    vmId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    badge: PropTypes.string,
    details: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  vlans: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      subnet: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      tag: PropTypes.string,
      hint: PropTypes.string,
      devices: PropTypes.array.isRequired,
    })
  ).isRequired,
  footer: PropTypes.string,
};

export default SiteCard;
