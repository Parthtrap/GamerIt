import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";


export default function NewNotificationModel(props) {
    // const [notificationList, setNotificationList] = useState([]);

    const auth = useContext(AuthContext);
    console.log(auth.notifications);
    return (
        <div
            // className="-z-10 r fixed top-0 left-0 right-0 flex   backdrop-sm "

            className="-z-10 flex fixed top-0 right-20    backdrop-sm "
        >
            <div className="container p-2 mx-auto mt-16 border border-gray-700 rounded-lg bg-fill md:max-w-xl">
                <div className="flex ml-4 items-center justify-between">

                    <p className="text-tprimary text-xl  ">Notifications</p>
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
                <div className="bg-fill  p-3 mt-2  rounded flex flex-col ">

                    {auth.notifications.map((notification) => {
                        console.log(notification);
                        return (
                            <>
                   
                                    <div className="border-fill-base m-2 p-2 border rounded-full flex flex-1 ">
                                        <img src={notification.linkedUsername} title="profile" className="w-6 h-6 rounded-full" />
                                    

                                    <div className="pl-3  flex  flex-col">
                                        <p className="text-tprimary text-sm leading-none">
                                            <Link to={notification.linkedUsername} className="text-tlink">{notification.linkedUsername}</Link> is a Match!!
                                        </p>
                                        <p className="text-tprimary text-xs leading-3 pt-1">g/{notification.communityName}</p>
                                        </div>

                                    </div>
                                </>
                           

                        )
                    })
                    }


                </div>

            </div>
        </div>
    );
}