import React from 'react';

const Stats = ({ box }) => {
    return (
        <div className="flex justify-center">
            <div className="border rounded w-2/3 h-auto">
            <h1>More Information: </h1>
            <ul>
                <li>Number of Faced: {box.length - 1}</li>
            </ul>
        </div>
        </div>
    );
};

export default Stats;