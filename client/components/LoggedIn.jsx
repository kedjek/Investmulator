import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoggedIn = (props) => {

  const apiUrl = 'http://localhost:3000/api/sp500';

  const [value, setValue] = useState(0);
  const [user, setUser] = useState(window.userData.username);
  const [buyingPower, setBP] = useState(window.userData.buyingpower);
  const [shares, setShares] = useState(Number(window.userData.holdings.SP500));

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
    axios
      .get('/api')
      .then((response) => {
        if (response.status === 200) {
          setBP(window.userData.buyingpower);
          setShares(Number(window.userData.holdings.SP500));
        } else {
          console.error('Server responded with an error:', response.statusText);
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, [buyingPower]); 


  const handlePutRequest = () => {
    const formData = {
      user: user,
      action: document.querySelector('.select').value,
      ticker: document.querySelector('.select1').value,
      quantity: document.querySelector('.buyandsellInput').value,
      cost: value
    };

    axios
      .put('/api/update', formData)
      .then((response) => {
        if (response.status === 200) {
          console.log('PUT request was successful.');
          // Redirect to the desired URL here if needed
        } else {
          console.error('Server responded with an error:', response.statusText);
        }
      })
      .catch((err) => {
        console.error('Error making PUT request:', err);
      });
  };

  const net = (shares * value + Number(buyingPower));
  const formattedNet = net.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2, 
  });
  const formattedBP = Number(buyingPower).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2, 
  });
  const formattedValue = Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2, 
  });


  return (
    <header>
      <h2>User: {user}<br/>
          Buying Power: {formattedBP}<br/>
          SP500 Stocks: {shares} at {formattedValue} per stock<br/><br/>
          Net Worth: {formattedNet}
      </h2>
      <form className='container'>
        <box>
          <div className='dropdown'>
            <select className='select'>
              <option className='options' value='buy'>Buy</option>
              <option className='options' value='sell'>Sell</option>
            </select>
            <div className='tickers'>Tickers</div>
            <div>
              <select className='select1'>
                <option value='SP500'>SP500</option>
              </select> @ {value}
            </div>
            <div className='quantity'>
              <input className='buyandsellInput' placeholder='# of stocks' type='number' min='0'></input>
              <label>Quantity</label>
            </div>
          </div>
          <button className='buyandsell' onClick={handlePutRequest}>Submit</button>
        </box>
      </form>
    </header>
  );
};


export default LoggedIn;