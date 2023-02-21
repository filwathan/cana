import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import * as Icon from 'react-feather'
import Image from 'next/image'
import users from '../assets/images/users.png'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import http from '../helpers/http'

const Profile = () => {
    const dispatch = useDispatch();
    const token = useSelector((state)=> state.auth.token)
    
    useEffect(() =>{
        getProfile()
    },[])

    // get profile
    const [profil, setProfil] = useState({});
    const getProfile = async () => {
        try{
            const { data } = await http(token).get(`/profile`);
            setProfil(data.results)
        }catch(err){
            setProfil({});
        }
    }

    //upload foto
    const [toggleUpload, setToggleUpload] = React.useState(false)
    const [uploadPhoto, setUploadPhoto] = React.useState(null)
    const [errorUpload, setErrorUpload] = React.useState('')

    const file = (e) => {
        setErrorUpload('')
        const imageExt = ['jpg', 'jpeg', 'png']
        const type = (e.type.slice(6))
        if(e.size <= 5000000){
            if(imageExt.includes(type)) {
                setUploadPhoto(e)
            }
            else {
                setErrorUpload('file must JPG, JPEG, or PNG')
            }
        }
        else {
            setErrorUpload('file size max 5MB')
        }
    }

    const closeModalUpload = () => {
        setToggleUpload(!toggleUpload)
        setUploadPhoto(null)
        setErrorUpload('')
    }

    const submitUpload = async () => {
        try {
            const form = new FormData()
            form.append('picture', uploadPhoto)
            const {data} = await http(token).post('/profile', form)
            console.log(data)
            getProfile()
            // setPersonal({...personal, picture: data.results.picture})
            setToggleUpload(!toggleUpload)
            setUploadPhoto(null)
            setErrorUpload('')
        } catch (error) {
            console.log(error)        
        }
    }

    //logout
    const navLogout = ()=>{
        dispatch(logout())
        router.push("/")
        
    }

  


  return (
    <div className='font-Nunito-sans'>
        {toggleUpload && 
            <div className='h-screen w-screen fixed flex justify-center items-center z-10 bg-zinc-100/50 overflow-y-hidden'>
                <div className='modal-box'>
                    <label onClick={() => closeModalUpload()}  className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold py-4">Please choise your file</h3>
                    {errorUpload && 
                        <p className="py-2 text-red-500">{errorUpload}</p>
                    }
                    
                    <input onChange={(e) => file(e.target.files[0])} type="file" className="file-input file-input-bordered file-input-warning w-full max-w-xs" />
                    <div className="modal-action">
                        <label onClick={submitUpload} className="btn">Upload</label>
                    </div>
                </div>
            </div>
        }
        <Header />
        <main className='py-10 px-36 flex gap-5 bg-slate-50'>
            <div className='flex-[0.2]'>
                <Navbar />
            </div>
            <div className='flex flex-col flex-[0.8] gap-5'>
                <div className='flex gap-5'>
                    <div className='bg-white flex flex-col flex-[1] h-full px-10 py-8 rounded-xl gap-10'>
                        <div>
                            <div className='pt-10'>
                                <div className='flex justify-center'>
                                    <Image className='w-[100px] h-[100px]' width={100} height={100} src={profil.picture ? `${process.env.NEXT_PUBLIC_URL}/upload/${profil.picture}` : users} alt="" />
                                    {/* <Image className='w-[100px] h-[100px]' width={100} height={100} src={users} alt="" /> */}
                                </div>

                                <div>
                                    <div onClick={() => setToggleUpload(!toggleUpload)} className='flex justify-center items-center gap-2 pt-5 text-[#7A7886]'>
                                        <Icon.Edit2 className='w-[12px] h-[12px]'/>
                                        <p className='text-xs'>Edit</p> 
                                    </div>
                                </div>

                                <div className='flex justify-center pt-5'>
                                    <div className='flex flex-col items-center'>
                                        <p className='text-xl font-semibold'>{profil.firstName} {profil.lastName}</p>
                                        <p className='text-[#7A7886] text-xs pt-3'>{profil.phoneNumber}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-6 items-center pt-10 pb-10'>
                                    <div className='w-[433px] h-[60px] border rounded-xl bg-[#E5E8ED]'>
                                        <div>
                                            <Link className='flex items-center justify-between px-5 py-[15px]' href='/personal-info'>
                                                <p className='text-xl'>Personal Information</p>
                                                <Icon.ArrowRight className='' />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className='w-[433px] h-[60px] border rounded-xl bg-[#E5E8ED]'>
                                        <div>
                                            <Link className='flex items-center justify-between px-5 py-[15px]' href='/change-password'>
                                                <p className='text-xl'>Change Password</p>
                                                <Icon.ArrowRight className='' />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className='w-[433px] h-[60px] border rounded-xl bg-[#E5E8ED]'>
                                        <div>
                                            <Link className='flex items-center justify-between px-5 py-[15px]' href='/change-pin'>
                                                <p className='text-xl'>Change Pin</p>
                                                <Icon.ArrowRight className='' />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className='w-[433px] h-[60px] border rounded-xl bg-[#E5E8ED]'>
                                        <div>
                                            <div onClick={navLogout} className='flex items-center justify-between px-5 py-[15px]' href='/'>
                                                <p className='text-xl'>Logout</p>
                                                <Icon.ArrowRight className='' />
                                            </div>
                                        </div>
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

export default Profile