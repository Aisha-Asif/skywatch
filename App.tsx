import React, { useState } from 'react';
import { UserRole } from './types';
import { LoginScreen } from './LoginScreen';
import { DashboardScreen } from './DashboardScreen';
import { AlertsScreen } from './AlertsScreen';
import { MonitoringScreen } from './MonitoringScreen';
import { HistoryScreen } from './HistoryScreen';
import { NAVBAR_ITEMS } from './constants';
import { LogOut, Shield } from 'lucide-react';
import { cn } from './utils';

export default function App() {
  const [user, setUser] = useState<{ role: UserRole } | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (role: UserRole) => {
    setUser({ role });
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardScreen />;
      case 'alerts': return <AlertsScreen />;
      case 'monitoring': return <MonitoringScreen />;
      case 'history': return <HistoryScreen />;
      default: return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden flex flex-col p-6 space-y-4">
      {/* Top Navigation */}
      <header className="flex justify-between items-center bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-xl shadow-slate-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield size={20} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">SKYWATCH <span className="text-blue-500">PRO</span></span>
        </div>

        <nav className="flex space-x-2 bg-slate-100 p-1.5 rounded-full border border-slate-200">
          {NAVBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all",
                activeTab === item.id
                  ? "bg-white text-blue-600 border border-slate-200 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-900">Personnel C-19</div>
              <div className="text-[10px] text-blue-600 uppercase font-black tracking-tighter">{user.role}</div>
            </div>
            <button
              onClick={handleLogout}
              className="w-10 h-10 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-500/50 transition-all group shadow-sm"
            >
              <LogOut size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 min-h-0 overflow-y-auto scroll-smooth">
        <div className="max-w-[1400px] mx-auto h-full">
          {renderContent()}
        </div>
      </main>

      {/* System Status Toast */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-blue-400/50 z-50">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-sm font-bold text-white uppercase tracking-tight">System Sync Complete: 14 Nodes Connected</span>
      </div>
    </div>
  );
}
