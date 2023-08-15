import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../App";

export default function Login({ action, close }) {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [errorMsg, setErrorMsg] = useState(false)
  const navigate = useNavigate()
  const handleLogin = async (username, password) => {
    const response = await fetch('http://localhost:8000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      const token = data.token
      console.log(data.message)
      localStorage.setItem("token", token)
      localStorage.setItem("userId", data.id)
      localStorage.setItem("username", data.username)
      localStorage.setItem("usermail", data.usermail)
      setLoggedIn(true)
      setErrorMsg(false)
      action
    } else {
      const error = data.error; 
      localStorage.setItem("token", "")
      console.log(error)
      setErrorMsg(true)
    }
  };


  const [textValue, setTextValue] = useState()
  const [pwValue, setPwValue] = useState()
  function onSubmit() {
      handleLogin(textValue, pwValue)
      close(false)
  }
  return (
    <>
      <section className="login popup">
      <button className="top-btn" onClick={() => {close(false)}}>X</button>
        <h1>Logga in</h1>
        <form onSubmit={(e) => {onSubmit(e)}}>
          <input type="text" onKeyUp={(e) => {setTextValue(e.target.value)}}></input>
          <input type="password" onKeyUp={(e) => {setPwValue(e.target.value)}}></input>       
        </form>
        <button onClick={() => {onSubmit()}}>Login</button>
        {errorMsg && <p>Tyvärr, fel användaruppgifter. Försök igen.</p>}
    </section>

    </>
  )
}
