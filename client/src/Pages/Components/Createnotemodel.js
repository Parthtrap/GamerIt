import React from "react";

export default function Createnotemodel(props) {
    return(
        <div className="">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-100 backdrop-blur-sm">
                <div className="container p-2 mx-auto mt-16 border border-gray-700 rounded-lg shadow-md bg-fill md:max-w-xl">
                    
                    <div className="flex  justify-end">
                        {/*close button*/}
                        <button type="button"
                            onClick={props.onClose}
                            className="text-tprimary bg-transparent hover:bg-background hover:text-tmuted  rounded-lg text-sm p-1.5 inline-flex items-center" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" className="h-5 w-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 
                            1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 
                            11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 
                            1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    

                    <div className={"p-2 mx-5 mb-5 overflow-scroll rounded-lg shadow-lg scrollbar-hide md:mx-16 min-h-[10vw] " }>

                    <div class="mb-6">
                        <label for="large-input" class="text-tprimary block mb-2 text-sm font-medium  ">Enter Note Title</label>
                        <input type="text" id="large-input" class="text-tprimary block w-full p-4 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"/>
                    </div>

                    </div>

                    {/*Save Changes button*/}
                    <button type="button"
                        onClick={props.onClose}
                        className="text-tprimary bg-base px-5 py-2 mx-5 text-sm font-medium text-center rounded-full focus:outline-none md:mx-16">
                        Create Note
                    </button>

                </div>
            </div >
        </div>
    );
}