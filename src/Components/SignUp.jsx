import React from 'react'
import logo from "../assets/logo.svg"
import { useNavigate } from 'react-router-dom'


export default function SignUp({ close }) {
  const navigate = useNavigate()
  return (
    <>
      <article className='signup popup'>
      <button className="top-btn" onClick={() => {close(false)}}>X</button>
        <div className='circle'><img src={logo}></img></div>
        <h1>Välkommen till AirBean-familjen!</h1>
        <p>Genom att skapa ett konto nedan kan du spara och se din orderhistorik.</p>
        <form>
          <label>Namn</label>
          <input type='text' placeholder='Sixten Kaffelöver'></input>
          <label>Epost</label>
          <input type="email" placeholder='sixten.kaffelover@zocom.se'></input>
          <div>
            <input type='radio'></input>
            <label>GDPR OK!</label>
          </div>
        </form>
        <button className='signup-btn'>Brew me a cup!</button>
      </article>
    </>
  )
}
