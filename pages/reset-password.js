import Left from '../components/left';
import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';


const ResetPassword = () => {
    return (        
            <div className='h-screen flex'>
                <div className='h-full hidden md:flex flex-[0.6]'>
                    <Left />
                </div> 
                <div className='flex-1 md:flex-[0.4] px-14 py-[120px] overflow-scroll overflow-x-hidden text-[#688e51]'>
                    <div className='mb-10 text-2xl font-bold'>
                        <h1>Did You Forgot Your Password?
                            Don’t Worry, You Can Reset Your
                            Password In a Minutes.</h1>
                    </div>
                    <div className='text-md mb-14'>
                        <p >Now you can create a new password for your FazzPay account. Type your password twice so we can confirm your new passsword.</p>
                    </div>

                    <form>  
                        <div className="flex flex-col gap-8 mb-5">
                            <div className='border-b-2 flex gap-5 py-3 items-center '>
                                <Icon.Lock />
                                <input className='flex-1 focus:outline-none px-1' type="password" name="password" placeholder="Create new password" />  
                            </div>
                        </div>
                        <div className="flex flex-col gap-8 mb-5">
                            <div className='border-b-2 flex gap-5 py-3 items-center '>
                                <Icon.Lock />
                                <input className='flex-1 focus:outline-none px-1' type="password" name="confirmPassword" placeholder="Create Confirm password" />  
                            </div>
                        </div>    
                        <div className='pb-10'>
                            <Link href="/login">
                                <button className="btn text-center border rounded-md bg-[#1d2817] w-full" type='submit'>reset password</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        
    )
}

export default ResetPassword;