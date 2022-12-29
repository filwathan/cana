import Image from 'next/image';
import bg from '../assets/images/phone-landing.png'
import gplay from '../assets/images/gplay.png'
import apple from '../assets/images/appstore.png'
import microsoft from '../assets/images/microsoft.png'
import dropbox from '../assets/images/dropbox.png'
import hm from '../assets/images/h&m.png'
import airbnb from '../assets/images/airbnb.png'
import canon from '../assets/images/canon.png'
import dell from '../assets/images/dell.png'
import phone2 from '../assets/images/phone2.png'
import lock from '../assets/images/lock.png'
import download from '../assets/images/download.png'
import phone3 from '../assets/images/phone-3.png'
import users from '../assets/images/users.png'

import Header from '../components/header'

const LandingPage = () => {
  return(
    <div>
      <div>
        <section className='bg-slate-50'>
          {/* <nav className="flex px-32 pt-14 items-center w-screen">
              <div className="text-xl font-Nunito-sans flex-1 text-[#6379F4] font-bold">CANA</div>
                <div className="flex gap-5">
                  <div className=" ">
                    <button className="btn bg-white border border-[#6379F4] border-2 rounded-md h-10 w-[100px] font-Nunito-sans text-[#6379F4]">Login</button>
                  </div>
                  <div>
                    <button className="btn bg-[#6379F4] border border-[#6379F4] rounded-md h-10 w-[100px] font-Nunito-sans text-white">Sign Up</button>
                  </div>
                </div>
            </nav> */}
            <Header></Header>

            <div className='grid grid-cols-[720px_minmax(720px,_1fr)] pb-20'>
                <div className='pl-32'>
                  <Image src={bg} alt="mobile-view"/>
                </div>

                <div className="">
                  <div className='pt-[200px]'>
                    <div className='w-[474px]'>
                      <h1 className='text-6xl font-semibold leading-[80px]'>Awesome App For Saving <span className='text-[#6379F4]'>Time.</span></h1>
                    </div>
                    <div className='w-[474px] pt-[30px]'>
                      <p className='text-lg font-normal text-md'>We bring you a mobile app for banking problems that oftenly wasting much of your times.</p>
                    </div>
                    <div className='pt-[50px]'>
                      <button className='btn bg-[#6379F4] border border-[#6379F4] rounded-md h-10 w-[100px] font-Nunito-sans text-white'>Try it free</button>
                    </div>
                    <div className='pt-[70px]'>
                      <p>Available on</p>
                      <div className='flex gap-5 pt-5'>
                        <Image src={gplay} alt="goole-play" />
                        <Image src={apple} alt="app -store" />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </section>

        <section>
          <div className='bg-[#473AD10F] border h-[200px]'>
            <div className='flex justify-center items-center px-20 pt-10'>
              <div className='flex gap-3'>
                <Image src={microsoft} alt="microsoft-logo"/>
                <Image src={dropbox} alt="dropbox-logo"/>
                <Image src={hm} alt="h&m-logo"/>
                <Image src={airbnb} alt="airbnb-logo"/>
                <Image src={canon} alt="canon-logo"/>
                <Image src={dell} alt="dell-logo"/>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-slate-50'>
          <div className='flex flex-col justify-center items-center pt-20'>
            <div>
              <h1 className=' text-6xl font-semibold'><span className='text-[#6379F4]'>About</span> the Application.</h1>
            </div>
            <div className='w-[500px] pt-[30px]'>
              <p className='text-center text-md'>We have some great features from the application and it’s totally free to use by all users around the world.</p>
            </div>
          </div>
          
          <div className='flex justify-center items-center gap-5 pt-20 pb-20'>
            <div className='hover:border rounded-xl w-[300px] h-[280px] bg-bg-slate-50 hover:bg-white flex flex-col items-center'>
              <div className='flex justify-center items-center mt-5'>
                <Image src={phone2} alt="mobile-view"/>
              </div>
              <div className='flex justify-center items-center'>
                <p className='text-xl font-semibold'>24/7 Support</p>
              </div>
              <div className='w-[200px] h-[93px] pt-5'>
                <p className='text-center text-xs text-[#3A3D42E5] leading-6'>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</p>
              </div>
            </div>

            <div className='hover:border rounded-xl w-[300px] h-[280px] bg-bg-slate-50 hover:bg-white flex flex-col items-center'>
              <div className='flex justify-center items-center mt-5'>
                <Image src={lock} alt="lock"/>
              </div>
              <div className='flex justify-center items-center'>
                <p className='text-xl font-semibold'>Data Privacy</p>
              </div>
              <div className='w-[200px] h-[93px] pt-5'>
                <p className='text-center text-xs text-[#3A3D42E5] leading-6'>We make sure your data is safe in our database and we will encrypt any data you submitted to us.</p>
              </div>
            </div>

            <div className='hover:border rounded-xl w-[300px] h-[280px] bg-bg-slate-50 hover:bg-white flex flex-col items-center'>
              <div className='flex justify-center items-center mt-5'>
                <Image src={download} alt="download"/>
              </div>
              <div className='flex justify-center items-center'>
                <p className='text-xl font-semibold'>Easy Download</p>
              </div>
              <div className='w-[200px] h-[93px] pt-5'>
                <p className='text-center text-xs text-[#3A3D42E5] leading-6'>CANA is 100% totally free to use it’s now available on Google Play Store and App Store.</p>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-[#473AD10F]'>
          <div className='grid grid-cols-[720px_minmax(720px,_1fr)] pb-20'>
            <div className='pt-20'>
                <div className='pl-32'>
                  <Image src={phone3} alt="mobile-view"/>
                </div>
            </div>

            <div>
                <div className='w-[606px] pt-[180px]'>
                    <h1 className='text-6xl font-semibold leading-[90px] font-nunito'>All The <span className='text-[#6379F4]'>Great</span> CANA Features.</h1>
                </div>
                <div className='w-[620px] h-[120px] border rounded-[25px] bg-white mt-10 px-5 py-5'>
                    <div>
                        <p className='text-xl font-semibold'><span className='text-[#6379F4]'>1.</span> Small Fee</p>
                        <p className='text-[#3A3D42E5] text-lg pt-2'>We only charge 5% of every success transaction done in CANA app.</p>
                    </div>
                </div>

                <div className='w-[620px] h-[120px] border rounded-[25px] bg-white mt-10 px-5 py-5'>
                    <div>
                        <p className='text-xl font-semibold'><span className='text-[#6379F4]'>2.</span> Data Secured</p>
                        <p className='text-[#3A3D42E5] text-lg pt-2'>All your data is secured properly in our system and it’s encrypted.</p>
                    </div>
                </div>

                <div className='w-[620px] h-[120px] border rounded-[25px] bg-white mt-10 px-5 py-5'>
                    <div>
                        <p className='text-xl font-semibold'><span className='text-[#6379F4]'>3.</span> User Friendly</p>
                        <p className='text-[#3A3D42E5] text-lg pt-2'>CANA come up with modern and sleek design and not complicated.</p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        <section className='bg-slate-50'>
            <div className='flex flex-col justify-center items-center pt-20'>
              <div>
                <h1 className=' text-6xl font-semibold'>What Users are<span className='text-[#6379F4]'>Saying.</span></h1>
              </div>
              <div className='w-[500px] pt-[40px]'>
                <p className='text-center text-md'>We have some great features from the application and it’s totally free to use by all users around the world.</p>
              </div>
            </div>

            <div className='flex justify-center pt-14 pb-20'>
              <div className='w-[988px] h-[466px] bg-white border rounded-xl'>
                <div className='flex justify-center pt-14'>
                  <Image src={users} alt="users"/>
                </div>
                <div className='flex flex-col justify-center items-center pt-10 '>
                  <p className='text-xl font-semibold'>Alex Hansinburg</p>
                  <p className='text-[#56585B] pt-3'>Designer</p>
                  <div className='w-[770px] pt-12'>
                    <p className='text-[#676A71] text-center text-md'>“This is the most outstanding app that I’ve ever try in my live, this app is such an amazing masterpiece and it’s suitable for you who is bussy with their bussiness and must transfer money to another person aut there. Just try this app and see the power!”</p>
                  </div>
                </div>
              </div>
            </div>
        </section>

        <section>
          <footer className="footer pl-32 pt-16 pb-14 bg-[#6379F4] text-neutral-content">
              <div>
                <p className='text-2xl text-white font-semibold'>CANA</p>
                <p className='text-[#EFEFEFBF] pt-8 text-sm'>Simplify financial needs and saving<br/>much time in banking needs with<br/>one single app.</p>
                <hr className='mr-32 mt-10'/>
              </div> 
              <div className='flex justify-between pt-5'>
                <p className='text-[#EFEFEFE5]'>2020 FazzPay. All right reserved.</p>
                <div className='flex gap-7 pr-32'>
                  <p className='text-[#EFEFEFE5]'>+62 813 8826 2406</p>
                  <p className='text-[#EFEFEFE5]'>contact@barengan-ajah.com</p>
                </div>
              </div>
          </footer>
        </section>
      </div>
    </div>
  )
}

export default LandingPage;