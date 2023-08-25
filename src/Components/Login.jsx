import { useState, useContext } from "react";
import { LoggedInContext } from "../App";

export default function Login({ sendOrder, close }) {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [errorMsg, setErrorMsg] = useState(false)
  const [textValue, setTextValue] = useState()
  const [pwValue, setPwValue] = useState()

  //Check login and collect user details
  const handleLogin = async (username, password) => {
    const response = await fetch('https://airbeanprojectbackend.onrender.com/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      const token = data.token
      localStorage.setItem("token", token)
      localStorage.setItem("userId", data.id)
      localStorage.setItem("username", data.username)
      localStorage.setItem("usermail", data.usermail)
      close(false)
      setLoggedIn(true)
      setErrorMsg(false)
      sendOrder()
    } else {
      const error = data.error; 
      localStorage.setItem("token", "")
      setErrorMsg(true)
    }
  };

  return (
    <>
      <section className="login popup">
        <button className="top-btn" onClick={() => {close(false)}}>X</button>
        <h1>Logga in</h1>
        <form>
          <input type="text" onKeyUp={(e) => {setTextValue(e.target.value)}}></input>
          <input type="password" onKeyUp={(e) => {setPwValue(e.target.value)}}></input>       
        </form>
        <button onClick={() => {handleLogin(textValue, pwValue)}}>Login</button>
        {errorMsg && <p>Tyvärr, fel användaruppgifter. Försök igen.</p>}
    </section>
    </>
  )
}
