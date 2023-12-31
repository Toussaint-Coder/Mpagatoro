import React, {useEffect, useState} from "react"
import Card from "../../../ReUsable/Card"
import {stations} from "../../../stations/stations"
import Pump from "../../../../assets/pump.svg"
import CarIco from "../../../../assets/car.svg"
import Button from "../../../ReUsable/Button"

const Search = ({SearchHandler}) => {
  const [query, setQuery] = useState(null)
  useEffect(() => {
    let Result = []
    stations.forEach((station) => {
      if (
        station.name.toLowerCase().indexOf(SearchHandler.toLowerCase()) > -1
      ) {
        Result.push(station)
        setQuery(Result)
      }
    })
  }, [SearchHandler])
  return (
    <Card className="flex-col max-h-80 max-w-xs w-full mt-2 absolute rounded-lg">
      <div className="w-full">
        <p className="text-white">Results for "Stations"</p>
      </div>
      <div className="overflow-auto w-full scroll-sm thumb-sm">
        {stations.map((station) => (
          <div
            className="w-full flex justify-between items-center shadow-lg p-2 rounded-lg"
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
export default Search
