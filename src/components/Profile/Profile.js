import React from 'react';

const Profile = ({ user, profileOpened, onRouteChange, tester }) => {

    const deleteProfilePop = () => {
        const deleteUser = document.getElementById('deleteUserPop');
        if(deleteUser.style.visibility === 'hidden') {
            deleteUser.style.visibility='visible'
        } else {
            deleteUser.style.visibility='hidden'
        }
    }

    const deleteProfile = () => {
        
        fetch(`http://localhost:3000/profile/:${user.id}`, {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: user.id,
            email: user.email
            })
        })
        .then(onRouteChange('signout'))
        .then(profileOpened())
    }

    if(tester){
        return (
            <div className="w-full h-full absolute bg-gray-400 flex justify-center align-middle place-items-center">
                <div className="absolute md:w-1/3 sm:w-full rounded-lg shadow-lg bg-white my-3">
                    <div className="flex justify-between border-b border-gray-100 px-5 py-4">
                        <div>
                        <i className="fa fa-exclamation-triangle text-orange-500"></i>
                        <span className="font-bold text-gray-700 text-lg">Profile</span>
                        </div>
                    </div>
                
                    <div className="px-10 py-5 text-gray-600">
                        <ul>
                            <li>User: {user.name}</li>
                            <li>Email: {user.email}</li>
                            <li>Entries: {user.entries}</li>
                            <li>Joined: {user.joined}</li>
                        </ul>
                    </div>
                
                    <div className="px-5 py-4 flex justify-end">
                    <button className="mt-3 bg-blue-500 font-bold text-white px-2 py-1 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 cursor-pointer" onClick={profileOpened}>Close</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-full h-full absolute bg-gray-400 flex justify-center align-middle place-items-center">
                <div className="absolute md:w-1/3 sm:w-full rounded-lg shadow-lg bg-white my-3">
                    <div className="flex justify-between border-b border-gray-100 px-5 py-4">
                        <div>
                        <i className="fa fa-exclamation-triangle text-orange-500"></i>
                        <span className="font-bold text-gray-700 text-lg">Profile</span>
                        </div>
                    </div>
                
                    <div className="px-10 py-5 text-gray-600">
                        <ul>
                            <li>User: {user.name}</li>
                            <li>Email: {user.email}</li>
                            <li>Entries: {user.entries}</li>
                            <li>Joined: {user.joined}</li>
                        </ul>
                    </div>
                
                    <div className="px-5 py-4 flex justify-end">
                    <button className="mt-3 bg-blue-500 font-bold text-white px-2 py-1 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 cursor-pointer" onClick={profileOpened}>Close</button>
                    <button className="mt-3 bg-red-500 font-bold text-white px-2 py-1 transition duration-300 ease-in-out hover:bg-red-600 mr-6 cursor-pointer" onClick={deleteProfilePop}>Delete</button>
                    </div>
                </div>
                {/* DELETE Profile POPUP */}
                <div id="deleteUserPop" className="absolute md:w-5/12 sm:w-full rounded-lg shadow-lg bg-white my-3" style={{visibility: 'hidden'}}>
                        <div className="flex justify-between border-b border-gray-100 px-5 py-4">
                            <div>
                        <i className="fa fa-exclamation-triangle text-orange-500"></i>
                        <span className="font-bold text-gray-700 text-3xl">Warning: Delete Profile?</span>
                        </div>
                        <div>
                        <button><i className="fa fa-times-circle text-red-500 hover:text-red-600 transition duration-150"></i></button>
                        </div>
                    </div>
                
                    <div className="px-10 py-5 text-2xl text-gray-600">
                    Are you sure you want to Delete your Profile? This cannot be undone.
                    </div>
                
                    <div className="px-5 py-4 flex justify-end">
                    <button className="mt-3 bg-blue-500 font-bold text-white px-2 py-1 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 cursor-pointer" onClick={deleteProfilePop}>Cancel</button>
                    <button className="mt-3 bg-red-500 font-bold text-white px-2 py-1 transition duration-300 ease-in-out hover:bg-red-600 mr-6 cursor-pointer" onClick={deleteProfile}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Profile;