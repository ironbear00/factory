import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import MachineCard from '../components/MachineCard';

const DashboardContainer: React.FC = () => {
    const { state, dispatch } = useDashboard(); 
    const { machines, isLoading, error } = state;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-2xl text-blue-500">
                데이터 로딩 중...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-red-600 bg-red-100 border border-red-400 rounded-lg">
                에러 발생: {error}
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🛠️ 제조 라인 현황</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {
                    machines.map((machine) => (
                        <MachineCard key={machine.id} machine={machine} /> 
                    ))
                }
            </div>
        </div>
    );
};

export default DashboardContainer;