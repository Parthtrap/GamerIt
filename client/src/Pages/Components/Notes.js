import React from 'react'
import { useContext, useEffect, useState, useRef } from "react";
import Note from './Note'
import {note} from '../../Data'

import Createnotemodel from "../Components/Createnotemodel";

const Notes = () => {

  const [request, setRequest] = useState(false);

  function onClose(e) {
    e.preventDefault();
    setRequest(false);
  }

  return (
    <div>
      <div className="bg-background mx-auto container py-20 px-6 min-h-[43rem]">
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {note.map((props)=>(
              <Note title={props.title} description={props.description} Date={props.Date} _id={props._id}/>
          ))}
        </div>

        <button type="button" 
        onClick={() => (setRequest(true))}
        className="flex gap-2 text-tprimary bg-base hover:bg-background
        focus:outline-none focus:ring-2 
        focus:ring-tmuted
        font-medium rounded-full t
        ext-sm px-5 py-2.5 text-center mr-2 mb-2 ">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Create Note           
        </button> 

        {request ? <Createnotemodel onClose={onClose}/> : <></>}

      </div>
    </div>
  );
};

export default Notes