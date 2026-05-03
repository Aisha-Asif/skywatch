export enum UserRole {
  METEOROLOGIST = 'Meteorologist',
  ADMIN = 'Admin',
  FIELD_OPERATOR = 'Field Operator'
}

export enum WeatherSeverity {
  NORMAL = 'Normal',
  WARNING = 'Warning',
  EMERGENCY = 'Emergency'
}

export enum AlertType {
  TORNADO = 'TORNADO',
  FLOOD = 'FLOOD',
  HEATWAVE = 'HEATWAVE',
  CYCLONE = 'CYCLONE'
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  severity: WeatherSeverity;
  timestamp: string;
}

export interface Alert {
  id: string;
  type: AlertType;
  zone: string;
  severity: WeatherSeverity;
  issuedAt: string;
  description: string;
}

export interface SensorNode {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'offline';
  lastReading: string;
}

export interface HistoryEvent {
  id: string;
  date: string;
  type: string;
  severity: WeatherSeverity;
  summary: string;
}
