import { useContext } from 'react';
import AuthPage from './pages/authPage';
import './plugins/font-plugin-kit';
import './plugins/fa-plugin-kit';
import './App.scss';
import MainPanel from './pages/mainPanel';
import { AppContext } from './services/context';

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
