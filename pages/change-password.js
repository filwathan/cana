import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import * as Icon from 'react-feather'
import http from '../helpers/http'
import { useSelector } from 'react-redux'
const ChangePassword = () => {
    const token = useSelector((state)=> state.auth.token)

    const [showPassOne, setShowPassOne] = React.useState(false);
    const [showPassTwo, setShowPassTwo] = React.useState(false);
    const [showPassThree, setShowPassThree] = React.useState(false);
    
    const [button, setButton] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const [password1, setPassword1] = React.useState(false);
    const [password2, setPassword2] = React.useState(false);
    const [password3, setPassword3] = React.useState(false);

    // set error value
    const pass1 = (e) => {
        setPassword1(e.target.value)
        if(password1.length && password2.length && password3.length ){
            setButton(true)
            setMessage('')      
        }
        else{
            setButton(false)
            setMessage('Field can not empty')
        }
    }

    const pass2 = (e) => {
        setPassword2(e.target.value)
        if(password1.length && password2.length && password3.length ){
            setButton(true)
            setMessage('')
        }
        else{
            setButton(false)
            setMessage('Field can not empty')
        }
    }

    const pass3 = (e) => {
        setPassword3(e.target.value)
        if(password1.length && password2.length && password3.length ){
            setButton(true)
            setMessage('')
        }
        else{
            setButton(false)
            setMessage('Field can not empty')
        }
    }

    //submit update password
    const updatePassword = async (e) => {
        e.preventDefault()
        if (password2 === password3) {
            try {
                const form = {
                    currentPassword: password1,
                    newPassword: password2,
                    confirmPassword: password3,
                }
                const {data} = await http(token).post('/profile/change-password', form)
                console.log(data)
                setButton(false)
                setMessage('Update Success')                
            } catch (error) {
                setButton(false)
                setMessage(error.response.data.message)
            }
            
        } else{
            setButton(false)
            setMessage('New Password and Confirm Password must same')
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
                <div className='bg-white flex flex-col flex-[0.5] px-10 py-8 rounded-xl gap-10'>
                    <div>
                        <div className='flex-1'>
                            <div className='font-bold mb-6'>Change Password</div>
                            <div className='w-[342px] text-[#7A7886]'>You must enter your current password and then type your new password twice.</div>
                        </div>
                    </div>                        
                    <div className='flex-1 text-[#A9A9A9CC]'>
                        <form onSubmit={updatePassword} className='flex flex-col gap-16 '>
                            {message && <div className={`text-center ${message === 'Update Success' ? 'text-green-500' : 'text-red-500'}`}>{message}</div>}
                            <div className='flex justify-center'>
                                <div className='border-b-4 flex gap-5 pb-3 items-center w-1/2'>
                                    <Icon.Lock/>
                                    <input onChange={pass1} className='flex-1 p-2 focus:outline-none'  type={!showPassOne ? 'password' : 'text'} name='currentPassword' placeholder='Current Password'></input>
                                    <div onClick={() => setShowPassOne(!showPassOne)}> {!showPassOne ? <Icon.EyeOff/> : <Icon.Eye/>} </div>
                                </div>
                            </div>                            
                            <div className='flex justify-center'>
                                <div className='border-b-4 flex gap-5 pb-3 items-center w-1/2'>
                                    <Icon.Lock/>
                                    <input onChange={pass2} className='flex-1 p-2 focus:outline-none' type={!showPassTwo ? 'password' : 'text'} name='newPassword' placeholder='New Password'></input>
                                    <div onClick={() => setShowPassTwo(!showPassTwo)}> {!showPassTwo ? <Icon.EyeOff/> : <Icon.Eye/>} </div>
                                </div>
                            </div>  
                            <div className='flex justify-center'>
                                <div className='border-b-4 flex gap-5 pb-3 items-center w-1/2'>
                                    <Icon.Lock/>
                                    <input onChange={pass3} className='flex-1 p-2 focus:outline-none' type={!showPassThree ? 'password' : 'text'} name='repeatNewPassword' placeholder='Repeat New Password'></input>
                                    <div onClick={() => setShowPassThree(!showPassThree)}> {!showPassThree ? <Icon.EyeOff/> : <Icon.Eye/>} </div>
                                </div>
                            </div>  
                            <div className='flex justify-center '>
                                <button disabled={!button} className='btn w-1/2 btn-success' type='submit'>Change Password</button>
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

export default ChangePassword