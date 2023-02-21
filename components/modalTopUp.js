import React from "react";
import Link from "next/link";

import { useSelector } from 'react-redux';
import axios from 'axios'
import { useRouter } from 'next/router';


// const ModalTopUp = (statusModal) => {
const ModalTopUp = () => {
    const token = useSelector((state)=> state.auth.token)
    const router = useRouter();

    const postTopUp = async (value)=>{
        console.log("masuk sini")
        try{
            console.log("masuk ke top up")
            await axios.post(`${process.env.NEXT_PUBLIC_URL}/transactions/topup`, {amount: value}, {headers: {"authorization" : `Bearer ${token.token}`}})
            router.push("/home");
        }catch(err){
            console.log("masuk ke error")

        }
    }


    const updateTopUp = (e)=>{
        e.preventDefault()
        const topUp = e.target.topUp.value
        // console.log(topUp)
        // statusModal = 'hit dari modal'
        postTopUp(topUp)
    }


    return (
        <>
        <input type="checkbox" id="modalTopUp" className="modal-toggle" />
        <div className="modal" >
            <form onSubmit={updateTopUp}>
                <div className="modal-box w-[500px]">
                    <h3 className="font-bold text-lg">Top Up</h3>
                    <div className="w-[302px]">
                        <p className="py-4 text-[#3A3D4299]">Enter the amount of money, and click submit</p>
                    </div>
                    <div className="flex gap-5 pt-5">
                        <div className="border-2 border-black rounded-lg inline-block overflow-hidden">
                                <input type='number' name='topUp' className='outline-none px-2' placeholder="0" />
                        </div>
                    </div>
                    <div className="modal-action pt-10">
                        {/* <a href="/home" className="btn "> */}
                            <button type="submit" className="btn">submit</button>
                        {/* </a> */}
                    </div>
                </div>  
            </form>
        </div>
        </>
    )
}

export default ModalTopUp;