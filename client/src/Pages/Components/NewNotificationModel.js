import React from "react";
import { Link } from "react-router-dom";

export default function NewNotificationModel(props) {
    return(
        <div className="fixed -z-10 right-5 top-0 flex items-center justify-center bg-black bg-opacity-25 z-100 backdrop-sm ">
            <div className="container p-2 mx-auto mt-16 border border-gray-700 rounded-lg shadow-md bg-fill md:max-w-xl">
                <div className="flex ml-4 items-center justify-between">

                    <p className="text-tprimary text-2xl  ">Notifications</p>
                    <button type="button"
                            onClick={props.onCloseNotificationClick}
                            className="text-tprimary bg-transparent hover:bg-background hover:text-tmuted  rounded-lg text-sm p-1.5 inline-flex items-center" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" className="h-5 w-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 
                            1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 
                            11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 
                            1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                </div>
                <div className="bg-fill-bg w-full p-3 mt-2 rounded flex">
                    <div className="border-fill-base w-8 h-8 border rounded-full flex items-center justify-center">
                        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z" fill="#EF4444" />
                        </svg>
                    </div>
                    <div className="pl-3">
                        <p className="text-tprimary text-sm leading-none">
                            <Link to='/profile/21' className="text-tlink">James Doe</Link> is a Match!!
                        </p>
                        <p className="text-tprimary text-xs leading-3 pt-1">2 hours ago</p>
                    </div>
                </div>
            
            </div>
        </div>
    );
}