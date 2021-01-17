import React from 'react'

const Rank = ({name, entries}) =>{
    return (
        <div className="mt-20 col-span-3">
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