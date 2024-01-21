import React, {useState} from "react"
import {Outlet, json, useNavigate} from "react-router-dom"
import MenuIco from "../../../assets/search.svg"
import ProfileIco from "../../../assets/profile.svg"
import Card from "../../ReUsable/Card"
import Button from "../../ReUsable/Button"
import Search from "./Search/Search"
import firebase from "firebase/compat/app"
import "firebase/compat/database"
import {firebaseConfig} from "../../Auth/firebase.config"
import {provider, auth} from "../../Auth/firebase.config"
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"

const Menu = () => {
  const [isLogedIn, setIsLogedIn] = useState(false)
  const [query, setQuery] = useState(null)
  localStorage.setItem("isAuth", isLogedIn)
  const Navigate = useNavigate()
  const [profileCard, setProfileCard] = useState(false)

  const handlerLoginWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        if (response.user) {
          const AuthData = response.user
          const ProfileData = {
            userName: AuthData.displayName.split(" ")[0],
            email: AuthData.email,
            UserProfileUrl: AuthData.photoURL,
            UserStatus: 1,
          }
          localStorage.setItem("UserInfo", JSON.stringify(ProfileData))
          Navigate("/")
        }
      })
      .catch((e) => console.log(e))
  }
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"))

  const HandlerLogOut = () => {
    localStorage.removeItem("UserInfo")
    Navigate("/")
  }
  const HandlerProfileCard = () => {
    switch (profileCard) {
      case false:
        setProfileCard(true)
        break
      case true:
        setProfileCard(false)
        break
    }
  }
  return (
    <>
      <div className="absolute top-0 p-4 w-full z-30">
        <div className="flex justify-between">
          <div>
            <Card>
              <button className="border-0 bg-none">
                <img src={MenuIco} alt="menuIcon" className="w-4 opacity-50" />
              </button>
              <div className="">
                <input
                  type="text"
                  placeholder="enter a station..."
                  className="rounded-full px-1 py-1 text-white outline-none border-white bg-transparent text-sm"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </Card>
            <Search SearchHandler={query} />
          </div>
          {!UserInfo && (
            <Card className={"flex-col"}>
              <div>
                <Button
                  className="bg-zinc-800 text-white flex items-center gap-1"
                  onClick={handlerLoginWithGoogle}
                >
                  <img
                    className="w-5"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                  />
                  <span>Login</span>
                </Button>
              </div>
            </Card>
          )}

          {UserInfo
            ? UserInfo.UserStatus && (
                <div className="flex flex-col justify-end gap-2 items-end relative">
                  <div className="w-12 cursor-pointer h-12 rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-800 ">
                    <img
                      src={ProfileIco}
                      alt="ProfileIcon"
                      onClick={HandlerProfileCard}
                    />
                  </div>

                  <div
                    className={`absolute top-14 flex-col justify-center items-center bg-zinc-800 p-3 rounded-lg border-2 border-white/10 duration-300 gap-3 flex transform ${
                      profileCard
                        ? "flex visible opacity-100"
                        : "opacity-0 invisible"
                    }`}
                  >
                    <Card className="shadow-none">
                      {" "}
                      <div className="w-14 h-14 rounded-full overflow-hidden border">
                        <img
                          src={UserInfo.UserProfileUrl}
                          alt="ProfileIcon"
                          className=""
                        />
                      </div>
                      <div className="text-white text-bqse space-y-2">
                        <div>{UserInfo.userName}</div>
                        <div>
                          <Button onClick={HandlerLogOut}>Log out</Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )
            : ""}
        </div>
      </div>
      <Outlet />
    </>
  )
}
export default Menu
