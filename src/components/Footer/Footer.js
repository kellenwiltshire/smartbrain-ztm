import React from 'react';

const Footer = ({ postgres, reactimg, nodeimg, githubimg }) => {
    return (
        <div className="bg-white shadow-xl border fixed max-w-screen-md z-10 mx-auto inset-x-0 bottom-0 flex flex-row justify-center items-center">
            <img src={githubimg} alt='Github' />
            <h1>Designed By <a href='#'>Kellen Wiltshire</a> using </h1>
            <img src={postgres} alt='postgres svg' />
            <img src={reactimg} alt='react svg' />
            <img src={nodeimg} alt='node svg' />
        </div>
    );
};

export default Footer;