import { Time, CandlestickData } from 'lightweight-charts';  

export type TimePeriod = "1m" | "5m" | "1h" | "1d" | "1M" | "1y";  

export interface CandlestickDataItem {  
  time: string;  
  open: number;  
  high: number;  
  low: number;  
  close: number;  
}