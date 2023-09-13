import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import LoggedIn from './components/LoggedIn';

import './stylesheets/styles.css';

const App = props => {
  return (
    <div className='router'>
      <main>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/api" element={<LoggedIn/>}/>
          <Route path="/api/createuser" element={<CreateUser/>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;