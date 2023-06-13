import { useNavigate } from "react-router-dom"
import menuBtn from "../assets/menu.jpg"

export default function Header() {
  const navigate = useNavigate()
  return (
    <header className="btns-container">
    <button className="top-btn" onClick={() => {navigate("/nav")}}><img src={menuBtn} /></button>
 </header>
  )
}
