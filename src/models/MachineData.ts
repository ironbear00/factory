export type MachineStatus = 'READY' | 'RUNNING' | 'WARNING' | 'ERROR';

export interface MachineData 
{
    id: string;             
    name: string;           
    status: MachineStatus;  
    temperature: number;   
    vibration: number;      
    operatingRate: number;  
    lastUpdated: number;   
}