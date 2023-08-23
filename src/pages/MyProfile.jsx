import { useEffect, useState, useContext } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import profile from "../assets/Profile.svg";
import Popup from "../Components/Popup";
import OrderHistory from "../Components/OrderHistory";
import { LoggedInContext } from "../App";



export default function MyProfile() {
  const [loggedIn] = useContext(LoggedInContext)
  const [showPopup, setShowPopup] = useState(loggedIn)
  const [username, setUsername] = useState("")
  const [usermail, setUsermail] = useState("")

  //Get info from local storage
  async function fetchInfo() {
    if (loggedIn) {
      setUsername(localStorage.getItem("username"))
      setUsermail(localStorage.getItem("usermail"))
    } else {
      setUsername("")
      setUsermail("")
    }
  }

  useEffect(() => {
    fetchInfo()
    setShowPopup(loggedIn)
  }, [loggedIn])


  return (
    <>
    <section className="profile-container">
      <Header />
        <article className="profile">
          <h1 style={{color: "white"}}>Min profil</h1>
          {showPopup ? 
          <section className="myprofile">
          <img src={profile}></img>
          <h2>{username}</h2>
          <p>{usermail}</p>
          <OrderHistory></OrderHistory>
          </section> : 
          <Popup state={false} close={() => {setShowPopup()}}/>}
        </article>
      <Footer />
      </section>
    </>
  )
}
