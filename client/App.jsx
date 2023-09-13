import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';

import './stylesheets/styles.css';

const App = props => {
  return (
    <div className='router'>
      <main>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/api/createuser" element={<CreateUser/>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;