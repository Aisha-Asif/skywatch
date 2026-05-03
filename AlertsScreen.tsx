import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Modal } from './Modal';
import { AlertType, WeatherSeverity } from './types';
import { ALERT_CONFIG } from './constants';
import {
  ShieldAlert,
  Send,
  Info,
  Clock,
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from './utils';

export const AlertsScreen: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<{ type: AlertType; zone: string } | null>(null);

  const activeAlerts = [
    { id: '1', type: AlertType.TORNADO, zone: 'North Ridge Sector', severity: WeatherSeverity.EMERGENCY, trend: 'Increasing', time: '10 min ago' },
    { id: '2', type: AlertType.FLOOD, zone: 'Riverbend Basin', severity: WeatherSeverity.EMERGENCY, trend: 'Stable', time: '25 min ago' },
    { id: '3', type: AlertType.HEATWAVE, zone: 'Central District', severity: WeatherSeverity.WARNING, trend: 'Increasing', time: '1 hour ago' },
  ];

  const handleBroadcastInit = (type: AlertType, zone: string) => {
    setSelectedAlert({ type, zone });
    setIsModalOpen(true);
  };

  const handleConfirmBroadcast = () => {
    setIsModalOpen(false);
    alert(`BROADCAST SUCCESSFUL: ${selectedAlert?.type} warning issued for ${selectedAlert?.zone}. Emergency frequencies engaged.`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Tactical Alert Center</h1>
          <p className="text-slate-500 text-sm font-medium">Issue and manage regional emergency broadcasts</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" className="gap-2">
            <Info size={14} /> Protocol Review
          </Button>
          <Button variant="danger" size="sm" className="gap-2 shadow-red-500/10">
            <ShieldAlert size={14} /> Emergency Broadcast
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeAlerts.map((alert, idx) => {
          const config = ALERT_CONFIG[alert.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="flex flex-col h-full bg-white border-slate-200 overflow-hidden group shadow-sm">
                <div className={cn("p-1.5 flex items-center justify-center", alert.severity === WeatherSeverity.EMERGENCY ? "bg-red-600" : "bg-amber-500")}>
                  <span className="text-[9px] font-black uppercase text-white tracking-[0.2em]">Operational Warning Card</span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn("p-4 rounded-3xl", config.bg)}>
                      <Icon className={cn("w-10 h-10", config.color)} />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Vector Code</p>
                      <p className={cn("text-xs font-bold font-mono px-2 py-0.5 rounded border inline-block",
                        alert.severity === WeatherSeverity.EMERGENCY ? "border-red-200 text-red-600 bg-red-50" : "border-amber-200 text-amber-600 bg-amber-50")}>
                        {alert.severity === WeatherSeverity.EMERGENCY ? 'A-1_CRITICAL' : 'B-2_ELEVATED'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-2">{alert.type} WARNING</h3>
                      <div className="flex items-center gap-2 text-slate-500">
                        <MapPin size={14} className="text-blue-600" />
                        <span className="text-sm font-bold tracking-tight">{alert.zone}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time Elapsed</p>
                        <div className="flex items-center gap-1.5 text-slate-900 uppercase">
                          <Clock size={12} className="text-slate-400" />
                          <span className="text-xs font-bold font-mono">{alert.time}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Threat Trend</p>
                        <div className="flex items-center gap-1.5 text-slate-900">
                          <AlertTriangle size={12} className={cn(alert.trend === 'Increasing' ? "text-red-500 animate-pulse" : "text-slate-400")} />
                          <span className="text-xs font-bold font-mono">{alert.trend}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      variant={alert.severity === WeatherSeverity.EMERGENCY ? 'danger' : 'primary'}
                      className="w-full gap-2 py-3.5"
                      onClick={() => handleBroadcastInit(alert.type, alert.zone)}
                    >
                      <Send size={16} />
                      Issue Regional Advisory
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}

        {/* Rapid Deployment Shell */}
        <Card className="border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center p-8 text-center min-h-[350px]">
          <div className="w-16 h-16 rounded-3xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 mb-4 shadow-sm">
            <ShieldAlert size={32} />
          </div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-2">Manual Vector</h3>
          <p className="text-xs text-slate-500 mb-6 max-w-[200px]">Initialize tactical warning for manually identified meteorological threat.</p>
          <Button variant="secondary" size="sm">Engage Alert Wizard</Button>
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tactical Broadcast Confirmation"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Abort Task</Button>
            <Button variant="danger" onClick={handleConfirmBroadcast} className="gap-2">
              <Send size={16} /> Execute Broadcast
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-red-50 border border-red-200">
            <div className="p-3 bg-red-600 rounded-lg text-white">
              <ShieldAlert size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Authorization Required</p>
              <p className="text-sm font-bold text-slate-800">Regional Emergency Protocol Engage</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-slate-600 leading-relaxed">
              You are about to initiate a city-wide broadcast for a <span className="text-slate-900 font-bold">{selectedAlert?.type}</span> in
              the <span className="text-slate-900 font-bold">{selectedAlert?.zone}</span> area.
            </p>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-2 font-mono">
                <div className="w-1 h-1 rounded-full bg-blue-500" /> [ACTION] ENGAGE EMERGENCY SIRENS
              </li>
              <li className="flex items-center gap-2 font-mono">
                <div className="w-1 h-1 rounded-full bg-blue-500" /> [ACTION] OVERRIDE PUBLIC FREQUENCIES
              </li>
              <li className="flex items-center gap-2 font-mono">
                <div className="w-1 h-1 rounded-full bg-blue-500" /> [ACTION] LOG PERSONNEL ID C-19
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-100 p-2 rounded border border-slate-200">
              Note: This action is permanent and will be logged for audit.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
