import React from 'react';

const Stats = ({ box, celebrities }) => {

    const celebs = celebrities.map((celebrities) => <li>-{celebrities}</li>)

    return (
        <div className="col-start-1 h-auto mb-4 rounded shadow-2xl w-2/3 self-center place-self-center">
            <h1 className="w-full text-4xl rounded">More Information</h1>
            <div>
                <ul>
                    <li>Number of Faces: {box.length - 1}</li>
                    <ul>Celebrities: {celebs}
                    </ul>
                </ul>
            </div>
        </div>
    );
};

export default Stats;