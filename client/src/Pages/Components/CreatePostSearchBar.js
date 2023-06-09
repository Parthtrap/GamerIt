import React from 'react'
import { Link } from 'react-router-dom'

const CreatePostSearchBar = () => {
    return (
        <>
            {/* create a reddit create post bar */}
            <div className="flex w-full h-full bg-fill  rounded-xl"
            >
                <input type="text" placeholder="Create Post" className="bg-fill text-tprimary border-solid border-2 border-baccent  w-full block flex-grow h-10 px-2 text-lg rounded-l-xl  focus:outline-none " />
                
                {/* search icon */}
                <button  className="text-tprimary flex relative border-solid border-2 border-x-0 border-baccent items-center justify-center w-10 h-10 text-2xl  bg-base hover:text-fill hover:bg-fill focus:outline-none focus:text-fill focus:bg-fill-base">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="blue" stroke-width="2">
                <path  stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </button>

                {/* creat post link button */}
                <Link to='/createPost' className="text-tprimary flex relative border-solid border-2 rounded-r-xl border-baccent items-center justify-center w-10 h-10 text-2xl  bg-base hover:text-fill hover:bg-fill focus:outline-none focus:text-fill focus:bg-fill-base">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path style={{fill:"blue"}} className="text-tprimary" d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
                </Link>
                </div>

        </>
    )
}

export default CreatePostSearchBar

