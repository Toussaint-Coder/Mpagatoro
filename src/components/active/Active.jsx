import React, {useReducer, useState} from "react"
import Card from "../ReUsable/Card"
import Pump from "../../assets/pump.svg"
import CarIco from "../../assets/car.svg"
import Arrow from "../../assets/close-circle.svg"
import Button from "../ReUsable/Button"
import {stations} from "../stations/stations.js"

const Active = ({handlerStationLocation, HandlerClosed, className}) => {
  const getPositionCoords = (stationCoodrs) => {
    handlerStationLocation(stationCoodrs)
  }

  return (
    <Card
      className={`flex-col duration-300 max-w-xs w-full h-full absolute bottom-4 p-3 z-30   top-0 bg-red-500 rounded-none justify-start items-start shadow overflow-hidden ${className}`}
    >
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="text-white">opened Stations</p>
        </div>
        <div>
          <img
            src={Arrow}
            alt="icon"
            className="w-8 cursor-pointer"
            onClick={HandlerClosed}
          />
        </div>
      </div>
      <div className="h-full w-full space-y-4 overflow-auto scroll-sm thumb-sm">
        {stations.map(
          (station) =>
            station.status === "Active" && (
              <div
                className="w-full flex justify-between items-center overflow-auto border border-white/10 p-2 rounded-lg"
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
            )
        )}
      </div>
    </Card>
  )
}
export default Active
