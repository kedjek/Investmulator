import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import CombinedChartAndLoggedIn from './components/CombinedChartAndLoggedIn';
import '../node_modules/react-chartjs-2';

import './stylesheets/styles.css';

const App = props => {
  return (
    <div className='router'>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/api" element={<CombinedChartAndLoggedIn />} /> 
          <Route path="/api/createuser" element={<CreateUser />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;