import React, { useState } from 'react';
import Compose from '../Mailcomponents/Compose';
import SideNav from './SideNav'; // Import the SideNav component

const MainNavigation = () => {
    const [showSideNav, setShowSideNav] = useState(true);

    const toggleSideNav = () => {
        setShowSideNav(!showSideNav);
    };

    const handleSendEmail = (email) => {
        console.log('Email sent:', email);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/" className="text-white text-xl font-bold">
                        Welcome to MailBox
                    </a>
                </div>
            </nav>

            <Compose onSendEmail={handleSendEmail} />

            {/* Pass showSideNav and toggleSideNav as props to SideNav */}
            <SideNav show={showSideNav} onHide={toggleSideNav} />

            <nav className="bg-black p-4 fixed bottom-0 ">
                <div className="container mx-auto flex items-center justify-between">
                    <button
                        className="text-white text-2xl"
                        onClick={toggleSideNav}
                        style={{ border: 'none', background: 'none' }}
                    >
                        &#9776;
                    </button>
                    <a href="/" className="text-white text-xl font-bold">
                        Welcome to MailBox
                    </a>
                </div>
            </nav>
        </div>
    );
};

export default MainNavigation;
