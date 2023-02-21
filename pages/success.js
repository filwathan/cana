import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import * as Icon from 'react-feather'
import Image from 'next/image'
import users from '../assets/images/users.png'
import cheklist from '../assets/images/cheklist.png'
import { useSelector, useDispatch } from 'react-redux'
import http from '../helpers/http'
import Link from 'next/link'

const Success = () => {
    const token = useSelector((state) => state.auth.token)
    const trx = useSelector((state) => state.transaction)

    // get profile
    const [profil, setProfil] = React.useState({});
    const getProfile = async () => {
        try{
        const { data } = await http(token).get(`/profile`);
        setProfil(data.results)
        }catch(err){
        setProfil({});
        }
    }

    //get detail recipient
    const [recipient, setRecipient] = React.useState({})
    const getRecipient = async () => {
        try {
            const {data} = await http(token).get('/transactions/recipient/'+ trx.recipientId)
            setRecipient(data.results)
        } catch (error) {
            console.log('error')
        }
    } 

    React.useEffect(() => {
        getProfile()
        getRecipient()
    }, [])

   return (
    <div className='font-Nunito-sans'>
        <Header />
        <main className='py-10 px-36 flex gap-5 bg-slate-50'>
            <div className='flex-[0.2]'>
                <Navbar />
            </div>
            <div className='flex flex-col flex-[0.8] gap-5'>
                <div className='flex gap-5'>
                    <div className='bg-white flex flex-col flex-[1] h-full px-10 py-8 rounded-xl gap-10'>
                        <div>
                            <div className='pt-3'>
                                
                                
                                <div className='flex flex-col gap-6 pt-10 pb-10'>
                                    <div className='flex justify-center items-center'>
                                        <Image src={cheklist} alt="grapic" />
                                    </div>
                                    
                                    <div className='flex justify-center items-center'>
                                        <p className='text-xl font-semibold text-[#3A3D42]'>Transfer Success</p>
                                    </div>

                                    <div className='w-[790px] h-[90px] rounded-xl bg-white shadow-md'>
                                        <div className='px-5 py-5'>
                                            <p className='text-md text-[#7A7886]'>Amount</p>
                                            <p className='text-2xl text-[#514F5B] font-semibold'>Rp { trx.amount}</p>
                                        </div>
                                    </div>

                                    <div className='w-[790px] h-[90px] rounded-xl bg-white shadow-md'>
                                        <div className='px-5 py-5'>
                                            <p className='text-md text-[#7A7886]'>Balance Left</p>
                                            <p className='text-2xl text-[#514F5B] font-semibold'>Rp {profil?.balance}</p>
                                        </div>
                                    </div>

                                    <div className='w-[790px] h-[90px] rounded-xl bg-white shadow-md'>
                                        <div className='px-5 py-5'>
                                            <p className='text-md text-[#7A7886]'>Date & Time</p>
                                            <p className='text-2xl text-[#514F5B] font-semibold'>{new Date(trx.dateTrx).toString()}</p>
                                        </div>
                                    </div>

                                    <div className='w-[790px] h-[90px] rounded-xl bg-white shadow-md'>
                                        <div className='px-5 py-5'>
                                            <p className='text-md text-[#7A7886]'>Notes</p>
                                            <p className='text-2xl text-[#514F5B] font-semibold'>{trx.notes}</p>
                                        </div>
                                    </div>

                                    <div className=''>
                                        <p className='text-2xl font-semibold text-[#3A3D42]'>Transfer To</p>
                                    </div>

                                    <div className='w-[790px] h-[110px] rounded-xl bg-white shadow-md flex'>
                                        <div className='flex pl-5 items-center'>
                                            <Image width={100} height={100} className='w-[70px] h-[70px]' src={recipient.picture ? `${process.env.NEXT_PUBLIC_URL}/upload/${recipient.picture}` : users} alt="users" />
                                        </div>
                                        <div className='px-5 py-7'>
                                            <p className='text-xl text-[#514F5B] font-semibold'>{recipient?.firstName + ' ' + recipient?.lastName}</p>
                                            <p className='text-md text-[#7A7886] pt-1'>{recipient?.phoneNumber}</p>
                                        </div>
                                    </div>


                                    <div className='flex justify-end gap-5 pt-10 pr-24'>
                                        <button type="submit" className="btn w-[170px] h-[50px] bg-sky-200 rounded-lg text-[#6379F4]">Download PDF</button>
                                        <Link href='/home' className="btn w-[170px] h-[50px] bg-[#6379F4] rounded-lg text-white">Continue</Link>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        
                    </div>                    
                </div>
            </div>
        </main>
        <Footer />
    </div>
  )
}

export default Success