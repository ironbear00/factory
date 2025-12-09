import React, {createContext, useReducer, useContext, useEffect} from 'react';
import type { MachineAction } from './DashboardAction';
import { initialMockState } from './initialState.ts';
import { dashboardReducer } from './DashboardReducer';
import { fetchAllMachines } from '../api/machineApi.ts';
import { useRealtimeData } from '../hooks/useRealtimeData';

interface DashboardContextProps {
  state: typeof initialMockState;
  dispatch: React.Dispatch<MachineAction>;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

const RealtimeDataStarter: React.FC = () => {
  useRealtimeData();
  return null;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(dashboardReducer, initialMockState);
  

    useEffect(() => {
      const loadInitialData = async () => {
        try {
          const data = await fetchAllMachines();
          dispatch({ type: 'LOAD_INITIAL_DATA', payload: data });
        } catch (error) {
          dispatch({ type: 'SET_ERROR', payload: '초기 데이터를 불러오는데 실패했습니다.' });
        }
      };
      loadInitialData();
    }, []);
  
    return (
      <DashboardContext.Provider value={{ state, dispatch }}>
        <RealtimeDataStarter />
          {children}
      </DashboardContext.Provider>
    );
  };

  export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
      throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
  };