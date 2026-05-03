import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { WeatherSeverity } from './types';
import {
  FileText,
  Download,
  Search,
  Filter,
  Calendar,
  ChevronRight,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from './utils';

const weatherData = [
  { time: '00:00', temp: 18, rain: 2 },
  { time: '04:00', temp: 16, rain: 5 },
  { time: '08:00', temp: 22, rain: 12 },
  { time: '12:00', temp: 28, rain: 0 },
  { time: '16:00', temp: 31, rain: 0 },
  { time: '20:00', temp: 25, rain: 8 },
  { time: '23:59', temp: 19, rain: 3 },
];

export const HistoryScreen: React.FC = () => {
  const events = [
    { id: 'EV-102', date: '2026-05-02', type: 'Cyclonic Activity', severity: WeatherSeverity.EMERGENCY, summary: 'Category 2 cyclone made landfall in Eastern Sector. Significant wind damage reported.' },
    { id: 'EV-101', date: '2026-04-28', type: 'Thermal Wave', severity: WeatherSeverity.WARNING, summary: 'Prolonged heatwave across central districts. Max temp reached 42°C.' },
    { id: 'EV-100', date: '2026-04-15', type: 'Precipitation Peak', severity: WeatherSeverity.NORMAL, summary: 'Seasonal rains exceeded average by 15%. Reservoir levels optimal.' },
    { id: 'EV-099', date: '2026-04-02', type: 'Flash Flood Alert', severity: WeatherSeverity.EMERGENCY, summary: 'Rapid accumulation in Riverbend Basin. Emergency evacuations successful.' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Intelligence Archive</h1>
          <p className="text-slate-500 text-sm font-medium">Historical records and performance reporting</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search Archives..."
              className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all w-64 shadow-sm"
            />
          </div>
          <Button variant="secondary" size="sm" className="gap-2 shadow-none">
            <Filter size={14} /> Filters
          </Button>
          <Button variant="primary" size="sm" className="gap-2">
            <Download size={14} /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trends Chart */}
        <Card className="lg:col-span-2 p-6 flex flex-col min-h-[400px] bg-white border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" />
              <h3 className="font-bold text-sm tracking-tight text-slate-900 uppercase">Meteorological Performance (24h)</h3>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Temp (°C)
              </span>
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Precp (mm)
              </span>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weatherData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="temp" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
                <Area type="monotone" dataKey="rain" stroke="#0891b2" strokeWidth={3} fillOpacity={1} fill="url(#colorRain)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Stability Index */}
        <Card className="flex flex-col bg-white border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-600" />
              <h3 className="font-bold text-sm tracking-tight text-slate-900 uppercase">Grid Safety Index</h3>
            </div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">98.4% Optimal</span>
          </div>

          <div className="p-6 flex-1 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Network Reliability</p>
                <p className="text-xl font-bold font-mono text-slate-900">0.998</p>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[95%] shadow-lg shadow-blue-600/20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Total Alerts</p>
                <p className="text-xl font-bold text-slate-900 font-mono">142</p>
                <p className="text-[9px] font-black text-emerald-600 mt-2 uppercase tracking-tighter">↓ 12% Month-over-Month</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Mean Response</p>
                <p className="text-xl font-bold text-slate-900 font-mono">2.4m</p>
                <p className="text-[9px] font-black text-blue-600 mt-2 uppercase tracking-tighter">↓ 0.4m Threshold</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center bg-white">
              <FileText size={24} className="text-slate-300 mb-3" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Export Full Audit Log</p>
              <Button variant="secondary" size="sm" className="text-[10px] py-2 h-auto w-full shadow-none">DOWNLOAD LOGS</Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-white border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 bg-slate-50/50 border-b border-slate-100">
          <h3 className="font-bold text-sm tracking-tight text-slate-900 flex items-center gap-2 uppercase tracking-wide">
            <Calendar size={16} className="text-blue-600" /> Chronological Intelligence Log
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/30">
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Vector ID</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timestamp</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Categorization</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Severity State</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Summary</th>
                <th className="p-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                  <td className="p-5 text-xs font-mono font-bold text-blue-600">{event.id}</td>
                  <td className="p-5 text-xs font-bold text-slate-600">{event.date}</td>
                  <td className="p-5">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-tight">{event.type}</span>
                  </td>
                  <td className="p-5">
                    <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border shadow-sm",
                      event.severity === WeatherSeverity.EMERGENCY ? "bg-red-50 text-red-600 border-red-100" :
                      event.severity === WeatherSeverity.WARNING ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-emerald-50 text-emerald-600 border-emerald-100"
                    )}>
                      {event.severity}
                    </span>
                  </td>
                  <td className="p-5 max-w-md">
                    <p className="text-xs text-slate-500 font-medium leading-relaxed truncate">{event.summary}</p>
                  </td>
                  <td className="p-5 text-right">
                    <button className="p-2 rounded-xl text-slate-300 hover:text-blue-600 hover:bg-white border border-transparent hover:border-slate-200 transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-5 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span>Total: 1,204 Data Vectors Logged</span>
          <div className="flex gap-4">
            <button className="hover:text-slate-900 transition-colors">Previous Session</button>
            <div className="h-3 w-px bg-slate-200 mx-1" />
            <button className="text-blue-600 hover:text-blue-700 transition-colors">Next Session</button>
          </div>
        </div>
      </Card>
    </div>
  );
};
