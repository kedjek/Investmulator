import React from 'react';
import SP500Chart from './Chart'; // Update the import path if needed
import LoggedIn from './LoggedIn';   // Update the import path if needed

const CombinedChartAndLoggedIn = () => {
  return (
    <div>
      <LoggedIn />
      <SP500Chart />
    </div>
  );
};

export default CombinedChartAndLoggedIn;