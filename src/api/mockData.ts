import type { MachineData } from '../models/MachineData';

export const initialMockMachines: MachineData[] = [
    {
        id: 'M-101',
        name: 'CNC 1호기',
        status: 'RUNNING',
        temperature: 85,
        vibration: 0.15,
        operatingRate: 0.95,
        lastUpdated: Date.now(),
    },
    {
        id: 'M-102',
        name: '용접 로봇 A',
        status: 'READY',
        temperature: 30,
        vibration: 0.05,
        operatingRate: 0.0,
        lastUpdated: Date.now(),
    },
];