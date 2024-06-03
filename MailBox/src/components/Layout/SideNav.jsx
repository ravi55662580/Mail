import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoaderActions } from '../../Store/UI-Slice/loader-slice';


const SideNav = ({ show, onHide }) => {
    const dispatch = useDispatch();

    const openModalHandler = () => {
        dispatch(LoaderActions.openPortal());
    };

    return (
        <div className={`fixed inset-0 z-30 bg-black text-white transition-transform transform ${show ? 'translate-x-0' : '-translate-x-full'} w-60`}>
            <div className="p-4 flex justify-end">
                <button onClick={onHide} className="text-white">
                    &times;
                </button>
            </div>
            <nav className="flex flex-col space-y-4 p-4">
                <NavLink to="/compose" onClick={openModalHandler} className="hover:bg-gray-700 p-2 rounded" >
                    Compose
                </NavLink>
                <NavLink to="/inbox" className="hover:bg-gray-700 p-2 rounded" >
                    Inbox
                </NavLink>
                <NavLink to="/sent" className="hover:bg-gray-700 p-2 rounded" >
                    Sent
                </NavLink>
                
            </nav>
        </div>
    );
};

export default SideNav;
