import React from 'react';

const LoggedIn = (props) => {
  return (
    <header>
      <h2>User: {window.userData.username}<br/>Buying Power: {window.userData.buyingpower}</h2>
    </header>
  );
};

export default LoggedIn;