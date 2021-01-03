import React from 'react'
import './FaceRegocnition.css'

const FaceRecognition = ({ imageURL, box }) => {
    return(
        <div className="flex justify-center min-h-400 mb-16" style={{height: box.height}}>
            <div className="mt-5 mb-5 bg-blue-900 shadow-2xl absolute">
                <img className="p-5" id='inputimage' alt='' src={imageURL} width='500px' height='auto' />
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;