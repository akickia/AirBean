import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Login() {
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
      navigate(-1)
 
    } else {
      const error = data.error; 
      localStorage.setItem("token", "")
      console.log(error)
    }
  };


  const [textValue, setTextValue] = useState()
  const [pwValue, setPwValue] = useState()
  function onSubmit() {
      handleLogin(textValue, pwValue)
  }
  return (
    <>
    <Header></Header>
    <article className="login">
      <h1>Login</h1>
      <form onSubmit={(e) => {onSubmit(e)}}>
        <input type="text" onKeyUp={(e) => {setTextValue(e.target.value)}}></input>
        <input type="password" onKeyUp={(e) => {setPwValue(e.target.value)}}></input>       
      </form>
      <button onClick={() => {onSubmit()}}>Login</button>
      <h2>Or send order as guest:</h2>
      <button onClick={() => {navigate("/order/guest")}}>Guest order</button>
    </article>
    <Footer />
    </>
  )
}
