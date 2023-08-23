import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";


export default function Error() {
  const navigate = useNavigate()
  return (
    <>
    <Header />
    <article className="error">
      <h1>Nu blev något fel... </h1>
      <button onClick={() => navigate("/menu")}>Gå till meny</button>
    </article>
    <Footer />
    </>
  )
}
