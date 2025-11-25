import type { DashboardState } from "../models/DashboardState";
import type { MachineAction } from "./DashboardAction";

export const dashboardReducer=(
    state: DashboardState,
    action: MachineAction
): DashboardState =>{
    switch(action.type)
    {
        case 'LOAD_INITIAL_DATA':
            return{
                ...state,
                machines:action.payload,
                isLoading: false,
                error: null,
            };
        case 'UPDATE_REALTIME_DATA':
            return{
                ...state,
                machines:action.payload,
            };
        default:
            return state;
    }
};