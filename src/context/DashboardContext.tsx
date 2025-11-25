import React, {createContext, useReducer, useContext, useEffect} from 'react';
import type { MachineAction } from './DashboardAction';
import { initialMockState } from './initialState.ts';
import { dashboardReducer } from './DashboardReducer';
import { fetchAllMachines } from '../api/machineApi.ts';

interface DashboardContextProps {
  state: typeof initialMockState;
  dispatch: React.Dispatch<MachineAction>;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(dashboardReducer, initialMockState);
  
    // Day 2의 Mock API 연결 및 초기 데이터 로드
    useEffect(() => {
      const loadInitialData = async () => {
        try {
          const data = await fetchAllMachines(); // Axios로 public/data/machines.json 요청
          dispatch({ type: 'LOAD_INITIAL_DATA', payload: data });
        } catch (error) {
          dispatch({ type: 'SET_ERROR', payload: '초기 데이터를 불러오는데 실패했습니다.' });
        }
      };
      loadInitialData();
    }, []);
  
    return (
      <DashboardContext.Provider value={{ state, dispatch }}>
        {children}
      </DashboardContext.Provider>
    );
  };
  
  // 4. Custom Hook 생성 (컴포넌트에서 Context를 쉽게 사용할 수 있도록)
  export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
      throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
  };