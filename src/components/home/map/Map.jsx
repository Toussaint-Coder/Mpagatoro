import React, {useEffect, useRef, useState} from "react"
import "leaflet/dist/leaflet.css"
import Pump from "../../../assets/pump.svg"
import ProfileIc from "../../../assets/Profile.svg"
import location from "../../../assets/location.svg"
import Target from "../../../assets/target.svg"
import CarIco from "../../../assets/car.svg"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
} from "react-leaflet"
import L from "leaflet"
import {stations} from "../../stations/stations"
import Button from "../../ReUsable/Button"

const Map = ({handlerLocation, HandlerAddedLOcation}) => {
  const Mymap = useRef()
  const [endPoint, setEndPoint] = useState(handlerLocation)
  const polylinePositions = [handlerLocation, endPoint]

  useEffect(() => {
    if (HandlerAddedLOcation && Mymap.current) {
      // setting up the finders
      setEndPoint(HandlerAddedLOcation)
      Mymap.current.flyTo(HandlerAddedLOcation, 15)
    }
  }, [HandlerAddedLOcation, handlerLocation])

  //users icon
  const UserIcon = new L.Icon({
    iconUrl: CarIco,
    iconSize: [48, 48],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
  //stations Icon

  const stationIcon = new L.Icon({
    iconUrl: Pump,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })

  const ScrollToLocation = () => {
    if (Mymap.current) {
      Mymap.current.flyTo(handlerLocation, 15)
    }
  }
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"))
  return (
    <>
      <Button
        className="absolute bottom-4 right-4 z-30 text-white bg-zinc-700 px-4 py-2 flex items-center gap-2"
        onClick={ScrollToLocation}
      >
        <span>Find Me</span>
        <img src={Target} className="w-4" alt="icon" />
      </Button>
      <MapContainer
        center={handlerLocation}
        zoom={15}
        rotate={true}
        className="w-full h-full z-10 top-0 sticky bg-zinc-800"
        zoomControl={false}
        ref={Mymap}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* handler stations */}
        {stations.map((stations) => (
          <Marker
            position={stations.coords}
            icon={stationIcon}
            key={stations.coords.join(".").toString()}
          >
            <Popup>
              <div
                className="flex gap-1 items-center flex-col w-28 p-2"
                key={stations.coords.join(".").toString()}
              >
                <div className="flex gap-1">
                  <img src={Pump} className="w-5" alt="pumpIcon" />
                  <span className="text-sm">{stations.name}</span>
                </div>
                <span className="text-xs text-green-800 font-semibold">
                  {stations.status}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* handler my position */}

        {UserInfo && (
          <>
            {/* hendler the line */}

            <Polyline positions={polylinePositions} color="black" />
            <Marker position={handlerLocation} icon={UserIcon}>
              <Popup autoClose={false}>
                <div className="flex gap-1 items-center flex-col w-28 p-2">
                  <div className="flex gap-1 items-center">
                    <div className="w-14 h-14 rounded-full overflow-hidden border">
                      <img
                        src={UserInfo.UserProfileUrl}
                        alt="ProfileIcon"
                        className=""
                      />
                    </div>
                    <span className="text-sm">{UserInfo.userName}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={handlerLocation}
              radius={100}
              color="#2d3748"
              fillColor="#2d3748"
              fillOpacity={0.4}
            />
          </>
        )}
      </MapContainer>
    </>
  )
}
export default Map
