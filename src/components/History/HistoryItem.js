import React from 'react';

const HistoryItem = ({ prevURL }) => {
	return (
		<div className='border rounded bg-indigo-500 p-3 m-3 flex flex-row justify-center'>
			<p className='text-white'>{prevURL}</p>
		</div>
	);
};

export default HistoryItem;
