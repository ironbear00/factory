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
        let data = response.data;

        if (Array.isArray(data)) {
            // ✅ 배열일 경우: 리듀서에 정상적으로 배열 전달
            return data as MachineData[]; 
        } else {
            // ❌ 배열이 아닐 경우: 즉시 오류 발생
            console.error("Mock API 응답 데이터가 배열이 아닙니다:", data);
            throw new Error('API 응답 데이터 형식이 잘못되었습니다.');
        }
        
        return response.data as MachineData[]; 
    } catch (error) {
        console.error("Error fetching mock data:", error);
        throw new Error('Failed to fetch machine data.');
    }
};