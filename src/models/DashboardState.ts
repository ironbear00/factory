import type { MachineData } from './MachineData';
import type { Alert } from './AlertModel';

export interface DashboardState 
{
    machines: MachineData[];    
    alerts: Alert[];            
    isLoading: boolean;         
    error: string | null;       
    threshold: 
    {
        temperature: number;   
    }
}