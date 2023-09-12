import React from 'react';

const Login = (props) => {
  return (
    <form method='POST'>
      <label>Username: </label>
      <input id='usernameInput' placeholder='Username' required></input>
      <label>Password: </label>
      <input id='passwordInput' placeholder='Password' required></input>      
      <br/>
      <a href='/createuser'>Create User</a>
      <button>Submit</button>
    </form> 
  );
};

export default Login;