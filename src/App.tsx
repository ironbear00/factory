import './App.css'
import { DashboardProvider } from './context/DashboardContext';
import DashboardContainer from './containers/DashboardContainer';

function App() {
  
  return (
      <DashboardProvider>
        <DashboardContainer />
      </DashboardProvider>
  );
}

export default App
