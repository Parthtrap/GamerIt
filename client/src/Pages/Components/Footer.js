import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
        <footer class="bg-base bottom-0 left-0 z-5 w-full p-2 m-0  border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-2">
            <span class="text-tprimary text-sm sm:text-center">© 2023 <Link to="/" class="hover:underline">GamerIT</Link>. All Rights Reserved.
            </span>
            <ul class="text-tprimary flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
                <li>
                    <Link to="/about" class="mr-4 hover:underline md:mr-6 ">About</Link>
                </li>
                <li>
                    <Link  to="/privacy" class="mr-4 hover:underline md:mr-6 ">Privacy Policy</Link>
                </li>
                <li>
                    <Link  to="/license" class="mr-4 hover:underline md:mr-6 ">Licensing</Link>
                </li>
                <li>
                    <Link  to="/contact" class="mr-4 hover:underline md:mr-6 ">Contact</Link>
                </li>
            </ul>
        </footer>
    </>
  )
}

export default Footer