import { AlertType, WeatherSeverity } from './types';
import {
  Gauge,
  ShieldAlert,
  Activity,
  History,
  CloudLightning,
  Waves,
  Sun,
  Tornado
} from 'lucide-react';

export const NAVBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Activity },
  { id: 'alerts', label: 'Tactical Alerts', icon: ShieldAlert },
  { id: 'monitoring', label: 'Sensor Grid', icon: Gauge },
  { id: 'history', label: 'Intelligence Log', icon: History },
];

export const ALERT_CONFIG = {
  [AlertType.TORNADO]: { icon: Tornado, color: 'text-red-500', bg: 'bg-red-500/10' },
  [AlertType.FLOOD]: { icon: Waves, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  [AlertType.HEATWAVE]: { icon: Sun, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  [AlertType.CYCLONE]: { icon: CloudLightning, color: 'text-purple-500', bg: 'bg-purple-500/10' },
};

export const SEVERITY_COLORS = {
  [WeatherSeverity.NORMAL]: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  [WeatherSeverity.WARNING]: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  [WeatherSeverity.EMERGENCY]: 'text-red-500 bg-red-500/10 border-red-500/20',
};
