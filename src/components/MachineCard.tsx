import React, {useMemo} from 'react';
import type { MachineData } from '../models/MachineData'; 
import { useDashboard } from '../context/DashboardContext';

interface MachineCardProps {
    machine: MachineData;
}

const MachineCard: React.FC<MachineCardProps> = React.memo(({ machine }) => {
    
    const { state } = useDashboard();
    const temperatureThreshold = state.threshold.temperature;

    const isWarning = machine.temperature > temperatureThreshold;

    const riskScore = useMemo(() => {
        console.log(`[${machine.name}] 위험 지수 재계산 중...`); 
        
        let score = 0;
        const tempFactor = (machine.temperature / temperatureThreshold);
        score += tempFactor * 50; 
        score += machine.vibration * 200; 
        score -= machine.operatingRate * 10;
        
        return score.toFixed(2);
        
    // 이 3가지 값이 변해야만 위의 로직이 재실행됩니다.
    }, [machine.temperature, machine.vibration, machine.operatingRate, temperatureThreshold]);


    const cardClass = `
        p-5 rounded-xl shadow-lg transition-all duration-300 
        ${isWarning 
            ? 'bg-red-50 ring-4 ring-red-400' 
            : 'bg-white hover:shadow-xl'     
        }
    `;
    
    const statusColor = {
        'RUNNING': 'bg-green-500',
        'READY': 'bg-gray-500',
        'WARNING': 'bg-yellow-500',
        'ERROR': 'bg-red-500',
    }[machine.status] || 'bg-gray-300';


    return (
        <div className={cardClass}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{machine.name}</h3>
                <span className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${statusColor}`}>
                    {machine.status}
                </span>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">온도:</span>
                    <span className={`text-lg font-extrabold ${isWarning ? 'text-red-600 animate-pulse' : 'text-blue-600'}`}>
                        {machine.temperature.toFixed(1)}°C
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-600">가동률:</span>
                    <span className="text-gray-900 font-semibold">
                        {(machine.operatingRate * 100).toFixed(0)}%
                    </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                    <span className="font-medium text-gray-700">종합 위험 지수:</span>
                    <span className="text-xl font-extrabold text-purple-600">
                        {riskScore}
                    </span>
                </div>
                {/* Day 4에서 여기에 실시간 차트를 추가하게 됩니다. */}
            </div>
            
            {isWarning && (
                <p className="mt-3 text-red-500 font-bold">⚠️ 온도 임계치 초과! 확인 필요</p>
            )}
        </div>
    );
});



export default MachineCard;