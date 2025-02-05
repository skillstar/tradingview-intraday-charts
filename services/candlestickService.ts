import { CandlestickData, Time } from 'lightweight-charts';  
import { TimePeriod, CandlestickDataItem } from '@/types';  
import { TimeConverter } from '@/utils/timeUtils';  

export class CandlestickService {  
  // 生成模拟蜡烛数据的辅助方法  
  private static generateCandlestickData(  
    startPrice: number,   
    count: number,   
    timeInterval: (index: number) => string  
  ): CandlestickDataItem[] {  
    const data: CandlestickDataItem[] = [];  
    let currentPrice = startPrice;  

    for (let i = 0; i < count; i++) {  
      // 随机波动  
      const volatility = Math.random() * 0.1; // 10%的波动率  
      const isUpCandle = Math.random() > 0.5;  

      const open = currentPrice;  
      const close = isUpCandle   
        ? open * (1 + volatility)   
        : open * (1 - volatility);  
      
      const high = Math.max(open, close) * (1 + Math.random() * 0.05);  
      const low = Math.min(open, close) * (1 - Math.random() * 0.05);  

      data.push({  
        time: timeInterval(i),  
        open: Number(open.toFixed(2)),  
        high: Number(high.toFixed(2)),  
        low: Number(low.toFixed(2)),  
        close: Number(close.toFixed(2))  
      });  

      // 更新当前价格  
      currentPrice = close;  
    }  

    return data;  
  }  

  // 模拟数据获取  
  static fetchChartData(period: TimePeriod): CandlestickData<Time>[] {  
    const periodData: Record<TimePeriod, CandlestickDataItem[]> = {  
      "1m": this.generateCandlestickData(100, 60, (i) => {  
        const date = new Date(2024, 0, 1); // 从2024年1月1日开始  
        date.setMinutes(date.getMinutes() + i);  
        return date.toISOString();  
      }),  
      
      "5m": this.generateCandlestickData(100, 48, (i) => {  
        const date = new Date(2024, 0, 1);  
        date.setMinutes(date.getMinutes() + i * 5);  
        return date.toISOString();  
      }),  
      
      "1h": this.generateCandlestickData(100, 24, (i) => {  
        const date = new Date(2024, 0, 1);  
        date.setHours(date.getHours() + i);  
        return date.toISOString();  
      }),  
      
      "1d": this.generateCandlestickData(100, 30, (i) => {  
        const date = new Date(2023, 0, 1);  
        date.setDate(date.getDate() + i);  
        return date.toISOString().split('T')[0];  
      }),  
      
      "1M": this.generateCandlestickData(100, 12, (i) => {  
        const date = new Date(2020, i, 1);  
        return date.toISOString().split('T')[0];  
      }),  
      
      "1y": this.generateCandlestickData(100, 5, (i) => {  
        const date = new Date(2020 + i, 0, 1);  
        return date.toISOString().split('T')[0];  
      })  
    };  

    return periodData[period].map(item => ({  
      time: TimeConverter.safeConvert(item.time),  
      open: item.open,  
      high: item.high,  
      low: item.low,  
      close: item.close,  
    }));  
  }  

  // 从 API 获取数据的异步方法  
  static async fetchDataFromAPI(period: TimePeriod): Promise<CandlestickData<Time>[]> {  
    try {  
      const response = await fetch(`/api/candlestick-data?period=${period}`);  
      const data: CandlestickDataItem[] = await response.json();  
      
      return data.map(item => ({  
        time: TimeConverter.safeConvert(item.time),  
        open: item.open,  
        high: item.high,  
        low: item.low,  
        close: item.close,  
      }));  
    } catch (error) {  
      console.error('Failed to fetch data:', error);  
      return this.fetchChartData(period); // 如果 API 失败，返回模拟数据  
    }  
  }  

  // 数据处理方法  
  static processChartData(data: CandlestickDataItem[]): CandlestickData<Time>[] {  
    return data.map(item => ({  
      time: TimeConverter.safeConvert(item.time),  
      open: item.open,  
      high: item.high,  
      low: item.low,  
      close: item.close,  
    }));  
  }  
}