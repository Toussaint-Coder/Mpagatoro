import React, {useState} from "react"
import {Outlet} from "react-router-dom"
import MenuIco from "../../../assets/menu.svg"
import ProfileIco from "../../../assets/Profile.svg"
import Card from "../../ReUsable/Card"
import Button from "../../ReUsable/Button"
import Search from "./Search/Search"

const Menu = () => {
  const [isLogedIn, setIsLogedIn] = useState(false)
  const [query, setQuery] = useState(null)
  localStorage.setItem("isAuth", isLogedIn)

  return (
    <>
      <div className="absolute top-0 p-4 w-full z-30">
        <div className="flex justify-between items-baseline">
          <div>
            <Card>
              <button className="border-0 bg-none">
                <img src={MenuIco} alt="menuIcon" className="w-4" />
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
          {!isLogedIn && (
            <Card className={"flex-col"}>
              <div>
                <Button className="bg-zinc-800 text-white flex items-center gap-2">
                  <img
                    className="w-5 mr-2"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                  />
                  <span>Login With Google</span>
                </Button>
              </div>
            </Card>
          )}

          {isLogedIn && (
            <Card>
              <div className="text-white text-sm">Toussaint</div>
              <div>
                <img src={ProfileIco} alt="ProfileIcon" className="w-5" />
              </div>
            </Card>
          )}
        </div>
      </div>
      <Outlet />
    </>
  )
}
export default Menu
