import React, { useEffect, useState } from "react";

export default function Editenotemodel(props) {

    //const subnotes = props.content
    //const subnotes = []

    const [subnotes, setSubnotes ] = useState([]);

    const addSubnote = ()=> {
        const temp = {
            text: "",
            isCheckBox: false,
            isChecked: false
            }

        setSubnotes([...subnotes, temp]);   
        console.log(subnotes);
    }

    const addCheckedSubnote = ()=> {
        const temp = {
            text: "",
            isCheckBox: true,
            isChecked: false
            }

        setSubnotes([...subnotes, temp]); 
        console.log(subnotes);
    }

    return(
        <div className="">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-100 backdrop-blur-sm">
                <div className="container p-2 pb-7 mx-auto mt-16 border border-gray-700 rounded-lg shadow-md bg-fill md:max-w-xl">
                    
                    <div className=" w-fit ml-auto">
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
                            <label for="large-input" class="text-tprimary block mb-2 text-sm font-medium  ">Edit Note Title</label>
                            <input defaultValue={props.propstitle} type="text" id="large-input" class="bg-fill text-tprimary block w-full p-4 border border-gray-300 rounded-lg  sm:text-md focus:ring-blue-500 focus:border-blue-500"/>
                        </div>

                        <div className="flex gap-4">

                            <div onClick={addSubnote}
                            className="bg-base hover:bg-background text-tprimary flex p-2  hover:bg-opacity-5 rounded shadow">
                                <svg className="my-auto" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <div>Add note</div>
                            </div>

                            <div onClick={addCheckedSubnote}
                            className="bg-base  hover:bg-background text-tprimary flex p-2  hover:bg-opacity-5 rounded shadow">
                                <svg className="my-auto" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <div>Add todo</div>
                            </div>

                        </div>

                        {subnotes.map((subnote) => {
                            return(
                            <div className="mt-5 flex">
                                {subnote.isCheckBox ? <input id="default-checkbox" type="checkbox" value="" class="w-6 h-6 my-auto mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"></input> :<></> }
                                <input defaultValue={subnote.text} onChange={(event)=>{subnote.text=event.target.value}} type="text" id="small-input" class="bg-fill block w-full p-2 text-tprimary border border-gray-300 rounded-lg  sm:text-xs focus:ring-blue-500 focus:border-blue-500 "/>
                            </div>);
                        })}


                    </div>

                    {/*Save Changes button*/}
                    <button type="button"
                        onClick={(e)=>{
                            
                            console.log(subnotes);
                            props.onClose(e);
                        }}
                        className="text-tprimary hover:bg-background bg-base px-5 py-2 mx-5 text-sm font-medium text-center rounded-full focus:outline-none md:mx-16">
                        Save Note
                    </button>

                </div>
            </div >
        </div>
    );
}