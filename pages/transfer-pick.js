import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import * as Icon from 'react-feather'
import Image from 'next/image'
import users from '../assets/images/users.png'
import http from '../helpers/http'
import { useSelector } from 'react-redux'
import Link from 'next/link';

const TransferPick = () => {
    const token = useSelector((state) => state.auth.token)

    //get list recipients limit 5 page 1
    const [limit, setLimit] = React.useState(5)
    const [recipient, setRecipient] = React.useState([])

    const getRecipient = async () => {
        try {
            console.log('hit')
            const {data} = await http(token).get(`/transactions/recipient?page=1&limit=${limit}`)
            setRecipient(data.results)
        } catch (error) {
            console.log('error')
        }
    }

    //search
    const searching = (e) => {
        const word = e.target.value
        if (word.length) {
            setLimit(9000)
            const find = [...recipient]
            const hasil = (find.filter(data => data.firstName.includes(word) || data.lastName.includes(word)))
            setRecipient(hasil)
        }
        else {
            console.log('hit else')
            setLimit(5)
            getRecipient()
        }
        
    }

    React.useEffect(() => {
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
                                <div className='pb-5'>
                                    <p className='text-2xl font-semibold text-[#3A3D42]'>Search Receiver</p>
                                </div>
                                <div className='w-[790px] h-[54px] flex items-center gap-5'>
                                    <div className='w-[20px]'>
                                        <Icon.Search className='' />
                                    </div>
                                    <input onChange={searching} className='w-[790px] h-[54px] bg-[#3A3D421A] rounded-xl pl-5' type="text" placeholder="Search receiver here..."></input>
                                </div>
                                <div className='flex flex-col gap-6 pt-10 pb-10'>
                                    {recipient?.map((data, index) => (
                                        <Link href={{pathname: `/input-amount/`, query: {id: data.id}}} key={index} className='w-[790px] h-[110px] pt-2 rounded-xl bg-white shadow-md flex hover:bg-green-500/30'>
                                            <div className='flex pl-5 items-center'>
                                                <Image width={100} height={100} className='w-[70px] h-[70px]' src={data.picture ? `${process.env.NEXT_PUBLIC_URL}/upload/${data.picture}` : users} alt="users" />
                                            </div>
                                            <div className='px-5 py-7'>
                                                <p className='text-xl text-[#514F5B] font-semibold'>{data.firstName + ' ' + data.lastName}</p>
                                                <p className='text-md text-[#7A7886] pt-1'>{data.phoneNumber}</p>
                                            </div>
                                        </Link>
                                    ))}                                    
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

export default TransferPick
