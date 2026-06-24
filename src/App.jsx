import {
  Globe,
  Server,
  Layout,
  Database,
  Lock,
  Network,
  Shield,
  Power,
  Key,
  Github,
} from 'lucide-react';

import SiteCard from './components/SiteCard';
import FlowLegend from './components/FlowLegend';

const App = () => {
  return (
    <div
      className="min-h-screen text-slate-900 font-sans"
      style={{
        background:
          'radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.06) 1px, transparent 0) 0 0 / 22px 22px, linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600">
              <Network size={14} />
              CIA — Cloud Infrastructure Architects
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-2 leading-tight">
              Hybrid Infrastructure with Proxmox
            </h1>
            <p className="text-slate-500 mt-2 max-w-2xl">
              Two Proxmox sites — on-premise &amp; remote — joined by an encrypted
              site-to-site OpenVPN tunnel. Per-VLAN segmentation, single bastion entry,
              centralised observability.
            </p>
          </div>
          <a
            href="https://github.com/EpitechMscProPromo2027/T-NSA-810-NCY_7"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-700 text-slate-600 rounded-lg px-3 py-2 transition-colors shadow-sm"
          >
            <Github size={14} />
            Source &amp; documentation
          </a>
        </header>

        {/* Top-level facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <FactCard label="Sites" value="2 + 1 reserved" hint="S1 on-prem, S2 cloud, S3 ready" />
          <FactCard label="VMs / site" value="3 max" hint="Hard project constraint" />
          <FactCard label="VLANs" value="Admin / Services / DMZ" hint="Default-deny per zone" />
          <FactCard label="Tunnel" value="OpenVPN P2P SSL/TLS" hint="AES-256-GCM · UDP/1194" />
        </div>

        {/* Internet bubble */}
        <div className="flex flex-col items-center mb-2">
          <div className="bg-white px-5 py-3 rounded-full shadow-md border border-amber-200 flex items-center gap-3">
            <div className="bg-amber-100 text-amber-600 p-2 rounded-full">
              <Globe size={18} />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-widest font-bold text-amber-700">
                Internet
              </div>
              <div className="text-[11px] text-slate-500">
                Only TCP/22 → bastion (Site 2). Everything else: deny.
              </div>
            </div>
          </div>
          <ArrowDown label="SSH (TCP/22)" color="amber" />
        </div>

        {/* The two sites with the VPN bridge between them */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* VPN bridge — visible only on lg */}
          <VpnBridge />

          <SiteCard
            kind="onprem"
            title="Site 1 — On-Premise"
            subtitle="Proxmox node 1 · VMID 119 / 2033 / 3033"
            fqdn="s1.epitech.local"
            lan="192.168.1.0/24"
            pfsense={{
              name: 'pfSense-s1',
              role: 'Router · Firewall · DNS · OpenVPN server',
              ip: 'WAN 5.196.45.3 · gateway .1 per VLAN · tunnel 10.0.0.1',
              vmId: 119,
              badge: 'OpenVPN server',
              details: [
                'Default-deny on every interface',
                'DNS forwarder → s2.epitech.local',
                'Kill switch = toggle rule S1-WAN-01',
              ],
            }}
            vlans={[
              {
                name: 'Admin',
                subnet: '10.10.10.0/24',
                tag: 'VLAN 10',
                color: 'emerald',
                hint: 'Management plane — IPAM, secrets, observability',
                devices: [
                  {
                    icon: Layout,
                    name: 'NetBox',
                    role: 'IPAM · DCIM · API source of truth',
                    ip: '10.10.10.10:8000',
                    vmId: 2033,
                    details: ['REST API for automation', 'Source of truth before pfSense'],
                  },
                  {
                    icon: Database,
                    name: 'Vault + Elasticsearch + Grafana',
                    role: 'Secrets store + observability (co-located on one VM)',
                    ip: '10.10.10.11',
                    vmId: 3033,
                    badge: 'secrets + logs',
                    details: [
                      'Vault :8200 (KV v2 · unseal 3/5)',
                      'Elasticsearch :9200 + Grafana :3000 (Docker)',
                      'rsyslog from both sites → ES',
                    ],
                  },
                ],
              },
              {
                name: 'Services',
                subnet: '10.10.20.0/24',
                tag: 'VLAN 20',
                color: 'blue',
                hint: 'Internal services (reserved — no host yet on S1)',
                devices: [],
              },
              {
                name: 'DMZ',
                subnet: '10.10.30.0/24',
                tag: 'VLAN 30',
                color: 'rose',
                hint: 'Reserved (no public host on Site 1)',
                devices: [],
              },
            ]}
            footer="Admin VLAN = NetBox + the Vault VM · that VM also runs ES + Grafana (logs land here)"
          />

          <SiteCard
            kind="cloud"
            title="Site 2 — Remote / Cloud"
            subtitle="Proxmox node 2 · VMID 144 / 176 / 2033"
            fqdn="s2.epitech.local"
            lan="192.168.2.0/24"
            pfsense={{
              name: 'pfSense-s2',
              role: 'Router · Firewall · DNS · OpenVPN client',
              ip: 'WAN 46.105.32.232 · gateway .1 per VLAN · tunnel 10.0.0.2',
              vmId: 144,
              badge: 'OpenVPN client',
              details: [
                'Default-deny on every interface',
                'DNS forwarder → s1.epitech.local',
                'Inbound NAT: TCP/22 → bastion only',
              ],
            }}
            vlans={[
              {
                name: 'Admin',
                subnet: '10.20.10.0/24',
                tag: 'VLAN 10',
                color: 'emerald',
                hint: 'Privileged segment — reachable via VPN from S1 admin',
                devices: [],
              },
              {
                name: 'Services',
                subnet: '10.20.20.0/24',
                tag: 'VLAN 20',
                color: 'blue',
                hint: 'Internal services',
                devices: [
                  {
                    icon: Server,
                    name: 'webserver-s2',
                    role: 'Nginx · internal-only site',
                    ip: '10.20.20.10:80',
                    vmId: 176,
                    details: [
                      'VM running (VMID 176) · internal-only',
                      'Not exposed to the Internet (no inbound NAT)',
                    ],
                  },
                ],
              },
              {
                name: 'DMZ',
                subnet: '10.20.30.0/24',
                tag: 'VLAN 30',
                color: 'rose',
                hint: 'Single Internet-facing host',
                devices: [
                  {
                    icon: Lock,
                    name: 'bastion-s2',
                    role: 'Hardened SSH jump host',
                    ip: '10.20.30.10:22',
                    vmId: 2033,
                    badge: 'public',
                    details: [
                      'SSH key-only · login user bastion-gr33',
                      'SSH keys stored in Vault (KeysBastion×4)',
                      'auth.log → Elasticsearch (S1) via rsyslog (configured)',
                      'ProxyJump-only into Admin/Services',
                    ],
                  },
                ],
              },
            ]}
            footer="Only door from the Internet · Bastion is the funnel"
          />
        </div>

        {/* Flow legend */}
        <section className="mt-12">
          <SectionTitle
            title="What talks to what"
            subtitle="Five flow types — every other path is denied by default"
          />
          <FlowLegend items={['inbound', 'vpn', 'jump', 'logs', 'killswitch']} />
        </section>

        {/* Security pillars */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <PillarCard
            icon={Shield}
            title="Default deny everywhere"
            text="Each pfSense interface starts with a deny-all baseline. Every allow rule has a stable ID (e.g. S1-VPN-03) that ends up in Elasticsearch — auditable."
          />
          <PillarCard
            icon={Power}
            title="Reversible kill switch"
            text="One WAN rule we can toggle to drop the tunnel without losing admin access. LAN and Admin VLAN keep working — recovery stays one click away."
          />
          <PillarCard
            icon={Key}
            title="Single Internet entry"
            text="Only the bastion is reachable from outside (TCP/22). Internal SSH is reached via ProxyJump. Every login event ships to Elasticsearch."
          />
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div>
            Epitech · NSA-810-NCY-7 · Hugo Spriet · Julien Niederer · Hugo Bernier · Anne-Charlotte
            Gipson
          </div>
          <div className="font-mono">
            Tunnel 10.0.0.1/30 ↔ 10.0.0.2/30 · s2s 10.100.0.0/24 · admin VPN 10.200.0.0/24 · S3 reserved 10.30.10/20/30.0/24
          </div>
        </footer>
      </div>
    </div>
  );
};

const FactCard = ({ label, value, hint }) => (
  <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
    <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
      {label}
    </div>
    <div className="text-sm font-bold text-slate-800 mt-1">{value}</div>
    <div className="text-[11px] text-slate-500 mt-0.5">{hint}</div>
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-4">
    <h3 className="text-lg font-bold text-slate-800">{title}</h3>
    <p className="text-xs text-slate-500">{subtitle}</p>
  </div>
);

const PillarCard = ({ icon: Icon, title, text }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
      <Icon size={20} />
    </div>
    <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
    <p className="text-xs text-slate-600 leading-relaxed mt-1">{text}</p>
  </div>
);

const ArrowDown = ({ label, color = 'indigo' }) => {
  const colors = {
    indigo: 'border-indigo-300 text-indigo-700 bg-indigo-50',
    amber: 'border-amber-300 text-amber-700 bg-amber-50',
  };
  return (
    <div className="flex flex-col items-center my-3">
      <div className={`text-[10px] font-bold uppercase tracking-widest border ${colors[color]} px-2 py-0.5 rounded-full`}>
        {label}
      </div>
      <div className="w-px h-6 bg-slate-300 mt-1" />
    </div>
  );
};

const VpnBridge = () => (
  <div
    className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center gap-2 pointer-events-none"
    aria-hidden
  >
    <div className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 pointer-events-auto">
      <span className="text-[10px] font-bold uppercase tracking-widest">VPN tunnel</span>
      <span className="text-[10px] font-mono opacity-80">AES-256-GCM</span>
      <span className="text-[10px] font-mono bg-white/15 px-2 py-0.5 rounded-full">
        10.0.0.0/30
      </span>
    </div>
  </div>
);

export default App;
