import { useParams, Link} from "react-router-dom";
import React, { useContext, useEffect, useState, useRef } from "react";

export default function Helppage() {

    const [isopen1, setIsopen1] = useState(false);
    const [isopen2, setIsopen2] = useState(false);
    const [isopen3, setIsopen3] = useState(false);
    const [isopen4, setIsopen4] = useState(false);

    const onClick1 = (e) => {
        e.preventDefault();
        setIsopen1(!isopen1);
        setIsopen2(false);
        setIsopen3(false);
        setIsopen4(false);
    }

    const onClick2 = (e) => {
        e.preventDefault();
        setIsopen1(false);
        setIsopen2(!isopen2);
        setIsopen3(false);
        setIsopen4(false);
    }

    const onClick3 = (e) => {
        e.preventDefault();
        setIsopen1(false);
        setIsopen2(false);
        setIsopen3(!isopen3);
        setIsopen4(false);
    }

    const onClick4 = (e) => {
        e.preventDefault();
        setIsopen1(false);
        setIsopen2(false);
        setIsopen3(false);
        setIsopen4(!isopen4);
    }


    return(

        <div className="w-full mt-16 p-16 bg-background">

            <div className="bg-fill tofade rounded-lg p-6 max-w-2xl mx-auto">

                <div className="">

                    {/*have any questions heading*/}
                    <p className="text-tprimary mb-7 text-sm  text-center font-semibold uppercase tracking-px">
                        Have any questions?
                    </p>
                    

                    {/*Frequently Asked Questions*/}
                    <h2 className="text-tmuted mb-16  text-4xl md:text-6xl xl:text-7xl text-center font-bold font-heading tracking-px-n leading-none">
                        Frequently Asked Questions
                    </h2>                   


                    {/*faq cards*/}
                    <div  className="mb-11 flex flex-wrap -m-1">

                        {/*first card*/}
                        <div onClick={onClick1} className="w-full p-1 ">
                            <div className={`pt-7 ${isopen1? " border-base pb-6 ":" pb-3 "} bg-fill px-8 bg-opacity-60 border-2  rounded-2xl shadow-10xl`}>
                                <div className="text-tprimary flex flex-wrap  justify-between -m-2">
                                    
                                    {/*question and answer text*/}
                                    <div className="flex-1 p-2">
                                        <h3 className="mb-4 text-lg font-semibold leading-normal">
                                            Do you provide any free plan?
                                        </h3>
                                        <p className={`text-tmuted font-medium ${isopen1 ? 'block' : 'hidden'}`}>
                                            Lorem ipsum dolor sit amet, to the consectr adipiscing elit.
                                            Volutpat tempor to the condi mentum vitae vel purus.
                                        </p>
                                    </div>

                                    {/*drop down arrow image*/}
                                    <div        
                                    className="w-auto p-2">
                                        
                                        <svg
                                            className={`relative top-1 ${isopen1? "rotate-180":""} transition-all ease-in-out duration-500 `}
                                            width={20}
                                            height={20}
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                            d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
                                            stroke="#9333EA"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            />
                                        </svg>
                                        
                                    </div>

                                </div>
                            </div>
                        
                        </div>

                        {/*second card*/}
                        <div onClick={onClick2} className="w-full p-1">
                            <div className={`pt-7 ${isopen2? " border-base pb-6 ":" pb-3 "} px-8 bg-fill bg-opacity-60 border-2  rounded-2xl shadow-10xl`}>
                                <div className="text-tprimary flex flex-wrap  justify-between -m-2">
                                    
                                    {/*question and answer text*/}
                                    <div className="flex-1 p-2">
                                        <h3 className="mb-4 text-lg font-semibold leading-normal">
                                            Do you provide any free plan?
                                        </h3>
                                        <p className={`text-tmuted font-medium ${isopen2 ? 'block' : 'hidden'}`}>
                                            Lorem ipsum dolor sit amet, to the consectr adipiscing elit.
                                            Volutpat tempor to the condi mentum vitae vel purus.
                                        </p>
                                    </div>

                                    {/*drop down arrow image*/}
                                    <div        
                                    className="w-auto p-2">
                                        
                                        <svg
                                            className={`relative top-1 ${isopen2? "rotate-180":""} transition-all ease-in-out duration-500 `}
                                            width={20}
                                            height={20}
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                            d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
                                            stroke="#9333EA"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            />
                                        </svg>
                                        
                                    </div>

                                </div>
                            </div>
                        
                        </div>

                        {/*3rd card*/}
                        <div onClick={onClick3} className="w-full p-1">
                            <div className={`pt-7 ${isopen2? " border-base pb-6 ":" pb-3 "} px-8 bg-fill bg-opacity-60 border-2  rounded-2xl shadow-10xl`}>
                                <div className="text-tprimary flex flex-wrap  justify-between -m-2">
                                    
                                    {/*question and answer text*/}
                                    <div className="flex-1 p-2">
                                        <h3 className="mb-4 text-lg font-semibold leading-normal">
                                            Do you provide any free plan?
                                        </h3>
                                        <p className={`text-tmuted font-medium ${isopen3 ? 'block' : 'hidden'}`}>
                                            Lorem ipsum dolor sit amet, to the consectr adipiscing elit.
                                            Volutpat tempor to the condi mentum vitae vel purus.
                                        </p>
                                    </div>

                                    {/*drop down arrow image*/}
                                    <div        
                                    className="w-auto p-2">
                                        
                                        <svg
                                            className={`relative top-1 ${isopen3? "rotate-180":""} transition-all ease-in-out duration-500 `}
                                            width={20}
                                            height={20}
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                            d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
                                            stroke="#9333EA"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            />
                                        </svg>
                                        
                                    </div>

                                </div>
                            </div>
                        
                        </div>

                        {/*4th card*/}
                        <div onClick={onClick4} className="w-full p-1">
                            <div className={`pt-7 ${isopen2? " border-base pb-6 ":" pb-3 "} px-8 bg-fill bg-opacity-60 border-2  rounded-2xl shadow-10xl`}>
                                <div className="text-tprimary flex flex-wrap  justify-between -m-2">
                                    
                                    {/*question and answer text*/}
                                    <div className="flex-1 p-2">
                                        <h3 className="mb-4 text-lg font-semibold leading-normal">
                                            Do you provide any free plan?
                                        </h3>
                                        <p className={`text-tmuted font-medium ${isopen4 ? 'block' : 'hidden'}`}>
                                            Lorem ipsum dolor sit amet, to the consectr adipiscing elit.
                                            Volutpat tempor to the condi mentum vitae vel purus.
                                        </p>
                                    </div>

                                    {/*drop down arrow image*/}
                                    <div        
                                    className="w-auto p-2">
                                        
                                        <svg
                                            className={`relative top-1 ${isopen4? "rotate-180":""} transition-all ease-in-out duration-500 `}
                                            width={20}
                                            height={20}
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                            d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
                                            stroke="#9333EA"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            />
                                        </svg>
                                        
                                    </div>

                                </div>
                            </div>
                        
                        </div>
                
                    </div>


                    {/*still have questions contact us*/}
                    <p className="text-tprimary text-center font-medium">
                        <span>Still have any questions?</span>
                        <a
                        onClick={(e) => {e.preventDefault();}}
                        className="font-semibold ml-2 text-tmuted hover:text-tlink"
                        href="mailto:mttparth306@gmail.com"
                        >
                        Contact us
                        </a>
                    </p>


                </div>

            </div>

        </div>

        
    );
}
