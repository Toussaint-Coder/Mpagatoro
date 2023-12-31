import React from "react"
import spinnerIco from "../../assets/spinner.svg"

const Loading = () => {
  return (
    <div className="flex items-center gap-1">
      <img src={spinnerIco} alt="errIco" className="w-4" />
      <p className="text-sm text-white">Loading...</p>
    </div>
  )
}
export default Loading
