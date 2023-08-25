import React, { useContext, useState } from 'react'
import logo from "../assets/logo.svg"
import { useNavigate } from 'react-router-dom'
import { LoggedInContext } from '../App'


export default function SignUp({ close, sendOrder }) {
  const navigate = useNavigate()
  const [newUsername, setNewUsername] = useState()
  const [newUserMail, setNewUserMail] = useState()
  const [newUserPW, setNewUserPW] = useState()
  const [newUserAdress, setNewUserAdress] = useState()
  const [newUserZIP, setNewUserZIP] = useState()
  const [newUserCity, setNewUserCity] = useState()
  const [showPopup, setShowPopup] = useState(false)
  const [pw1, setPw1] = useState()
  const [errorMsg, setErrorMsg] = useState(false)
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext)


  function checkPW(pw2) {
    if (pw1 === pw2) {
      if (pw2.length > 5) {
        setNewUserPW(pw1)
      }
  }}

  async function createUser() { 
    const newUser = {
      username: newUsername,
      email: newUserMail,
      password: newUserPW,
      adress: 
        {streetname: newUserAdress,
        zipcode: newUserZIP,
        city: newUserCity}
    }
    const response = await fetch("https://airbeanprojectbackend.onrender.com/api/user/signup", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  const data = await response.json();
  if (data.success) {
    handleLogin(newUsername, newUserPW)
  } else {
    setErrorMsg(true)
    console.error(data.error)
  }
  setShowPopup(false)
}

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
    setLoggedIn(true)
    sendOrder()
  } else {
    localStorage.setItem("token", "")
    setErrorMsg(true)
  }
};


  return (
    <>
      <article className='signup popup'>
      <button className="top-btn" onClick={() => {close(false)}}>X</button>
        <p className='disclamer'><b>OBS! Detta är enbart ett projekt för mina studier, ej ett riktigt företag. Använd inte dina personuppgifter utan skapa endast ett fiktivt konto. Inga ordrar skickas och ingenting skickas till mailen du anger, den behöver alltså inte finnas. Jag tar ej ansvar för att personuppgifter sparas korrekt!</b></p>
        <div className='circle'><img src={logo}></img></div>
        <h1>Välkommen till AirBean-familjen!</h1>
        <p>Genom att skapa ett konto nedan kan du spara och se din orderhistorik.</p>
        <form>
          <label>Namn</label>
          <input type='text' placeholder='Sixten Kaffelöver' onKeyUp={(e) => {setNewUsername(e.target.value)}}></input>
          <label>Epost</label>
          <input type="email" placeholder='sixten.kaffelover@zocom.se' onKeyUp={(e) => {setNewUserMail(e.target.value)}}></input>
          <div>
            <input type='radio'></input>
            <label>GDPR OK!</label>
          </div>
        </form>
        {errorMsg && <p style={{color: "red"}}>Något blev fel, se till att du fyller i alla fält korrekt och försök igen.</p>}
        <button className='signup-btn' onClick={() => {setShowPopup(true)}}>Brew me a cup!</button>
        {showPopup && <section className='popup'>
        <button className="top-btn" onClick={() => {setShowPopup(false)}}>X</button>
          <p>Ange din adress och skapa ett lösenord med minst 6 tecken för att slutföra registreringen.</p>
          <form>
          <label>Gatuadress</label>
          <input type='text' onKeyUp={(e) => {setNewUserAdress(e.target.value)}}></input>
          <label>Postnummer</label>
          <input type='number' onKeyUp={(e) => {setNewUserZIP(e.target.value)}}></input>
          <label>Stad</label>
          <input type='text' onKeyUp={(e) => {setNewUserCity(e.target.value)}}></input>
          <label>Lösenord</label>
          <input type='password' onKeyUp={(e) => {setPw1(e.target.value)}}></input>
          <label>Upprepa lösenord igen</label>
          <input type='password' onKeyUp={(e) => {checkPW(e.target.value)}}></input>
          </form>
          <button className='signup-btn' onClick={() => {createUser()}}>Klar! </button>
        </section>}

      </article>
     </>
  )
}
