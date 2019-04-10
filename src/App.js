import React, { useState } from 'react';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './AuthContext';

const App = () => {
  const [visibleCPageName, switchVisibleCPage] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);
  const switchPage = pageName => {
    switchVisibleCPage(pageName);
  };

  const login = () => {
    setAuthStatus(true);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ status: authStatus, login }}>
        <Header
          switchToTodo={switchPage.bind(this, 'todos')}
          switchToAuth={switchPage.bind(this, 'auth')}
        />
        <hr />
        {visibleCPageName === 'todos' ? <Todo /> : <Auth />}
      </AuthContext.Provider>
    </div>
  );
};

export default App;
