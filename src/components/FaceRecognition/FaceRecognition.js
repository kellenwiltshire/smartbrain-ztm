import React from 'react'

const FaceRecognition = ({ imageURL }) => {
    return(
        <div className="flex justify-center">
            <div className="absolute mt-5">
                <img alt='' src={imageURL} width='500px' height='auto' />
            </div>
        </div>
    )
}

export default FaceRecognition;