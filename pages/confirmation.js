import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import Image from 'next/image'
import users from '../assets/images/users.png'
import { useSelector, useDispatch } from 'react-redux'
import http from '../helpers/http'
import { useRouter } from 'next/router'

const Confirmation = () => {
    const router = useRouter()
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

    //open modal
    const [modal, setModal] = React.useState(false)
    const open = () => {
        setModal(!modal)
    }

    //make a next clomn value pin
    const [pin, setPin] = React.useState(0) 
    const [message, setMessage] = React.useState('')
    const input1 = React.useRef(null);
    const input2 = React.useRef(null);
    const input3 = React.useRef(null);
    const input4 = React.useRef(null);
    const input5 = React.useRef(null);
    const input6 = React.useRef(null);

    const changeInput = (e) =>{
        setMessage('')
        if (e.target.value.length > 1) {
            e.target.value = e.target.value.slice(0,1);
        };
        const pinInput = {
            1: input1,
            2: input2,
            3: input3,
            4: input4,
            5: input5,
            6: input6,
        };
        const currentInput = Number(e.target.name);
        if(e.target.value.length){
            pinInput[currentInput + 1]?.current?.focus();
        }
        else {
            pinInput[currentInput - 1]?.current?.focus();
            if(currentInput < 6) {
                for (let i = currentInput; i <= 6; i++){
                    pinInput[i].current.value = "";
                }
            }
        }
        let valuePin = "";
        for (let i = 1; i <= 6; i++){
            valuePin += pinInput[i]?.current?.value;
        }

        if(valuePin.length == 6){
            if(profil.pin === valuePin){
                console.log('hit match')
                setMessage('pin match')
                setPin(valuePin)
            }
            else{
                setMessage('pin not match')
                console.log('hit not match')
            }
        }
    };

    //post transaction
    const postTrx = async (e) => {
        e.preventDefault()
        const form = {
            amount: trx.amount,
            notes: trx.notes,
            pin: pin,
            recipientId: trx.recipientId,
        }
        try {
            const {data} = await http(token).post('/transactions/transfer', form)
            console.log(data.message)
            router.push('/success')
        } catch (error) {
            console.log(error)
        }
        
    }

    

    React.useEffect(() => {
        getProfile()
        getRecipient()
    }, [])

   return (
    <div className='font-Nunito-sans'>
        {modal ? 
        <div className='h-screen w-screen fixed flex justify-center items-center z-10 bg-zinc-100/50 overflow-y-hidden'>
            <form >
                <div className="modal-box w-[500px]">
                    <h3 className="font-bold text-lg">Enter PIN to Transfer</h3>
                    <label onClick={open} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="w-[302px]">
                        <p className="py-4 text-[#3A3D4299]">Enter your 6 digits PIN for confirmation to continue transferring money. </p>
                    </div>
                    {message && <div className={`text-center ${message === 'pin match' ? 'text-green-500' : 'text-red-500'}`}>{message}</div>}
                    <div className="flex gap-5 pt-5">
                        <div className='border-2 p-2 rounded-xl'>
                            <div className='border-b-4 pb-3 items-center'>
                                <input className='w-10 h-10 focus:outline-none text-center' type='number' name='1' ref={input1} onChange={changeInput}/>
                            </div>
                        </div>
                        <div className='border-2 p-2 rounded-xl'>
                            <div className='border-b-4 pb-3 items-center'>
                                <input className='w-10 h-10 focus:outline-none text-center' type='number' name='2' ref={input2} onChange={changeInput}/>
                            </div>
                        </div>
                        <div className='border-2 p-2 rounded-xl'>
                            <div className='border-b-4 pb-3 items-center'>
                                <input className='w-10 h-10 focus:outline-none text-center' type='number' name='3' ref={input3} onChange={changeInput}/>
                            </div>
                        </div>
                        <div className='border-2 p-2 rounded-xl'>
                            <div className='border-b-4 pb-3 items-center'>
                                <input className='w-10 h-10 focus:outline-none text-center' type='number' name='4' ref={input4} onChange={changeInput}/>
                            </div>
                        </div>
                        <div className='border-2 p-2 rounded-xl'>
                            <div className='border-b-4 pb-3 items-center'>
                                <input className='w-10 h-10 focus:outline-none text-center' type='number' name='5' ref={input5} onChange={changeInput}/>
                            </div>
                        </div>
                        <div className='border-2 p-2 rounded-xl'>
                            <div className='border-b-4 pb-3 items-center'>
                                <input className='w-10 h-10 focus:outline-none text-center' type='number' name='6' ref={input6} onChange={changeInput}/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-action pt-10">
                        <button onClick={postTrx} disabled={message === 'pin match' ? false : true} className="btn btn-success">submit</button>
                    </div>
                </div>  
            </form>
        </div>
         : <></>}
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
                                <div className=''>
                                    <p className='text-2xl font-semibold text-[#3A3D42]'>Transfer To</p>
                                </div>
                                
                                <div className='flex flex-col gap-6 pt-10 pb-10'>
                                    <div className='w-[790px] h-[110px] rounded-xl bg-white shadow-md flex'>
                                        <div className='flex pl-5 items-center'>
                                            <Image width={100} height={100} className='w-[70px] h-[70px]' src={recipient.picture ? `${process.env.NEXT_PUBLIC_URL}/upload/${recipient.picture}` : users} alt="users" />
                                        </div>
                                        <div className='px-5 py-7'>
                                            <p className='text-xl text-[#514F5B] font-semibold'>{recipient?.firstName + ' ' + recipient?.lastName}</p>
                                            <p className='text-md text-[#7A7886] pt-1'>{recipient?.phoneNumber}</p>
                                        </div>
                                </div>

                                <div className=''>
                                    <p className='text-2xl font-semibold text-[#3A3D42]'>Details</p>
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
                                            <p className='text-2xl text-[#514F5B] font-semibold'>Rp {profil?.balance - trx.amount}</p>
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

                                    <div className='flex justify-end pt-10 pr-24'>
                                        <button onClick={open} className="btn w-[170px] h-[50px] bg-[#6379F4] rounded-lg text-white">Continue</button>
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

export default Confirmation