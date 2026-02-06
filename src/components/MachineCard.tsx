import React, {useMemo} from 'react';
import type { MachineData } from '../models/MachineData'; 
import { useDashboard } from '../context/DashboardContext';

interface MachineCardProps {
    machine: MachineData;
}

const MachineCard: React.FC<MachineCardProps> = React.memo(({ machine }) => {
    
    // const { state } = useDashboard();
    // const temperatureThreshold = state.threshold.temperature;
    const { temperatureThreshold } = useDashboard();

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
    }, [machine.temperature, 
        machine.vibration, 
        machine.operatingRate, 
        temperatureThreshold]);


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
            {/* 1. 상단: 이름 및 ID (ID 추가로 공학적 느낌 부여) */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">{machine.name}</h3>
                    <span className="text-[10px] text-gray-400 font-mono tracking-tighter">{machine.id}</span>
                </div>
                <span className={`px-2.5 py-0.5 text-[11px] font-black text-white rounded uppercase shadow-sm ${statusColor}`}>
                    {machine.status}
                </span>
            </div>

            {/* 2. 중앙: 주요 수치 그리드 배치 (더 카드답게 보임) */}
            <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <p className="text-[10px] text-gray-500 mb-0.5 uppercase font-semibold">Temperature</p>
                    <p className={`text-lg font-black ${isWarning ? 'text-red-600 animate-pulse' : 'text-blue-600'}`}>
                        {machine.temperature.toFixed(1)}°C
                    </p>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <p className="text-[10px] text-gray-500 mb-0.5 uppercase font-semibold">Vibration</p>
                    <p className="text-lg font-black text-gray-800">{machine.vibration.toFixed(2)}g</p>
                </div>
            </div>

            {/* 3. 하단: 가동률 프로그레스 바 (시각적 만족도 상승) */}
            <div className="mb-5">
                <div className="flex justify-between items-center text-[11px] mb-1.5 px-1">
                    <span className="font-bold text-gray-500">OPERATING RATE</span>
                    <span className="font-black text-blue-700">{(machine.operatingRate * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div 
                        className="bg-blue-500 h-full rounded-full transition-all duration-700 ease-out" 
                        style={{ width: `${machine.operatingRate * 100}%` }}
                    />
                </div>
            </div>

            {/* 4. 푸터: 위험 지수 섹션 */}
            <div className="pt-3 border-t border-dashed border-gray-200 flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-400">Risk Score</span>
                <span className="text-xl font-black text-purple-600 tracking-tight">
                    {riskScore}
                </span>
            </div>
            
            {/* 경고 알림 박스 */}
            {isWarning && (
                <div className="mt-3 p-2 bg-red-500 rounded-lg text-white text-[11px] font-bold flex items-center justify-center gap-1 animate-bounce">
                    ⚠️ CRITICAL TEMPERATURE
                </div>
            )}
        </div>
    );
});



export default MachineCard;