import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoggedIn = (props) => {

  const apiUrl = 'http://localhost:3000/api/sp500';

  const [value, setValue] = useState(0);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          const obsValues = response.data.observations.map((obs) => obs.value);
          setValue(obsValues[obsValues.length - 1]);
        } else {
          console.error('Server responded with an error:', response.statusText);
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []); // Empty dependency array means this effect will run once on component mount

  const user = window.userData.username;
  const buyingPower = window.userData.buyingpower;
  const SP500 = window.userData.holdings.SP500;

  return (
    <header>
      <h2>User: {user}<br/>
          Buying Power: {buyingPower}<br/>
          SP500 Stocks: {SP500} at {value} per stock<br/><br/>
          Net Worth: {buyingPower + (SP500 * value)}
      </h2>
    </header>
  );
};

export default LoggedIn;