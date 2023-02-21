import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import http from '../helpers/http'
import { useSelector } from 'react-redux'

const ChangePin = () => {
    const token = useSelector((state)=> state.auth.token);

    //make a next clomn value pin
    const [message, setMessage] = React.useState('')
    const input1 = React.useRef(null);
    const input2 = React.useRef(null);
    const input3 = React.useRef(null);
    const input4 = React.useRef(null);
    const input5 = React.useRef(null);
    const input6 = React.useRef(null);

    const changeInput = (e) =>{
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
            postPin(valuePin)
        }
        else {
            setMessage('pin must 6 digits')
        }

    };

    //update change pin
    const postPin = async (createPin) => {
        try {
            const {data} = await http(token).post('/profile/change-pin', {newPin: createPin})
            setMessage(data.message) 
        } catch (error) {
            setMessage(error.respone.data.message)            
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
                            <div className='font-bold mb-6'>Change PIN</div>
                            <div className='w-[342px] text-[#7A7886]'>Enter your current 6 digits Fazzpay PIN below to continue to the next steps.</div>
                        </div>
                    </div>                        
                    <div className='flex-1 text-[#A9A9A9CC]'>
                        <form className='flex flex-col gap-16 '>
                            {message && <div className={`text-center ${message === 'Data updated!' ? 'text-green-500' : 'text-red-500'}`}>{message}</div>}
                            <div className='flex justify-center gap-5 font-bold text-[#3A3D42] text-[30px]'>
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
                            <div className='flex justify-center '>
                                {/* <button className='btn w-1/2'>change pin</button> */}
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

export default ChangePin