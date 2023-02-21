import Header from '../components/header'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import * as Icon from 'react-feather'
import Image from 'next/image'
import graphic from '../assets/images/graphic.png'
import users from '../assets/images/users.png'
import Link from 'next/link'

import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import ModalTopUp from '../components/modalTopUp'
import http from '../helpers/http'

const Home = () => {
    const token = useSelector((state)=> state.auth.token)
    
    
    useEffect(() =>{
        getProfile()
        listTransactionHome()
    },[])
    
    // get profile
    const [profil, setProfil] = useState({});
    const getProfile = async () => {
        try{
        const { data } = await http(token).get(`/profile`);
        setProfil(data.results)
        }catch(err){
        setProfil({});
        }
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
            const {data} = await http(token).post(`/transactions/topup`, {amount: topUp})
            getProfile()
            setModal(!modal)
        } catch (error) {
            console.log('error')
            setModal(!modal)
        }
    }
    
    //transaction list
    const [listTrx, setListTrx] = useState([])
    const listTransactionHome = async () => {
        try {
            const {data} = await http(token).get('/transactions?page=1&limit=5')
            setListTrx(data.results)
        } catch (error) {
            console.log('error')
        }
    }

    


  return (
    <div className='font-Nunito-sans'>
        {modal ? 
        <div className='h-screen w-screen fixed flex justify-center items-center z-10 bg-zinc-100/50 overflow-y-hidden'>
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
        
        <Header />
        <main className='py-10 px-36 flex gap-5'>
            <div className='flex-[0.2]'>
                <Navbar />
            </div>
            <div className='flex flex-col flex-[0.8] gap-5'>
                <div className='bg-[#6379F4] rounded-xl p-8 flex text-white'>
                    <div className='flex flex-col flex-1'>
                        <div className='text-[#E0E0E0]'>Balance</div>
                        <div className='flex-1 text-[40px] font-bold'>Rp {profil.balance}</div>
                        <div className='text-[#E0E0E0]'>{profil.phoneNumber}</div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div >
                            <Link href="/transfer-pick" className='btn flex gap-4 py-4 px-8 border rounded-xl w-full'>
                                <Icon.ArrowUp /><div> Transfer</div>
                            </Link>
                        </div>
                        <div>
                            <button onClick={open} className='btn flex gap-4 py-4 px-8 border rounded-xl w-full'>
                                <Icon.Plus /><div> Top Up</div>
                            </button>
                            {/* <label htmlFor="modalTopUp" className='btn flex gap-4 py-4 px-8 border rounded-xl w-full'>
                                <Icon.Plus /><div> Top Up</div>
                            </label> */}
                        </div>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className='bg-white flex-[0.5] px-10 py-8 rounded-xl'>
                        <div className='flex'>
                            <div className='flex flex-col flex-1 gap-2'>
                                <Icon.ArrowDown />
                                <div className='text-[#6A6A6A]'>Income</div>
                                <div className='font-bold text-[#3A3D42]'>Rp2.120.000</div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Icon.ArrowDown />
                                <div className='text-[#6A6A6A]'>Expense</div>
                                <div className='font-bold text-[#3A3D42]'>Rp1.560.000</div>
                            </div>
                        </div>
                        <div>
                            <Image className='w-full' src={graphic} alt="grapic"></Image>
                        </div>
                    </div>                    
                    <div className='bg-white flex flex-col flex-[0.5] px-10 py-8 rounded-xl gap-10'>
                        <div>
                            <div className='flex flex-1'>
                                <div className='font-bold flex-1'>Transaction History</div>
                                <div>
                                    <Link className='text-[#6379F4]' href='/history'>See all</Link>
                                </div>
                            </div>
                        </div>
                        {listTrx?.map((data, index) => (
                            <div key={index} className='flex flex-1 gap-4'>
                                <div>
                                    <Image width={100} height={100} className='w-14 h-14' src={data.recipientPicture ? `${process.env.NEXT_PUBLIC_URL}/upload/${data.recipientPicture}` : users} alt='foto-profil'></Image>
                                    {/* <Image width={100} height={100} className='w-14 h-14' src={data.senderPicture || data.recipientPicture || users} alt='foto-profil'></Image> */}
                                </div>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <div className='font-bold text-[#4D4B57] text-[16px]'>{data.recipientname}</div>
                                    <div className='text-[#7A7886]'>{data.notes}</div>
                                </div>
                                <div className={`font-bold text-[16px] ${data.notes === 'Top up' ? 'text-[#1EC15F]' : 'text-[#7A7886]'}`}>{data.notes === 'Top up' ? '+Rp ' + data.amount : '-Rp ' + data.amount}</div>
                            </div>
                        ))}                        
                        
                    </div>                    
                </div>
            </div>
        </main>
        <Footer />
    </div>
  )
}

export default Home