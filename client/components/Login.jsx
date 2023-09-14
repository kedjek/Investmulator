import React from 'react';

const Login = (props) => {
  return (
    <form action='/api' method='POST' autoComplete='off'>
      <label>Username: </label>
      <input id='usernameInput' name='username' placeholder='Username' required></input>
      <label>Password: </label>
      <input id='passwordInput' type='password' name='password' placeholder='Password' required></input>      
      <br/>
      <a href='/api/createuser'>Create User</a>
      <button>Submit</button>
    </form> 
  );
};

export default Login;