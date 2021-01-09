import React from 'react'

const Rank = ({name, entries}) =>{
    return (
        <div>
            <div className="text-lg">
                {`${name}, your current entry count is...`}
            </div>
            <div className="text-xl">
                {`${entries}`}
            </div>
        </div>
    )
}

export default Rank;