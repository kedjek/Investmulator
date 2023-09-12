import React from 'react';
import './stylesheets/styles.css';
import Login from './components/Login';

const App = props => {
  return (
    <div className='router'>
      <div id = 'CreateUser'>
        <Login />
      </div> 
    </div>
  );
};

export default App;