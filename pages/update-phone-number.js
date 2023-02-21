import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import * as Icon from 'react-feather'

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import http from '../helpers/http'

const UpdatePhoneNumber = () => {
    const token = useSelector((state)=> state.auth.token)
    const router = useRouter();


    //update phone number 
    const [buttonDissable, setButtonDissable] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const updatePhoneNumber = async (e)=>{
        e.preventDefault()
        const value = e.target.phoneNumber.value
        try{
            const {data} = await http(token).post(`/profile/phone-number`, {phoneNumber: value});
            setMessage('update success')
            setButtonDissable(false)
            // router.push("/profile");
        }catch(err){
            console.log("masuk ke error")
            setMessage('error')
            setButtonDissable(false)
        }
    }

    const changeInput = (e) => {
        setMessage()
        if(e.target.value.length){
            setButtonDissable(false)
        }
        else{
            setButtonDissable(true)
        }
    }


  return (
    <div className='font-nunitoSans'>
        <Header />
        <main className='py-10 px-36 flex gap-5'>
            <div className='flex-[0.2]'>
                <Navbar />
            </div>
            <div className='flex flex-col flex-[0.8] gap-5'>
                <div className='bg-white flex flex-col flex-1 px-10 py-8 rounded-xl gap-20 '>
                    <div>
                        <div className='flex-1'>
                            <div className='font-bold mb-6'>Edit Phone Number</div>
                            <div className='w-[342px] text-[#7A7886]'>Add at least one phone number for the transfer ID so you can start transfering your money to another user.</div>
                        </div>
                    </div>                        
                    <div className='flex-1 text-[#A9A9A9CC]'>
                        <form onSubmit={updatePhoneNumber} className='flex flex-col gap-16 '>
                            <div className='flex justify-center'>
                                <div className='border-b-4 flex gap-5 pb-3 items-center w-1/2'>
                                    <Icon.Phone/>
                                    <span className='text-black'>+62</span>
                                    <input onChange={changeInput} className='flex-1 p-2 focus:outline-none' type='text' name='phoneNumber' placeholder='Enter your phone number'></input>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <button disabled={buttonDissable} className='btn btn-success w-1/2'>Edit Phone Number</button>
                            </div>
                            <div className='flex justify-center'>
                                {!message ? <div></div> : message ===  'update success' ? 
                                    <div className="alert alert-success shadow-lg w-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>{message}</span>
                                    </div> :
                                    <div className="alert alert-error shadow-lg w-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>{message}</span>
                                    </div>
                                }
                                
                            </div>
                        </form>
                        
                    </div>                        
                </div>
            </div>
        </main>
        <Footer />
    </div>
  )
}

export default UpdatePhoneNumber