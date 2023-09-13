import React from 'react';

const CreateUser = (props) => {

  return (
    <header>
      <h2>Sign Up</h2>
      <form action='/api/createuser' method='POST'>
        <label>Username: </label>
        <input id='usernameInput' name='username' placeholder='Username' required></input>
        <label>Password: </label>
        <input id='passwordInput' name='password' placeholder='Password' required></input>      
        <br/>
        <button>Submit</button>
      </form> 
    </header>
  );
};

export default CreateUser;