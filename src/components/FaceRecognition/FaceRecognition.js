import React from 'react'
import FaceBoxes from './FaceBoxes'

const FaceRecognition = ({ imageURL, box }) => {
    return(
        <div className="flex justify-center min-h-400 mb-16">
            <div className="mt-5 mb-5 bg-blue-900 absolute">
                <img className="p-5" id='inputimage' alt='' src={imageURL} width='500px' height='auto' />
                {
                    box.map((data, i) => {
                        return (<FaceBoxes 
                            key={i}
                            top={box[i].topRow}
                            right={box[i].rightCol}
                            bottom={box[i].bottomRow}
                            left={box[i].leftCol}
                        />)
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition;