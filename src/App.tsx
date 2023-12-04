import { useContext, useEffect } from 'react';
import AuthPage from './pages/authPage';
import './plugins/font-plugin-kit';
import './plugins/fa-plugin-kit';
import './App.scss';
import MainPanel from './pages/mainPanel';
import { AppContext } from './services/context';

function App() {
  const { UserLogContext } = useContext(AppContext)

  console.log("UserLogContext", UserLogContext)

  useEffect(()=>{
    if(UserLogContext?.userId) {
      sessionStorage.setItem('connectedUser', JSON.stringify(UserLogContext))
    }
  },[UserLogContext])

  return (
      <div className="App">
          {
            UserLogContext ? <MainPanel /> : <AuthPage />
          }
      </div>
  );
}

export default App;
