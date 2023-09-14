import React from 'react';

const CreateUser = (props) => {

  return (
    <header>
      <h1>Sign Up</h1>
      <form action='/api/createuser' method='POST' autoComplete='off'>
        <label>Username: </label>
        <input id='usernameInput' name='username' placeholder='Username' required></input>
        <label>Password: </label>
        <input id='passwordInput' type='password' name='password' placeholder='Password' required></input>      
        <br/>
        <button>Submit</button>
      </form> 
    </header>
  );
};

export default CreateUser;