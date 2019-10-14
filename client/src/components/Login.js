import React from "react";
import axios from "axios";

const Login = (props) => {

  const login = () => {
    axios.post('http://localhost:5000/api/login', { username: 'Lambda School', password: 'i<3Lambd4' })
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubblepage');
        console.log("Success! res: ", res);
      })
      .catch(err => console.log("Error! err: ", err))
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <button onClick={login}>Login</button>
    </>
  );
};

export default Login;
