import React from 'react'

const ImageLinkForm = () =>{
    return (
        <div>
            <p className="text-lg">
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div className="flex justify-center">
                <div className="px-8 py-4 rounded shadow-xl bg-blue-500 flex justify-center w-3/4">
                    <input className="border mx-2 rounded w-3/4" type="text"/>
                    <button className="w-1/4 bg-green-500 hover:bg-blue-700 rounded">Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;