import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {

    if(isSignedIn) {
        return(
            <nav className="flex justify-end">
                <p onClick={() => onRouteChange('signout')} className="mt-3 bg-blue-500 font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 cursor-pointer">Sign Out</p>
            </nav>
        );
    } else {
        return(
            <nav className="flex justify-end">
                <p onClick={() => onRouteChange('signin')} className="mt-3 bg-blue-500 font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 cursor-pointer">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="mt-3 bg-blue-500 font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 cursor-pointer">Register</p>
            </nav>
        );
    }
}

export default Navigation;