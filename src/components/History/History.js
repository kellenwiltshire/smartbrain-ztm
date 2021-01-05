import React from 'react';
import HistoryItem from './HistoryItem';

const History = ({ historyList, deleteHistory }) => {

    const deleteWarning = () => {
        const deleteDialog = document.getElementById('delete');

        if(deleteDialog.style.visibility === 'hidden'){
            deleteDialog.style.visibility='visible';
        } else {
            deleteDialog.style.visibility='hidden';
        }
    }
    
    const historyDeleted = () => {
        deleteHistory();

        const deleteDialog = document.getElementById('delete');
        deleteDialog.style.visibility='hidden';
    }

    return(
        <div className="flex justify-center flex-wrap">
            <div className="text-white w-full flex flex-col justify-center">
                <h1 className="text-4xl">History</h1>
                <div>
                <button className="bg-blue-500 font-bold text-white px-2 py-1 transition duration-300 ease-in-out hover:bg-blue-600 cursor-pointer" onClick={deleteWarning}>Delete History</button>
                </div>
            </div>

            <div className="min-w-500">
                {
                    historyList.map((historyList, i) => {
                        return(
                            <HistoryItem
                            key={i}
                            prevURL={historyList}
                        />)
                    })
                }
            </div>
            {/* DELETE HISTORY POPUP */}
            <div id="delete" className="absolute md:w-1/3 sm:w-full rounded-lg shadow-lg bg-white my-3" style={{visibility: 'hidden'}}>
                <div className="flex justify-between border-b border-gray-100 px-5 py-4">
                    <div>
                    <i className="fa fa-exclamation-triangle text-orange-500"></i>
                    <span className="font-bold text-gray-700 text-lg">Warning: Delete History?</span>
                    </div>
                    <div>
                    <button><i className="fa fa-times-circle text-red-500 hover:text-red-600 transition duration-150"></i></button>
                    </div>
                </div>
            
                <div className="px-10 py-5 text-gray-600">
                Are you sure you want to Delete your History? This cannot be undone.
                </div>
            
                <div className="px-5 py-4 flex justify-end">
                <button className="mt-3 bg-blue-500 font-bold text-white px-2 py-1 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 cursor-pointer" onClick={deleteWarning}>Cancel</button>
                <button className="mt-3 bg-red-500 font-bold text-white px-2 py-1 transition duration-300 ease-in-out hover:bg-red-600 mr-6 cursor-pointer" onClick={historyDeleted}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default History;