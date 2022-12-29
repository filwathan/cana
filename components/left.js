import Image from 'next/image';
import phoneLogin from '../assets/images/phoneLogin.png'

const Left = () => {
    return(        
            <div className="bg-bg-login bg-cover bg-no-repeat text-[#1d2817] py-12 px-20">
                    <div className='flex items-center'>
                        <p className='text-[30px] font-bold'>CANA</p>
                    </div>
                    <div>
                        <Image className='w-2/4 h-2/4' src={phoneLogin} alt='bg-login' />
                    </div>
                    <div className=''>
                        <p className='text-xl font-semibold'>App that Covering Banking Needs.</p>
                    </div>
                    <div className=' w-3/4'>
                        <p className='text-md'>CANA is an application that focussing in banking needs for all users
                            in the world. Always updated and always following world trends.
                            5000+ users registered in FazzPay everyday with worldwide
                            users coverage.</p>
                    </div>
                </div>
        
    )
}

export default Left;