import React, {useState} from "react";
import { Link } from "react-router-dom";

export default function Commentitem(prop) {
console.log("HELPPP");
   
    return (
        <div className="bg-gray-600 border-slate-500 hover:border-slate-200 px-4 py-2 my-1 rounded-lg border-b  hover:border hover:drop-shadow-[0_4px_3px_rgba(255,255,255,0.25)] ">

            <div className="items-center">
                <div className="flex items-center ">
                    <Link to={"/profile/" + prop.obj.userId}>
                        <div className="text-tprimary ">
                            <span className="font-bold cursor-pointer ">{prop.obj.userId}</span>{' '}
                        </div>
                    </Link>
                </div>
                {prop.obj.text}
            </div>
            <div className=" text-tprimary w-full">
            </div>

        </div>

    );
}
