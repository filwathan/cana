import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import Image from 'next/image'
import users from '../assets/images/users.png'
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode'
import http from '../helpers/http'

const History = () => {
    const token = useSelector((state)=> state.auth.token)
    const {id} = jwtDecode(token)
    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(5)

    //transaction list
    const [listTrx, setListTrx] = React.useState([])
    const listTransaction = async () => {
        try {
            const {data} = await http(token).get(`/transactions?page=${page}&limit=${limit}`)
            setListTrx(data.results)
        } catch (error) {
            console.log('error')
        }
    }

    //add
    const add = () => {
        if(listTrx.length < 5) {
            setPage(page)
        }
        else {
            setPage(page + 1 )
        }
    }

    //minus
    const minus = () => {
        if(page > 1){
            setPage(page - 1 )
        }
        else{
            setPage(page)
        }
    }

    //sort
    const sortBy = (e) => {
        console.log(e.target.value)
        const value = e.target.value
        setLimit(9000)
        setPage(1)
        const data = [...listTrx]
        let hasil = [null]

        if(value === 'nameASC'){
            hasil = data.sort((a, b) => {
                const nameA = a.recipientname.toUpperCase();
                const nameB = b.recipientname.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })           
            setListTrx(hasil)
        }
        else if (value === 'nameDESC') {
            hasil = data.sort((a, b) => {
                const nameA = a.recipientname.toUpperCase();
                const nameB = b.recipientname.toUpperCase();
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                return 0;
            })           
            setListTrx(hasil)
        }
        else if (value === 'trxASC') {
            hasil = data.sort((a, b) => {
                const nameA = a.notes.toUpperCase();
                const nameB = b.notes.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })           
            setListTrx(hasil)
        }
        else if (value === 'trxDESC') {
            hasil = data.sort((a, b) => {
                const nameA = a.notes.toUpperCase();
                const nameB = b.notes.toUpperCase();
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                return 0;
            })           
            setListTrx(hasil)
        }
    }

    React.useEffect(() =>{
        listTransaction()
    },[page, limit])

  return (
    <div className='font-Nunito-sans'>
        <Header />
        <main className='py-10 px-36 flex gap-5'>
            <div className='flex-[0.2]'>
                <Navbar />
            </div>
            <div className='flex flex-col flex-[0.8] gap-5'>
                <div className='bg-white flex flex-col flex-[0.5] px-10 py-8 rounded-xl gap-10'>
                    <div>
                        <div className='flex flex-1'>
                            <div className='font-bold flex-1'>Transaction History</div>
                            <div>
                                <select onChange={sortBy} className='text-[#6379F4] bg-[#3A3D421A] select'>
                                    <option disabled selected>-- Select Filter --</option>
                                    <option value={'nameASC'} selected>Name a ~ z</option>
                                    <option value={'nameDESC'} selected>Name z ~ a</option>
                                    <option value={'trxASC'} selected>Transaction a ~ z</option>
                                    <option value={'trxDESC'} selected>Transaction z ~ a</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {listTrx?.map((data, index) => (
                        <div key={index} className='flex flex-1 gap-4'>
                            <div>
                                <Image width={100} height={100} className='w-14 h-14' src={data.recipientPicture ? `${process.env.NEXT_PUBLIC_URL}/upload/${data.recipientPicture}` : users} alt='foto-profil'></Image>
                            </div>
                            <div className='flex flex-col flex-1 gap-2'>
                                <div className='font-bold text-[#4D4B57] text-[16px]'>{data.recipientname}</div>
                                <div className='text-[#7A7886]'>{data.notes}</div>
                            </div>
                            <div className={`font-bold text-[16px] ${data.recipientId === id ?  'text-green-500' : 'text-red-500'}`}>{data.recipientId === id ? '+Rp ' + data.amount : '-Rp ' + data.amount}</div>
                        </div>
                    ))}
                    <div className='flex justify-center gap-2'>
                        <div className='btn btn-ghost' onClick={minus}><span>{'<'}</span></div>
                        <div className='btn btn-accent'><span>{page}</span></div>
                        <div className='btn btn-ghost' onClick={add}><span>{'>'}</span></div>
                    </div>
                </div> 
            </div>
        </main>
        <Footer />
    </div>
  )
}

export default History