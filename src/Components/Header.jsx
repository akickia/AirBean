import { useNavigate } from "react-router-dom"
import menuBtn from "../assets/menu.jpg"
import { useState } from "react"

export default function Header() {
  const navigate = useNavigate()
  const [showDisclamer, setShowDisclamer] = useState(true)
  return (
    <header className="btns-container">
    <button className="top-btn" onClick={() => {navigate("/nav")}}><img src={menuBtn} /></button>
    <div className='disclamer'><p><b>VIKTIG INFO!</b></p>
    
    {showDisclamer ? <div><p>Detta är enbart ett projekt för mina studier, ej ett riktigt företag. Använd inte dina personuppgifter. Skapa gärna ett fiktivt konto för att testa sidan. Inga ordrar skickas och ingenting skickas till mailen du anger, den behöver alltså inte finnas. Jag tar ej ansvar för att personuppgifter sparas korrekt!</p><button onClick={() => setShowDisclamer(false)}>Dölj</button></div> : <button onClick={() => setShowDisclamer(true)}>Visa</button>}
    </div>
    <div></div>
 </header>
  )
}
