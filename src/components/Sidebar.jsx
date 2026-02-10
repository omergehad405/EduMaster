import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { GiBookshelf } from "react-icons/gi";
import { MdQuiz } from "react-icons/md";

function Sidebar({ active }) {
    return (
        <div className='bg-(--main-color) p-5'>
            <div className='flex items-center justify-center'>
                <Link to="/" className='capitalize font-bold text-2xl'>edu<span className='text-(--second-color)'>Master</span></Link>
                <img className={`${active == true ? "hidden" : "flex"} w-[50px]`} src='logo.jpg' alt='logo' />
            </div>

            <ul className='flex flex-col gap-10 mt-5'>
                <Link to="dashboard" className='capitalize flex items-center gap-2 font-bold cursor-pointer'>
                    <FaHome />
                    <span className={`${active == true ? "block" : "hidden"}`}> dashBoard</span>
                </Link>
                <Link to="learn" className='capitalize flex items-center gap-2 font-bold cursor-pointer'>
                    <GiBookshelf />
                    <span className={`${active == true ? "block" : "hidden"}`}> View tracks</span>
                </Link>
                <Link to="test" className='capitalize flex items-center gap-2 font-bold cursor-pointer'>
                    <MdQuiz />
                    <span className={`${active == true ? "block" : "hidden"}`}> test your self</span>
                </Link>
            </ul>
        </div>
    )
}

export default Sidebar