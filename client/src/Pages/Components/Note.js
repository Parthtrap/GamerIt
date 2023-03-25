import Editnotemodel from "../Components/Editnotemodel";
import { useContext, useEffect, useState, useRef } from "react";

const Note = (props) => {

    const [request, setRequest] = useState(false);

    function onClose(e) {
        e.preventDefault();
        setRequest(false);
    }

    return(
        <div>
            <div className="rounded">
                <div className="bg-fill w-full h-64 flex flex-col justify-between rounded-lg border border-gray-400 py-5 px-4">
                    
                    <div>
                        <h4 className="text-red-800 dark:text-gray-100 truncate font-bold mb-3">{props.title}</h4>
                        <p className="text-red-800 dark:text-gray-100 truncate text-sm">{props.description}</p>
                    </div>
                    
                    <div>
                        <div className="text-tprimary flex items-center justify-between ">
                            <p className="text-tprimary text-sm">{props.Date}</p>
                            <div onClick={() => (setRequest(true))}
                            className="bg-base text-tprimary w-8 h-8 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                                    <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {request ? <Editnotemodel propstitle={props.title} description={props.description} Date={props.Date} _id={props._id} onClose={onClose}/> : <></>}

                </div>
            </div>
        </div>
    );
}

export default Note;