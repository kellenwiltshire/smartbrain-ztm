import React from 'react';

const HistoryItem = ({ prevURL, deleteHistory}) => {
    return(
        <div className="border rounded bg-indigo-500 p-3 m-3 flex flex-row justify-center">
            <p className="text-white">{prevURL}</p>
            {/* <button className="w-1/4 bg-green-500 hover:bg-blue-700 rounded" onClick={deleteHistory}>Delete</button> */}
        </div>
    )
}

export default HistoryItem;