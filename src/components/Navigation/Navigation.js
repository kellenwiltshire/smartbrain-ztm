import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {

    if(isSignedIn) {
        return(
            <nav className="flex justify-end">
                <p onClick={() => onRouteChange('signout')} className="text-lg underline p-2 m-4 cursor-pointer  bg-white rounded hover:bg-gray-500">Sign Out</p>
            </nav>
        );
    } else {
        return(
            <nav className="flex justify-end">
                <p onClick={() => onRouteChange('signin')} className="text-lg underline p-2 m-4 cursor-pointer  bg-white rounded hover:bg-gray-500">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="text-lg underline p-2 m-4 cursor-pointer  bg-white rounded hover:bg-gray-500">Register</p>
            </nav>
        );
    }
}

export default Navigation;