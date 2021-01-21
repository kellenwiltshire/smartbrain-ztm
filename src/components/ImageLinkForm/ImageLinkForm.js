import React from 'react';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
	return (
		<div className='flex flex-col col-start-1 h-auto px-10 rounded border-2 sm:border-0 border-black sm:shadow-2xl w-2/3 self-center place-self-center'>
			<p className='text-lg'>
				{
					'Copy an image URL into the box below and have the image analyzed for faces!'
				}
			</p>
			<div className='flex justify-center'>
				<div className='px-8 py-4 flex flex-wrap justify-center w-2/3'>
					<input
						className='border mx-2 rounded w-max mb-2'
						type='text'
						onChange={onInputChange}
					/>
					<button
						className='w-auto bg-green-500 hover:bg-green-700 rounded px-2 transition duration-300 ease-in-out text-white'
						onClick={onPictureSubmit}
					>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImageLinkForm;
