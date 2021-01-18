import React from 'react'

const ImageLinkForm = ({ onInputChange, onPictureSubmit}) =>{

    return (
        <div className="col-start-1 h-auto mt-24 px-10 rounded shadow-2xl w-2/3 self-center place-self-center">
            <p className="text-lg">
                {'Copy a URL into the box below and have the image analyzed for faces!'}
            </p>
            <div className="flex justify-center">
                <div className="px-8 py-4 flex justify-center w-2/3">
                    <input className="border mx-2 rounded w-full" type="text" onChange={onInputChange}/>
                    <button className="w-auto bg-green-500 hover:bg-blue-700 rounded px-2" onClick={onPictureSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;