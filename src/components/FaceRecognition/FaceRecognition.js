import React from 'react'
import './FaceRegocnition.css'

const FaceRecognition = ({ imageURL, box }) => {
    return(
        <div className="flex justify-center">
            <div className="mt-5 mb-5 min-w-500 h-auto border rounded bg-blue-900 shadow-2xl">
                <img className="p-5" id='inputimage' alt='' src={imageURL} width='500px' height='auto' />
                <div className='bounding-box'></div>
            </div>
        </div>
    )
}

export default FaceRecognition;