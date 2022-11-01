import React from "react"
import "./faceRecognition.styles.css"

const FaceRecognition = ({ imageUrl, box }) => {
  let bounding_box_html = Object.values(box).map((value, id) => {
    const { leftCol, topRow, rightCol, bottomRow } = value
    return (
      <div
        key={id}
        className='bounding-box'
        style={{
          top: topRow,
          right: rightCol,
          bottom: bottomRow,
          left: leftCol,
        }}></div>
    )
  })
  console.log(bounding_box_html)
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />
        {bounding_box_html}
      </div>
    </div>
  )
}

export default FaceRecognition
