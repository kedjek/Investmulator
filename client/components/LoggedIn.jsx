import React from 'react';

const LoggedIn = (props) => {
  console.log(props.username);
  return (
    <header>
      <h2>I&apos;m Logged In!</h2>
    </header>
  );
};

export default LoggedIn;