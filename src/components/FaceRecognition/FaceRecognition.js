import React from 'react';
import FaceBoxes from './FaceBoxes';

const FaceRecognition = ({ imageURL, box }) => {
	return (
		<div className='flex justify-center h-screen col-start-2 border-l-2 row-span-full row-start-1'>
			<div className='mt-5 mb-5 absolute'>
				<img
					className='p-5'
					id='inputimage'
					alt=''
					src={imageURL}
					width='1000px'
					height='auto'
				/>
				{box.map((data, i) => {
					return (
						<FaceBoxes
							key={i}
							top={box[i].topRow}
							right={box[i].rightCol}
							bottom={box[i].bottomRow}
							left={box[i].leftCol}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default FaceRecognition;
