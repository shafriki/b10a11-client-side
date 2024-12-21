import React from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import { MdLabelImportant } from "react-icons/md";


const Latest = () => {
    return (
        <div className='flex mx-2 mb-5 items-center  gap-2 bg-base-200 p-2 text-xs md:text-base bg-gradient-to-r from-[#1B1B1D] via-[#272730] to-[#6E2B4E] text-white'>
            <p className='bg-[#228B22] px-4 py-2 text-white'>Latest</p>

            <Marquee autoFill='ture' pauseOnHover='ture'>
                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>
                Match Highlights: Germany vs Spain — as it happened   !</Link>
                <Link className='ml-10 flex items-center gap-1'><MdLabelImportant  className='text-[#228B22] text-xl'/>Match Highlights: Germany vs Spain as...</Link>
            </Marquee>
        </div>
    );
};

export default Latest;