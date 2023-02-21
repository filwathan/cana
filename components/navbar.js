import React, {useState} from 'react'
import * as Icon from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../redux/reducer/auth'
import { byeTrx } from '../redux/reducer/transaction'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ModalTopUp from './modalTopUp'
import http from '../helpers/http'

const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const token = useSelector((state)=> state.auth.token)

    // logout
    const navLogout = ()=>{
        dispatch(byeTrx())
        dispatch(logout())
        router.push("/")
        
    }

    //open modal
    const [modal, setModal] = useState(false)
    const open = () => {
        setModal(!modal)
    }

    //top up
    const updateTopUp = async (e)=>{
        e.preventDefault()
        const topUp = e.target.topUp.value
        try {
            console.log('hit')
            const {data} = await http(token).post(`/transactions/topup`, {amount: topUp})
            setModal(!modal)
        } catch (error) {
            console.log('error')
            console.log(error)
            setModal(!modal)
        }
    }
  return (
    <nav className='bg-white py-11  flex flex-col font-Nunito-sans text-xl gap-14 h-full'>
        {/* <ModalTopUp></ModalTopUp> */}
        {modal ? 
        <div className='h-screen w-screen fixed flex justify-center items-center z-10 bg-zinc-100/50 overflow-y-hidden inset-0'>
            <form onSubmit={updateTopUp}>
                <div className="modal-box w-[500px]">
                    <h3 className="font-bold text-lg">Top Up</h3>
                    <div className="w-[302px]">
                        <p className="py-4 text-[#3A3D4299]">Enter the amount of money, and click submit</p>
                    </div>
                    <div className="flex gap-5 pt-5">
                        <div className="border-2 border-black rounded-lg inline-block overflow-hidden">
                                <input type='number' name='topUp' className='outline-none px-2' placeholder="0" />
                        </div>
                    </div>
                    <div className="modal-action pt-10">
                            <button type="submit" className="btn">submit</button>
                    </div>
                </div>  
            </form>
        </div>
         : <></>}
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
            <div onClick={open} className=" flex gap-5 px-8">
                <Icon.Plus />
                <div>Top Up</div>
            </div>            
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