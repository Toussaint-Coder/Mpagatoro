import React, {useReducer, useState} from "react"
import Card from "../ReUsable/Card"
import Pump from "../../assets/pump.svg"
import CarIco from "../../assets/car.svg"
import Arrow from "../../assets/arrow.svg"
import Button from "../ReUsable/Button"
import {stations} from "../stations/stations.js"

const Active = ({handlerStationLocation}) => {
  const [isClaused, setIsClaused] = useReducer((state) => {
    if (state === true) {
      return false
    } else {
      return true
    }
  }, false)
  const getPositionCoords = (stationCoodrs) => {
    handlerStationLocation(stationCoodrs)
  }

  return (
    <Card
      className={`flex-col ${
        isClaused ? "max-h-12" : "max-h-80"
      } duration-300 max-w-xs w-full h-full absolute bottom-4 p-3 left-4 bg-red-500 z-20 rounded-lg justify-start items-start shadow overflow-hidden`}
    >
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="text-white">opened Stations</p>
        </div>
        <div>
          <Button className="bg-zinc-700" onClick={setIsClaused}>
            <img src={Arrow} alt="icon" className="w-4" />
          </Button>
        </div>
      </div>
      <div className="h-full w-full space-y-4 overflow-auto scroll-sm thumb-sm">
        {stations.map((station) => (
          <div
            className="w-full flex justify-between items-center overflow-auto shadow-lg p-2 rounded-lg"
            key={station.coords.join(".").toString()}
          >
            <div className="flex gap-1">
              <img src={Pump} alt="pumpIco" className="w-8" />
              <div>
                <p className="text-sm text-white">{station.name}</p>
                <p className="text-xs text-white/50">
                  from : {station.time.join(":")}
                </p>
              </div>
            </div>
            <div>
              <Button
                className="bg-green-800 flex items-center gap-2"
                onClick={() => {
                  getPositionCoords(station.coords)
                }}
              >
                <img src={CarIco} alt="pumpIco" className="w-5" />
                <span>start</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
export default Active
