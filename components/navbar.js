import React from 'react'
import * as Icon from 'react-feather'
import { useDispatch } from 'react-redux'
import {logout} from '../redux/reducer/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ModalTopUp from './modalTopUp'

const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const navLogout = ()=>{
        dispatch(logout())
        router.push("/")

    }
  return (
    <nav className='bg-white py-11  flex flex-col font-Nunito-sans text-xl gap-14 h-full'>
        {/* <ModalTopUp></ModalTopUp> */}
        <div className='hover:opacity-50'>
            <Link className='flex gap-5 px-8 text-[#6379F4] border-l-4 border-[#6379F4]' href="/home">
                <Icon.Grid />
                <div>Dasboard</div>
            </Link>
        </div>        
        <div className='hover:opacity-50'>
            <Link className='flex gap-5 px-8 ' href="/transfer-pick">
                <Icon.ArrowUp />
                <div>Transfer</div>
            </Link>
        </div>        
        <div className='hover:opacity-50'>
            {/* <Link className='flex gap-5 px-8 ' href="/home"> */}
            <label htmlFor="modalTopUp" className=" flex gap-5 px-8">
                <Icon.Plus />
                <div>Top Up</div>
            </label>            
            {/* </Link>  */}
            
        </div>        
        <div className='flex-1 hover:opacity-50'>
            <Link className='flex  gap-5 px-8 ' href="/profile">
                <Icon.User />
                <div>Profile</div>
            </Link>  
        </div>        
        <div className='flex gap-5 px-8 hover:opacity-50'>
            <Icon.LogOut />
            <div onClick={navLogout}>Logout</div>
        </div>   
    </nav>   
  )
}

export default Navbar