import React from 'react'
import Tilt from 'react-tilt'

const Logo = () => {
    return(
        <div className="m-8">
            <Tilt className="Tilt border rounded shadow-xl bg-blue-500" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-photo" width="150" height="150" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="15" y1="8" x2="15.01" y2="8" />
                    <rect x="4" y="4" width="16" height="16" rx="3" />
                    <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
                    <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
                </svg>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;