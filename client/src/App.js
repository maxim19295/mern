import React from 'react';
import 'materialize-css';
import {useRoutes} from './routes';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';
function App() {
  const {token, userId, login, logout, ready} = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);
  if(!ready){
    return <Loader/>
  }
  return (
    <AuthContext.Provider value={{token, login, logout, userId, isAuth}}>
  <BrowserRouter>
  {isAuth && <Navbar/>}
    <div className='container'>
      {routes}
    </div>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
