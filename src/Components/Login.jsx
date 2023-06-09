import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
      const token = data.token; 
      console.log(data)
      localStorage.setItem("token", token)
      localStorage.setItem("userId", token.id)
      console.log(data.user)
      console.log(data.message)
      // navigate("/menu")
    } else {
      const error = data.error; 
      localStorage.setItem("token", "")
      console.log(error)
    }
  };

  // ----- PROBLEM ATT HITTA USER ID FRÅN TOKEN! 

  const [textValue, setTextValue] = useState()
  const [pwValue, setPwValue] = useState()
  function onSubmit() {
      handleLogin(textValue, pwValue)
  }
  return (
    <><form onSubmit={(e) => {onSubmit(e)}}>
      <input type="text" onKeyUp={(e) => {setTextValue(e.target.value)}}></input>
      <input type="password" onKeyUp={(e) => {setPwValue(e.target.value)}}></input>      
   
    </form>
    <button onClick={() => {onSubmit()}}>Login</button>
    </>
  )
}
