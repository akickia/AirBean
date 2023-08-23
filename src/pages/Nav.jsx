import { Link, useNavigate } from "react-router-dom";


export default function Nav() {
  const navigate = useNavigate()
  return (
    <article className="navigation">
      <button className="top-btn" onClick={() => {navigate(-1)}}>X</button>
      <nav>
        <ul>
          <Link to="/menu">Meny</Link>
          <Link to="/about">Vårt kaffe</Link>
          <Link to="/profile">Min profil</Link>
        </ul>
      </nav>
    </article>
  )
}
