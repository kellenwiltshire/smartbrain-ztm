import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {

    if(isSignedIn) {
        return(
            <nav className="flex justify-end">
                <p onClick={() => onRouteChange('signout')} className="rounded mt-3  font-bold text-white px-4 py-3 transition duration-300 ease-in-out mr-6 cursor-pointer bg-indigo-600 hover:bg-indigo-700">Sign Out</p>
            </nav>
        );
    } else {
        return(
            <nav className="flex justify-end">
                <p onClick={() => onRouteChange('signin')} className="rounded mt-3  font-bold text-white px-4 py-3 transition duration-300 ease-in-out mr-6 cursor-pointer bg-indigo-600 hover:bg-indigo-700">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="rounded mt-3  font-bold text-white px-4 py-3 transition duration-300 ease-in-out mr-6 cursor-pointer bg-indigo-600 hover:bg-indigo-700">Register</p>
            </nav>
        );
    }
}

export default Navigation;