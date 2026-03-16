export const todayISO: string = new Date().toISOString().slice(0, 10); 
// z.B. "2025-08-08"
export const today: string = new Date().toDateString();
export const doneTasksToDelete: number = 4;
export const generateUUID = (): string => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
type RGB = [number, number, number]
export const COLORS: RGB[] = [
    [255, 158, 74],
    [255, 107, 107],
    [199, 77, 206],
    [56, 189, 248],   
    [16, 185, 129],
    ]

