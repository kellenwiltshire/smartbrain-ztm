import React from 'react';
import './FaceRegocnition.css'

const FaceBoxes = ({ top, right, bottom, left }) => {
    return (
        <div className='bounding-box' style={{top: top, right: right, bottom: bottom, left: left}}></div>
    );
};

export default FaceBoxes;