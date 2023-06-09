import { Link, useNavigate } from "react-router-dom";


export default function Nav() {
  const navigate = useNavigate()
  return (
    <article className="navigation">
      <button className="top-btn" onClick={() => {navigate("/menu")}}>X</button>
      <nav>
        <ul>
          <Link to="/menu">Meny</Link>
          <Link to="/about">Vårt kaffe</Link>
          <Link to="/login">Min profil</Link>
          <Link to="/user/orderhistory">Orderstatus</Link>
        </ul>
      </nav>
    </article>
  )
}
