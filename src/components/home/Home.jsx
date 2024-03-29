import React, {useEffect, useReducer, useState} from "react"
import Map from "./map/Map"
import {Outlet} from "react-router-dom"
import Menu from "./menu/Menu"
import Loading from "../states/Loading"
import Error from "../states/Error"
import Active from "../active/Active"

const Home = () => {
  const [Location, setLocation] = useState({
    Lat: null,
    Long: null,
  })
  const [state, setState] = useState(null)
  const [addedLocation, setAddedLocation] = useState(null)
  const [OpenMenuHandler, setOpenMenuHandler] = useState()

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (e) => {
          if (e.coords.latitude && e.coords.longitude) {
            setLocation({
              Lat: e.coords.latitude,
              Long: e.coords.longitude,
            })
            setState("fetched")
          }
        },
        (e) => {
          setState("error")
        }
      )
    }
    getLocation()

    return () => {}
  }, [])
  const handlerLocation = [Location.Lat, Location.Long]

  const getCoords = (stationCoords) => {
    setAddedLocation(stationCoords)
    console.log(isClaused)
  }
  //menu animation

  const [isClaused, setIsClaused] = useReducer((state) => {
    if (state === true) {
      return false
    } else {
      return true
    }
  }, true)
  const handlerActive = () => {
    setIsClaused()
    console.log(isClaused)
  }
  return (
    <>
      <Menu handlerOpenMenu={handlerActive} />
      <div className="w-full h-screen overflow-hidden bg-zinc-800 flex items-center justify-center relative">
        {state === "error" && <Error />}
        {state === null && <Loading />}
        {state === "fetched" && (
          <Map
            handlerLocation={handlerLocation}
            HandlerAddedLOcation={addedLocation}
          />
        )}
        <Active
          handlerStationLocation={getCoords}
          HandlerClosed={handlerActive}
          className={`flex-col ${isClaused ? "-left-[22rem]" : "left-0"}`}
        />
      </div>
      <Outlet />
    </>
  )
}
export default Home
