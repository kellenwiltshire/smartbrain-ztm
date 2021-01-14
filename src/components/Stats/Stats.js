import React from 'react';

const Stats = ({ box, celebrities }) => {

    return (
        <div className="flex justify-center">
            <div className="border rounded w-2/3 h-auto">
                <h1>More Information: </h1>
                <ul>
                    <li>Number of Faces: {box.length - 1}</li>
                    <ul>Celebrities:
                    {
                        celebrities.map((data, i) => {
                            return(
                                <li key={i}>{celebrities[i].celeb}, {celebrities[i].acc}%</li>
                            )
                        })
                    } 
                    </ul>
                </ul>
            </div>
        </div>
    );
};

export default Stats;