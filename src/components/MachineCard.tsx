import React from 'react';
import type { MachineData } from '../models/MachineData'; 
import { useDashboard } from '../context/DashboardContext';

interface MachineCardProps {
    machine: MachineData;
}

const MachineCard: React.FC<MachineCardProps> = React.memo(({ machine }) => {
    // 1. useDashboard에서 경고 임계치(Threshold)를 가져옵니다.
    const { state } = useDashboard();
    const temperatureThreshold = state.threshold.temperature;

    // 2. 경고 로직: 온도가 임계치를 초과했는지 확인합니다.
    const isWarning = machine.temperature > temperatureThreshold;

    // 3. 동적 Tailwind 클래스 결정 (경고 시 UI 색상 변경)
    const cardClass = `
        p-5 rounded-xl shadow-lg transition-all duration-300 
        ${isWarning 
            ? 'bg-red-50 ring-4 ring-red-400' // 경고 발생 시 붉은색 강조
            : 'bg-white hover:shadow-xl'       // 정상 시 흰색
        }
    `;
    
    // 4. 상태 뱃지 색상 결정
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
                {/* Day 4에서 여기에 실시간 차트를 추가하게 됩니다. */}
            </div>
            
            {isWarning && (
                <p className="mt-3 text-red-500 font-bold">⚠️ 온도 임계치 초과! 확인 필요</p>
            )}
        </div>
    );
});

export default MachineCard;