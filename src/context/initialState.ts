import type { DashboardState } from '../models/DashboardState'; 

export const initialMockState: DashboardState = {
    machines: [],          
    alerts: [],            
    isLoading: true,       
    error: null,           
    threshold: {
        temperature: 90,   
    }
};