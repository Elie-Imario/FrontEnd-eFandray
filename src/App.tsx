import { useContext } from 'react';
import AuthPage from './pages/authPage';
import { AppContext } from './services/context';
import MainPanel from './layout/MainPanel';
import './plugins/font-plugin-kit';
import './plugins/fa-plugin-kit';
import './App.scss';

function App() {
  const { UserLogContext } = useContext(AppContext)
   
  return (
    
      <div className="App">
          {
            UserLogContext ? <MainPanel /> : <AuthPage />
          }
      </div>
  );
}

export default App;
