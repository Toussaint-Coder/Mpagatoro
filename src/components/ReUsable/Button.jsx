import React from "react"

const Button = ({children, className, onClick}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} px-3 py-1 bg-white text-black rounded-full text-sm`}
    >
      {children}
    </button>
  )
}
export default Button
