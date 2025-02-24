import React from 'react'
import Search from '../search'
import Cart from '../cart'
import Profile from '../profile'


function Nav() {
    return (
        <header className='h-20 w-full p-[20px] fixed flex flex-row items-center gap-10 top-0 bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]'>
            <h2>Fashion Town</h2>
            <div className='flex flex-row font-bold text-sm [flex-grow:2] justify-around'>
                <div className='cursor-pointer'>
                    MEN
                </div>
                <div className='cursor-pointer'>
                    WOMEN
                </div>
                <div className='cursor-pointer'>
                    HOME & LIVING
                </div>
            </div>
            <div className='[flex-grow:2] max-w-[500px]'>
                <Search />
            </div>
            <div className='flex flex-row gap-4'>
                <Profile />
                <Cart />
            </div>

        </header>
    )
}

export default Nav