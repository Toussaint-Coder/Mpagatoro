import React from "react"
import spinnerIco from "../../assets/error.svg"
import Button from "../ReUsable/Button"

const Error = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="flex items-center gap-1">
        <img src={spinnerIco} alt="errIco" className="w-4" />
        <p className="text-sm text-red-600">check your internet</p>
      </div>
      <Button>retry</Button>
    </div>
  )
}
export default Error
