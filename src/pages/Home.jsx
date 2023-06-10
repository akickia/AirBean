import { useEffect } from "react"
import logo from "../assets/logo.svg"
import logo2 from "../assets/logo-text.svg"
import { useNavigate } from "react-router-dom"

export default function Home() {

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/menu')
    }, 5000)
    return () => clearTimeout(timer)
  }, [])


  return (
    <article className="start">
      <img src={logo}/>
      <img src={logo2}/>
    </article>
  )
}
