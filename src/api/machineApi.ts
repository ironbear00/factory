import axios from 'axios';
import type { MachineData } from '../models/MachineData'; 

const API_URL = '/data/machines.json'; 

/**
 * Mock API로부터 모든 장비 데이터를 비동기로 가져오는 함수
 * @returns Promise<MachineData[]>
 */
export const fetchAllMachines = async (): Promise<MachineData[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data as MachineData[]; 
    } catch (error) {
        console.error("Error fetching mock data:", error);
        throw new Error('Failed to fetch machine data.');
    }
};