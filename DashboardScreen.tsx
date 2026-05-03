import React from 'react';
import { Card } from './Card';
import { WeatherSeverity } from './types';
import {
  Wind,
  Info,
  ExternalLink,
  Map as MapIcon,
  Search,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from './utils';
import { Button } from './Button';

export const DashboardScreen: React.FC = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-6 gap-4 h-full min-h-[800px]">

      {/* Atmospherics */}
      <Card className="col-span-12 lg:col-span-3 row-span-2 p-6 flex flex-col justify-between bg-white border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Atmospheric Metrics</h3>
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-2xl font-light text-blue-600 font-mono tracking-tighter">24.5°C</div>
            <div className="text-[10px] text-slate-500 uppercase font-black">Temperature</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-light text-emerald-600 font-mono tracking-tighter">62%</div>
            <div className="text-[10px] text-slate-500 uppercase font-black">Humidity</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-light text-slate-900 font-mono tracking-tighter">1012<span className="text-xs ml-1 opacity-50">hPa</span></div>
            <div className="text-[10px] text-slate-500 uppercase font-black">Pressure</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-light text-amber-600 font-mono tracking-tighter">48<span className="text-xs ml-1 opacity-50">km/h</span></div>
            <div className="text-[10px] text-slate-500 uppercase font-black">Wind Speed</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between opacity-50 hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Sector 7A Alpha</span>
          <ExternalLink size={12} className="text-slate-400" />
        </div>
      </Card>

      {/* Active Threat Queue */}
      <Card className="col-span-12 lg:col-span-5 row-span-2 p-6 bg-white border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Threat Queue</h3>
          <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] rounded border border-red-100 font-black uppercase tracking-tighter">3 Active Alerts</span>
        </div>
        <div className="space-y-3">
          <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center p-3 bg-red-50/50 border-l-4 border-red-500 rounded-r-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center mr-4 text-white shadow-lg shadow-red-600/10">
              <AlertTriangle size={20} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-slate-900 uppercase tracking-tight">Severe Heatwave</div>
              <div className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Sector 7G | Critical Threat</div>
            </div>
            <Button size="sm" variant="danger" className="h-8 py-0 px-3">DISPATCH</Button>
          </motion.div>

          <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center p-3 bg-amber-50/50 border-l-4 border-amber-500 rounded-r-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center mr-4 text-white shadow-lg shadow-amber-600/10">
              <Wind size={20} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-slate-900 uppercase tracking-tight">Flash Flood Warning</div>
              <div className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">River Basin | Elevated</div>
            </div>
            <Button size="sm" variant="secondary" className="h-8 py-0 px-3">REVIEW</Button>
          </motion.div>
        </div>
      </Card>

      {/* Regional Overview */}
      <Card className="col-span-12 lg:col-span-4 row-span-2 p-6 flex flex-col bg-white border-slate-200 shadow-sm">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Regional Overview</h3>
        <div className="flex-1 space-y-4">
          {[
            { district: 'Central District', status: 'Normal', color: 'bg-emerald-500' },
            { district: 'Western Coastal', status: 'High Risk', color: 'bg-red-500' },
            { district: 'Highland Peaks', status: 'Watch', color: 'bg-amber-500' },
          ].map((region) => (
            <div key={region.district} className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all">
              <span className="text-xs font-medium text-slate-700 uppercase tracking-wide">{region.district}</span>
              <div className="flex items-center space-x-3">
                <div className={cn("w-2 h-2 rounded-full", region.color)}></div>
                <span className={cn("text-[10px] font-black uppercase tracking-tighter",
                  region.status === 'Normal' ? 'text-emerald-600' : region.status === 'High Risk' ? 'text-red-600' : 'text-amber-600')
                }>{region.status}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Info size={12} className="text-blue-600" /> Manual Sync Override
          </div>
          <Button variant="danger" size="sm" className="w-full text-[10px] tracking-[0.2em] shadow-none">EMERGENCY BROADCAST</Button>
        </div>
      </Card>

      {/* Map Visualization */}
      <Card className="col-span-12 lg:col-span-8 row-span-4 relative overflow-hidden bg-slate-100 border-slate-200 shadow-sm">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 via-transparent to-transparent"></div>
        <img
          src="https://picsum.photos/seed/tactical-map/1200/800?blur=1"
          alt="Tactical Map"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
          referrerPolicy="no-referrer"
        />

        {/* Tactical Grid Overlay */}
        <div className="absolute inset-0 p-8">
          <div className="w-full h-full border border-slate-300/30 rounded-2xl grid grid-cols-12 grid-rows-8 pointer-events-none">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-slate-200" />
            ))}
          </div>

          <div className="absolute top-1/4 left-1/3 bg-white border-2 border-red-500 px-4 py-2 rounded-xl flex items-center space-x-3 shadow-xl cursor-default">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">ZONE 7: EXTREME HEAT</span>
              <span className="text-[8px] font-bold text-red-600 uppercase tracking-widest leading-none">Critical Intensity</span>
            </div>
          </div>
          <div className="absolute bottom-1/3 right-1/4 bg-white border-2 border-emerald-500 px-4 py-2 rounded-xl flex items-center space-x-3 shadow-xl cursor-default">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">ZONE 12: STABLE GRID</span>
              <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest leading-none">Optimal Readings</span>
            </div>
          </div>
        </div>

        <div className="absolute top-6 left-6 flex space-x-2">
          <button className="p-2.5 bg-white border border-slate-200 hover:border-blue-500 transition-all rounded-xl text-slate-600 shadow-sm">
            <Search size={16} />
          </button>
          <button className="p-2.5 bg-white border border-slate-200 hover:border-blue-500 transition-all rounded-xl text-slate-600 shadow-sm">
            <MapIcon size={16} />
          </button>
        </div>
      </Card>

      {/* Sensor Node Status */}
      <Card className="col-span-12 lg:col-span-4 row-span-2 p-6 flex flex-col bg-white border-slate-200 shadow-sm">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Sensor Node Status</h3>
        <div className="flex-1 space-y-3">
          {[
            { name: 'Station Alpha-01', active: true },
            { name: 'Station Gamma-04', active: true },
            { name: 'Buoy Station Z9', active: false },
          ].map((station) => (
            <div key={station.name} className="flex items-center justify-between bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center space-x-4">
                <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", station.active ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.3)]")}></div>
                <span className="text-xs font-bold text-slate-900">{station.name}</span>
              </div>
              <div className={cn(
                "w-10 h-5 rounded-full relative border flex items-center px-1 transition-colors",
                station.active ? "bg-emerald-100 border-emerald-500/50" : "bg-slate-200 border-slate-300"
              )}>
                <div className={cn(
                  "w-3 h-3 rounded-full transition-all shadow-sm",
                  station.active ? "bg-emerald-600 ml-auto" : "bg-slate-400"
                )}></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Historical Trends */}
      <Card className="col-span-12 lg:col-span-4 row-span-2 p-6 flex flex-col bg-white border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Historical Trends</h3>
          <BarChart3 size={18} className="text-blue-600" />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-end justify-between space-x-1 flex-1 mb-2 h-20">
            {[40, 60, 30, 80, 55, 45, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="flex-1 bg-gradient-to-t from-blue-50 to-blue-600/60 rounded-lg min-w-[8px]"
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-6 shadow-none py-3">Download Intel Report</Button>
        </div>
      </Card>

    </div>
  );
};
