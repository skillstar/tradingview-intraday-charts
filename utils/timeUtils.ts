import { Time, BusinessDay } from 'lightweight-charts';  

export class TimeConverter {  
  static toTime(dateString: string): Time {  
    const date = new Date(dateString);  
    
    if (dateString.includes(':')) {  
      return Math.floor(date.getTime() / 1000) as unknown as Time;  
    }  
    
    return {  
      year: date.getFullYear(),  
      month: date.getMonth() + 1,  
      day: date.getDate(),  
    } as BusinessDay;  
  }  

  static formatTime(time: Time): string {  
    if (typeof time === 'number') {  
      return new Date(time * 1000).toLocaleString();  
    }  
    
    if (time && typeof time === 'object' && 'year' in time && 'month' in time && 'day' in time) {  
      return `${time.year}-${time.month.toString().padStart(2, '0')}-${time.day.toString().padStart(2, '0')}`;  
    }  
    
    return String(time);  
  }  

  static safeConvert(time: string | Time): Time {  
    if (typeof time !== 'string') {  
      return time;  
    }  
    
    return this.toTime(time);  
  }  
}