
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  parseISO,
  isEqual,
  getHours,
  getMinutes,
  addMinutes,
  startOfDay,
} from 'date-fns';

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
};

export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'h:mm a');
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd h:mm a');
};

export const formatShortDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM d');
};

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Start from Monday
  const end = endOfWeek(date, { weekStartsOn: 1 }); // End on Sunday
  
  return eachDayOfInterval({ start, end });
};

export const isSameDay = (date1: Date | string, date2: Date | string): boolean => {
  const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  
  return isEqual(
    new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()),
    new Date(d2.getFullYear(), d2.getMonth(), d2.getDate())
  );
};

export const generateTimeSlots = (): Date[] => {
  const slots: Date[] = [];
  const today = startOfDay(new Date());
  
  for (let hour = 7; hour <= 23; hour++) {
    slots.push(addMinutes(today, hour * 60));
  }
  
  return slots;
};

export const getEventPosition = (start: string, end: string): { top: number; height: number } => {
  const startDate = parseISO(start);
  const endDate = parseISO(end);
  
  const startHour = getHours(startDate);
  const startMinute = getMinutes(startDate);
  const endHour = getHours(endDate);
  const endMinute = getMinutes(endDate);
  
  const startPosition = (startHour - 7) * 60 + startMinute; // 7 AM is the first hour
  const endPosition = (endHour - 7) * 60 + endMinute;
  const duration = endPosition - startPosition;
  
  // Convert to percentage for positioning (each hour is 60px, so divide by 60)
  const top = startPosition;
  const height = duration;
  
  return { top, height };
};

export const getTimeFromPosition = (
  position: number,
  date: Date,
): Date => {
  const hours = Math.floor(position / 60) + 7; // 7 AM is the first hour
  const minutes = position % 60;
  
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  
  return result;
};

export const roundToNearestQuarter = (date: Date): Date => {
  const minutes = date.getMinutes();
  const roundedMinutes = Math.round(minutes / 15) * 15;
  const result = new Date(date);
  result.setMinutes(roundedMinutes);
  return result;
};
