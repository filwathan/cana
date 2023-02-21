import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import * as Icon from 'react-feather'
import Image from 'next/image'
import users from '../assets/images/users.png'
import http from '../helpers/http'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { wantTrx } from '../redux/reducer/transaction'

const TransferPick = () => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.auth.token)
    const router = useRouter()
    const {id} = router.query
    
   

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
            const {data} = await http(token).get('/transactions/recipient/'+ id)
            setRecipient(data.results)
        } catch (error) {
            console.log('error')
        }
    }

    const [message, setMessage] = React.useState('');
    const [disable, setDisable] = React.useState(false);

    //amount
    const [amount, setAmount] = React.useState(0)
    const amountMax = (e) => {
        setAmount(e.target.value)
        if(amount.length && note.length){
            if(parseInt(e.target.value) <= profil?.balance){
                setMessage('')
                setDisable(true)
            }
            else {
                setMessage('amount can not more from balance')
                setDisable(false)
            }
        }
        else {
            setMessage('amount and note can not empty')
            setDisable(false)
        }
        console.log(message)
    }

    //note
    const [note, setNote] = React.useState('')
    const notes = (e) => {
        setNote(e.target.value)
        if(amount.length && note.length){
            if(parseInt(amount) <= profil?.balance){
                setMessage('')
                setDisable(true)
            }
            else {
                setMessage('amount can not more from balance')
                setDisable(false)
            }
        }
        else {
            setMessage('amount and note can not empty')
            setDisable(false)
        }
        console.log(message)
    }

    //submit wantTRX
    const trx = () => {
        const date = Date.now()
        console.log(amount)
        console.log(note)
        console.log(id)
        const form = {
            amount: amount,
            notes: note,
            recipientId: id,
            // dateTrx: new Date(date).toString(),
            dateTrx: date,
        }
        console.log(form)
        dispatch(wantTrx(form))
        router.push('/confirmation')
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
                                <div className='pb-10'>
                                    <p className='text-2xl font-semibold text-[#3A3D42]'>Transfer Money</p>
                                </div>
                                <div className='w-[790px] h-[54px] flex items-center'>
                                    <div className='w-[790px] h-[110px] rounded-xl bg-white shadow-md flex'>
                                        <div className='flex pl-5 items-center'>
                                            <Image width={100} height={100} className='w-[70px] h-[70px]' src={recipient.picture ? `${process.env.NEXT_PUBLIC_URL}/upload/${recipient.picture}` : users} alt="users" />
                                        </div>
                                        <div className='px-5 py-7'>
                                            <p className='text-xl text-[#514F5B] font-semibold'>{recipient?.firstName + ' ' + recipient?.lastName}</p>
                                            <p className='text-md text-[#7A7886] pt-1'>{recipient?.phoneNumber}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 pt-10 pb-10 text-[#7A7886]'>
                                    <div>Type the amount you want to transfer and then</div>
                                    <div>press continue to the next steps.</div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    {message && <div className={`text-center text-red-500 mb-4`}>{message}</div>}
                                    <input onChange={amountMax} className='input text-5xl text-center' type='number' name='transfer' placeholder="0.00"/>   
                                    <div className='my-4 font-bold'>Rp. {profil?.balance} Available</div>
                                    <div className='border-b-4 flex gap-5 pb-3 items-center w-1/2'>
                                        <Icon.Edit2/>
                                        <input onChange={notes} className='flex-1 p-2 focus:outline-none' type='test' name='note' placeholder='Add some notes'></input>
                                    </div>
                                </div>
                                <div className='flex justify-end my-4'>
                                    <button onClick={trx} disabled={!disable} className='btn btn-success' >Continue</button>
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
