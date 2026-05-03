import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Modal } from './Modal';
import {
  Radio,
  RefreshCcw,
  Cpu,
  Wifi,
  WifiOff,
  Zap,
  AlertTriangle,
  Play,
  Square
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from './utils';

export const MonitoringScreen: React.FC = () => {
  const [nodes, setNodes] = useState([
    { id: 'SN-001', name: 'Coastal Watchtower North', status: 'active', battery: 94, load: 12, lastSync: '2s ago' },
    { id: 'SN-002', name: 'River Basin Sensor Hub', status: 'active', battery: 78, load: 45, lastSync: '5s ago' },
    { id: 'SN-003', name: 'Summit Weather Array', status: 'inactive', battery: 100, load: 0, lastSync: '1h ago' },
    { id: 'SN-004', name: 'Downtown Met-Station', status: 'offline', battery: 2, load: 0, lastSync: '2d ago' },
    { id: 'SN-005', name: 'West Valley Node', status: 'active', battery: 65, load: 18, lastSync: '1s ago' },
  ]);

  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  const toggleNode = (id: string) => {
    setNodes(nodes.map(node => {
      if (node.id === id) {
        return { ...node, status: node.status === 'active' ? 'inactive' : 'active' };
      }
      return node;
    }));
  };

  const handleEmergencyTrigger = () => {
    if (step === 1) {
      setStep(2);
    } else {
      setIsEmergencyModalOpen(false);
      setStep(1);
      alert('GLOBAL EMERGENCY ALERT DISPATCHED. All nodes set to High-Intensity scan mode.');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Sensor Grid Control</h1>
          <p className="text-slate-500 text-sm font-medium">Real-time status monitoring and hardware configuration</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="danger"
            className="gap-2 px-6 shadow-red-600/10"
            onClick={() => setIsEmergencyModalOpen(true)}
          >
            <Zap size={16} fill="currentColor" /> Emergency Trigger
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Network Health Panel */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Radio size={120} />
          </div>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Network Health Index</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">Total Nodes</span>
              <span className="text-lg font-bold font-mono text-slate-900">{nodes.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">Operational</span>
              <span className="text-lg font-bold font-mono text-emerald-600">
                {nodes.filter(n => n.status === 'active').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">Sync Load</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold font-mono text-blue-600">22</span>
                <span className="text-xs text-slate-400">%</span>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100">
              <Button variant="secondary" className="w-full gap-2" size="sm">
                <RefreshCcw size={14} /> Global Resync
              </Button>
            </div>
          </div>
        </Card>

        {/* Node Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {nodes.map((node, idx) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className={cn(
                "p-5 transition-all duration-300 border-l-4 shadow-sm",
                node.status === 'active' ? "border-l-emerald-500 bg-white" :
                node.status === 'inactive' ? "border-l-slate-400 bg-slate-50" :
                "border-l-red-500 bg-red-50"
              )}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg",
                      node.status === 'active' ? "bg-emerald-600 shadow-emerald-600/10" :
                      node.status === 'inactive' ? "bg-slate-500 shadow-slate-600/10" : "bg-red-600 shadow-red-600/10"
                    )}>
                      {node.status === 'active' ? <Wifi size={20} /> : node.status === 'inactive' ? <Cpu size={20} /> : <WifiOff size={20} />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">{node.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{node.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "text-[10px] font-black tracking-tighter uppercase px-2 py-0.5 rounded border inline-block",
                      node.status === 'active' ? "border-emerald-200 text-emerald-600 bg-emerald-50" :
                      node.status === 'inactive' ? "border-slate-200 text-slate-500 bg-slate-100" : "border-red-200 text-red-600 bg-red-50"
                    )}>
                      {node.status}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Battery</p>
                    <div className="flex items-center gap-1">
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full transition-all duration-1000", node.battery > 20 ? 'bg-emerald-500' : 'bg-red-500')}
                          style={{ width: `${node.battery}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-mono text-slate-600 font-bold">{node.battery}%</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 font-bold">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Load</p>
                    <p className="text-[10px] font-mono text-slate-700">{node.load}%</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 font-bold">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Sync</p>
                    <p className="text-[10px] font-mono text-slate-700">{node.lastSync}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={node.status === 'active' ? 'ghost' : 'primary'}
                    size="sm"
                    className="flex-1 font-bold text-[10px] tracking-widest uppercase py-1.5 rounded-xl shadow-none"
                    disabled={node.status === 'offline'}
                    onClick={() => toggleNode(node.id)}
                  >
                    {node.status === 'active' ? <><Square size={12} className="mr-2" /> Stop Node</> : <><Play size={12} className="mr-2" /> Start Node</>}
                  </Button>
                  <Button variant="secondary" size="sm" className="px-2.5 rounded-xl shadow-none" disabled={node.status === 'offline'}>
                    <RefreshCcw size={12} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Two-Step Emergency Modal */}
      <Modal
        isOpen={isEmergencyModalOpen}
        onClose={() => {
          setIsEmergencyModalOpen(false);
          setStep(1);
        }}
        title="Tactical Emergency Trigger"
        footer={
          <>
            <Button variant="ghost" onClick={() => {
              setIsEmergencyModalOpen(false);
              setStep(1);
            }}>Cancel</Button>
            <Button variant="danger" onClick={handleEmergencyTrigger}>
              {step === 1 ? 'Next Phase' : 'EXECUTE GLOBAL TRIGGER'}
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-600 rounded-xl text-white shrink-0 shadow-lg shadow-red-600/20">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Protocol Delta-9</p>
              <h4 className="text-lg font-bold text-slate-900">Manual Alert Dispatch</h4>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs border-2 transition-all",
                    step >= i ? "bg-red-600 border-red-600 text-white" : "bg-slate-100 border-slate-300 text-slate-400"
                  )}>
                    0{i}
                  </div>
                  <span className={cn("text-[10px] font-black uppercase tracking-widest", step >= i ? "text-slate-700" : "text-slate-400")}>
                    {i === 1 ? 'Auth' : 'Verify'}
                  </span>
                </div>
              ))}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-slate-200 -z-10" />
              <div
                className="absolute top-4 left-[25%] h-0.5 bg-red-600 -z-10 transition-all duration-500"
                style={{ width: step === 2 ? '50%' : '0%' }}
              />
            </div>
          </div>

          {step === 1 ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <p className="text-sm text-slate-600">Initialize a global emergency state on all operational nodes. This will consume high bandwidth and power.</p>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Target Surface</p>
                <p className="text-xs font-bold text-slate-800">Global Grid Network (Area Alpha)</p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-4">
              <div className="flex items-center gap-2 bg-red-100 p-2 rounded border border-red-200">
                <AlertTriangle size={14} className="text-red-500 animate-pulse" />
                <p className="text-[10px] font-black text-red-600 uppercase tracking-tighter">FINAL VERIFICATION REQUIRED</p>
              </div>
              <p className="text-sm text-slate-700 font-medium">Entering this command will notify all regional stakeholders immediately.</p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white p-2 rounded border border-slate-200">
                Security Context: <span className="text-slate-800">Personnel C-19 / Level 4</span>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
