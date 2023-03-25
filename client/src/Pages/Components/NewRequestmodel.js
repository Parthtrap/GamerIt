import React, { useContext, useEffect, useState, useRef } from "react";


export default function MatchPage(props) {


    const examplelist =[
        {
            "name": "Elemental Main",
            "type": "string",
            "offset": 0,
            "value": [
                "Pyro Main",
                "Cryo Main",
                "Anemo Main",
                "Dandro Main",
                "Hydro Main",
                "Geo Main",
                "Electro Main"
            ],
            "same": false,
            "_id": "641e36f578be63de089a870b"
        },
        {
            "name": "Adventure Rank",
            "type": "num",
            "offset": 3,
            "value": [],
            "same": true,
            "_id": "641e3b99e2be4c51904a1fff"
        }
    ]

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-100 backdrop-blur-sm">
            <div className="container p-2 mx-auto mt-16 border border-gray-700 rounded-lg shadow-md bg-fill md:max-w-3xl">
                <div className="flex justify-between mx-5 my-5 md:mx-16">

                    

                    {/*close button*/}
                    <button type="button"
                        onClick={props.onClose}
                        className="text-tprimary bg-transparent hover:bg-background hover:text-tmuted rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
                        <svg aria-hidden="true" className="h-5 w-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 
                        1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 
                        11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 
                        1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>

                </div>

                <div className={"p-2 mx-5 my-5 overflow-scroll rounded-lg shadow-lg scrollbar-hide md:mx-16 h-96 " }>

                    {examplelist.map((ele) => {
                        return (
                            ele.type == "string" ? 
                            
                            <div>
                                
                                <label for="countries" class="text-tprimary block mb-2 text-sm font-medium  "> Select your {ele.name}  </label>
                                <select id="countries" class="bg-base text-tmuted  border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                <option selected>Choose Catagory</option>
                                {ele.value.map((value) => {
                                    return (
                                        <option value={value}>{value}</option>
                                    );
                                })}
                                </select>

                            </div> 
                            : 
                            <div>
                                <div>
                                    <label for="NumVal" class="text-tprimary block mb-2 text-sm font-medium ">Enter {ele.name}</label>
                                    <input type="number" id="NumVal" class="text-tmuted bg-base border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                                </div>
                            </div>

                            );
                    })}

                    

                </div>

                {/*Save Changes button*/}
                <button type="button"
                    onClick={props.onClose}
                    className="text-tprimary bg-base px-5 py-2 mx-5 text-sm font-medium text-center rounded-full focus:outline-none  md:mx-16">
                    Send Request
                </button>

            </div>
        </div >
    );

}