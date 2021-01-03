import React from 'react';
import HistoryItem from './HistoryItem';

const History = ({ historyList }) => {

    // const deleteHistory = (i) => {
    //     console.log(historyList[i])
    // }

    return(
        <div className="flex justify-center flex-wrap">
            <div className="text-white text-2xl w-full">History</div>
            <div className="min-w-500">
                {
                    historyList.map((historyList, i) => {
                        return(
                            <HistoryItem
                            key={i}
                            prevURL={historyList}
                            // deleteHistory={deleteHistory(i)}
                        />)
                    })
                }
            </div>
        </div>
    )
}

export default History;