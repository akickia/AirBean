import { useContext } from 'react'
import { LoggedInContext } from '../App'

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext)
  
  function handleLogout() {
    setIsLoggedIn(false)
    localStorage.setItem("token", "")
    localStorage.setItem("userId", "")
    localStorage.setItem("username", "")
    localStorage.setItem("usermail", "")
    window.location.reload(false)
  }

  
  return (
    <footer className='btns-container'>
      <section className='footer'>
      {isLoggedIn && <button className='logout' onClick={() => {handleLogout()}}>Logga ut mig</button>}
      <section className='info'><p>Ej faktisk funktionalitet. Gjord av <a href="https://www.akickia.se" target='_blank'>akickia</a> som testprojekt. Layout credit till Zocom utbildning via Folkuniversitetet.</p></section>
      </section>
    </footer>
  )
}
