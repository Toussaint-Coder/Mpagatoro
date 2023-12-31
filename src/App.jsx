import React from "react"
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/home/Home"
import Active from "./components/active/Active"
import Map from "./components/home/map/Map"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Map />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
