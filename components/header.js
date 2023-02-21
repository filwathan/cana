import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import users from '../assets/images/users.png'
import * as Icon from 'react-feather'
import { useSelector } from 'react-redux';
import Link from 'next/link';
import axios from 'axios';

import http from '../helpers/http'

const Header = () => {
  const token = useSelector((state)=> state.auth.token)
  
  
  
  useEffect(() =>{
    getProfile()
  },[])

  //get profile
  const [profil, setProfil] = useState({});
  const getProfile = async () => {
    try{
      const { data } = await http(token).get(`/profile`);
      setProfil(data.results)
    }catch(err){
      setProfil({});
    }
  }

  //get notification
  const [notif, setNotif] = useState([])
  const getNotif = async () => {
    try {
      const {data} = await http(token).get('/transactions/notification?page=1&limit=5')
      setNotif(data.results)
    } catch (error) {
      setNotif([])
    }
  }

  useEffect(() => {
    getNotif()
  }, [])

  
  return (
    <header className='flex py-12 px-36 items-center font-Nunito-sans bg-white'>
        <Link className="text-xl flex-1 text-[#6379F4] font-bold" href="/home" >
          <div >CANA</div>
        </Link>
        <div className='flex gap-5 items-center text-[#3A3D42]'>
        {!token? 
          <div className="flex gap-5">
            <Link href="/login" >
              <button className="btn bg-white border border-[#6379F4] border-2 rounded-md h-10 w-[100px] font-Nunito-sans text-[#6379F4]">Login</button>
            </Link>
            <Link href="/register">
              <button className="btn bg-[#6379F4] border border-[#6379F4] rounded-md h-10 w-[100px] font-Nunito-sans text-white">Sign Up</button>
            </Link>
          </div> :
          <>
            <div className='h-12 w-12 rounded-2xl'>
            <Image width={100} height={100} src={profil.picture ? `${process.env.NEXT_PUBLIC_URL}/upload/${profil.picture}` : users} alt='profil'></Image>
            </div>
            <div>
                <div className='font-bold text-lg'>{profil && (profil.firstName) } {profil && (profil.lastName) }</div>
                <div className='font-normal text-sm'>{profil && (profil.phoneNumber) }</div>
            </div>            
            {/* <div><Icon.Bell /></div> */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn m-1"><Icon.Bell /></label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  {notif?.map((data, index) => (
                    <li key={index}>
                      <div className="relative flex flex-col pl-10 items-start">
                        <div className="text-[#7A7A7A] text-sm">
                          {data?.notes}
                        </div>
                        <div className="text-lg font-bold text-[#43484F]">
                          Rp{data?.amount}
                        </div>
                        {data?.type === "CREDIT" ? 
                          (<Icon.ArrowDown
                            style={{ color: "#4CEDB3" }}
                            className="absolute top-[35%] left-[5%]"
                          />) 
                          : 
                          (<Icon.ArrowUp
                            style={{ color: "#FF5B37" }}
                            className="absolute top-[35%] left-[5%]"
                          />)}
                      </div>
                    </li>
                  ))}
                  
                </ul>
            </div>  
          </>
        }         
                      
        </div>
    </header>
  )
}

export default Header