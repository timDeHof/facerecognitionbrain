import React from "react"
import Tilt from "react-parallax-tilt"
import brain from "./brain.png"
import "./logo.styles.css"

const Logo = () => {
  return (
    <div className='mt0 mb2 center'>
      <Tilt className='Tilt br2 shadow-2' options={{ max: 55 }} style={{ height: 150, width: 150 }}>
        <div className='Tilt-inner pa3'>
          <img style={{ paddingTop: "5px" }} alt='brain logo' src={brain} />
        </div>
      </Tilt>
    </div>
  )
}

export default Logo
