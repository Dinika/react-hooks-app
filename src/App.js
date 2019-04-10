import React, { useState } from 'react';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';

const App = () => {
  const [visibleCPageName, switchVisibleCPage] = useState('auth');

  const switchPage = pageName => {
    switchVisibleCPage(pageName);
  };

  return (
    <div className="App">
      <Header
        switchToTodo={switchPage.bind(this, 'todos')}
        switchToAuth={switchPage.bind(this, 'auth')}
      />
      <hr />
      {visibleCPageName === 'todos' ? <Todo /> : <Auth />}
    </div>
  );
};

export default App;
