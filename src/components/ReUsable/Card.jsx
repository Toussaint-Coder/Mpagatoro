import React from "react"

const Card = ({children, className}) => {
  return (
    <>
      <div
        className={`flex items-center gap-2 p-2 bg-zinc-800 rounded-full shadow-md ${
          className || ""
        }`}
      >
        {children}
      </div>
    </>
  )
}
export default Card
