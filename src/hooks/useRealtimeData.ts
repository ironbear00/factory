import { useEffect, useRef } from 'react';
import { useDashboard } from '../context/DashboardContext';
import type { MachineData } from '../models/MachineData';

const generateUpdatedData = (currentMachines: MachineData[]): MachineData[] => {
    return currentMachines.map(machine => {
        const newTemperature = machine.temperature + (Math.random() - 0.5) * 0.5;
        const newVibration = machine.vibration + (Math.random() - 0.5) * 0.01;
        
        let newStatus = machine.status;
        if (newTemperature > 90.0 && newStatus !== 'ERROR') {
            newStatus = 'WARNING';
        } else if (newTemperature < 85.0 && newStatus === 'WARNING') {
            newStatus = 'RUNNING';
        }

        return {
            ...machine,
            temperature: parseFloat(newTemperature.toFixed(2)),
            vibration: parseFloat(newVibration.toFixed(2)),
            status: newStatus,
            lastUpdated: Date.now(),
        };
    });
};

export const useRealtimeData = () => {
    const { state, dispatch } = useDashboard();
    const stateRef = useRef(state);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentMachines = stateRef.current.machines;

            if (stateRef.current.isLoading || !Array.isArray(currentMachines)) {
                return;
           }

            const updatedMachines = generateUpdatedData(state.machines);
            dispatch({ type: 'UPDATE_REALTIME_DATA', payload: updatedMachines });       
        }, 1000);
        return () => {
            clearInterval(intervalId);
            console.log('✅ Realtime Data Interval Cleared.');
        };
    }, [dispatch]);
};