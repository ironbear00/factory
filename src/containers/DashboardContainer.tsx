import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import MachineCard from '../components/MachineCard';

const DashboardContainer: React.FC = () => {
    const { state } = useDashboard(); 
    const { machines, isLoading, error } = state;

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-50 p-8">
                <div className="p-10 bg-white border-2 border-red-500 rounded-xl shadow-2xl text-center">
                    <h2 className="text-3xl font-extrabold text-red-600 mb-4">
                        ⚠️ 시스템 오류 발생
                    </h2>
                    <p className="text-gray-700 mb-6">
                        초기 데이터를 불러오는 데 실패했습니다. 서버 상태를 확인하거나 새로고침 해주세요.
                    </p>
                    <p className="text-sm font-mono text-gray-500 bg-gray-100 p-2 rounded">
                        오류 코드: **{error}** </p>
                </div>
            </div>
        );
    }

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

    // return (
    //     <div className="p-6 bg-gray-100 min-h-screen">
    //         <h2 className="text-3xl font-bold text-gray-800 mb-6">🛠️ 제조 라인 현황</h2>
            
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    //             {
    //                 machines.map((machine) => (
    //                     <MachineCard key={machine.id} machine={machine} /> 
    //                 ))
    //             }
    //         </div>
    //     </div>
    // );
    return (
        <div className="min-h-screen bg-gray-50 p-8">
          {/* 헤더 섹션 */}
          <header className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">공정 실시간 모니터링</h1>
              <p className="text-gray-500 mt-2">전체 {machines.length}개의 장비가 연결되어 있습니다.</p>
            </div>
            <div className="text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full animate-pulse">
              ● Live 데이터 수신 중
            </div>
          </header>
      
          {/* 💡 카드 그리드 레이아웃: 반응형 설정 (모바일 1열, 태블릿 2열, PC 3~4열) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {machines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        </div>
      );
};

export default DashboardContainer;