export type AlertLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Alert 
{
    id: string;             
    machineId: string;      
    level: AlertLevel;     
    message: string;        
    timestamp: number;      
    isResolved: boolean;    
}