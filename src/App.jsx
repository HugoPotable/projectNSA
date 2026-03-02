import {
  Globe,
  ShieldCheck,
  Server,
  Layout,
  Database,
  Lock,
  Cloud,
  Network,
  ArrowLeftRight,
  Monitor,
  Settings,
} from 'lucide-react';

import Device from './components/Device';
import VlanHeader from './components/VlanHeader';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center justify-center gap-3">
            <Network className="text-indigo-600" />
            Infrastructure Réseau Multi-Site
          </h1>
          <p className="text-slate-500 mt-2">
            Interconnexion Proxmox On-Premise & Cloud via OpenVPN
          </p>
        </header>

        {/* Internet & External Access */}
        <div className="flex justify-center mb-12 relative">
          <div className="bg-white px-6 py-4 rounded-2xl shadow-md border-2 border-dashed border-indigo-200 flex flex-col items-center z-10">
            <Globe className="text-indigo-400 mb-2" size={32} />
            <span className="font-bold text-indigo-900 uppercase tracking-widest text-sm">
              Internet
            </span>
            <div className="mt-2 flex items-center gap-2 text-[10px] bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
              <Lock size={12} />
              Accès restreint au Bastion (Site 2)
            </div>
          </div>
          {/* Connection to S2 Bastion */}
          <div className="absolute top-full h-24 w-px bg-gradient-to-b from-indigo-200 to-transparent left-1/2 -translate-x-1/2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          {/* VPN Tunnel Overlay */}
          <div className="absolute top-20 left-1/4 right-1/4 h-12 border-t-4 border-dashed border-indigo-400 rounded-t-[100px] pointer-events-none flex justify-center items-start">
            <div className="bg-indigo-600 text-white text-[10px] font-bold px-4 py-1 rounded-full -mt-3 shadow-lg flex items-center gap-2">
              <ArrowLeftRight size={12} />
              TUNNEL VPN P2P (OpenVPN) - 10.254.0.0/24
            </div>
          </div>

          {/* SITE 1 */}
          <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-700">
                  SITE 1 : ON-PREMISE
                </h2>
                <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold uppercase tracking-tighter">
                  <Monitor size={14} /> Proxmox Node 1
                </div>
              </div>
              <div className="bg-white px-3 py-1 rounded-lg shadow-sm border border-slate-200 text-[10px] font-mono">
                s1.projet.local
              </div>
            </div>

            {/* S1 pfSense */}
            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-sm">
                <Device
                  icon={ShieldCheck}
                  name="pfSense (S1)"
                  role="Routeur / Firewall / DNS"
                  ip="WAN: Epitech Network"
                  color="indigo"
                  details={["DNS Forwarder vers S2", "Point de terminaison VPN"]}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* VLAN Admin S1 */}
              <div className="space-y-4">
                <VlanHeader name="VLAN Admin" subnet="10.10.10.0/24" color="emerald" />
                <Device
                  icon={Layout}
                  name="NetBox"
                  role="IPAM / DCIM"
                  ip="10.10.10.10"
                  color="emerald"
                />
              </div>

              {/* VLAN Services S1 */}
              <div className="space-y-4">
                <VlanHeader name="VLAN Services" subnet="10.10.20.0/24" color="blue" />
                <Device
                  icon={Database}
                  name="Elasticsearch"
                  role="Logs / Monitoring"
                  ip="10.10.20.10"
                  color="blue"
                />
              </div>
            </div>
          </div>

          {/* SITE 2 */}
          <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-700">
                  SITE 2 : CLOUD
                </h2>
                <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold uppercase tracking-tighter">
                  <Cloud size={14} /> Proxmox Node 2
                </div>
              </div>
              <div className="bg-white px-3 py-1 rounded-lg shadow-sm border border-slate-200 text-[10px] font-mono">
                s2.projet.local
              </div>
            </div>

            {/* S2 pfSense */}
            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-sm">
                <Device
                  icon={ShieldCheck}
                  name="pfSense (S2)"
                  role="Routeur / Firewall / DNS"
                  ip="WAN: Epitech Network"
                  color="indigo"
                  details={["DNS Forwarder vers S1", "KILL SWITCH", "Firewalling DMZ"]}
                />
              </div>
            </div>

            <div className="space-y-6">
              {/* VLAN DMZ / Admin S2 */}
              <div>
                <VlanHeader name="VLAN DMZ" subnet="10.20.30.0/24" color="rose" />
                <div className="grid grid-cols-1 gap-4">
                  <Device
                    icon={Lock}
                    name="Bastion SSH"
                    role="Passerelle d'administration"
                    ip="10.20.30.10"
                    color="rose"
                    details={["Seule entrée publique autorisée"]}
                  />
                </div>
              </div>

              {/* VLAN Interne S2 */}
              <div>
                <VlanHeader name="VLAN Interne" subnet="10.20.20.0/24" color="cyan" />
                <div className="grid grid-cols-1 gap-4">
                  <Device
                    icon={Server}
                    name="Site Web"
                    role="Application Métier"
                    ip="10.20.20.10"
                    color="cyan"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend / Info Footer */}
        <footer className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400">Sécurité</h5>
              <p className="text-xs text-slate-600">VPN P2P chiffré & Kill Switch actif sur le Cloud</p>
            </div>
          </div>
          <div className="flex gap-4 items-center border-x border-slate-100 px-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <Settings size={20} />
            </div>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400">Gestion DNS</h5>
              <p className="text-xs text-slate-600">Résolution croisée entre s1.projet et s2.projet</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
              <Network size={20} />
            </div>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400">Architecture</h5>
              <p className="text-xs text-slate-600">Segmentation par VLANs isolés sur Proxmox</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
