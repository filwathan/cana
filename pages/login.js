import Left from '../components/left';
import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/action/auth";
import { useRouter } from 'next/router';

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .password()
    .min(8, "Min lenght 8")
    .minLowercase(1, "Min lowercase 1")
    .minUppercase(1, "Min uppercase 1")
    .minNumbers(1, "Min numbers 1")
    .minSymbols(1, "Min symbol 1")
    .required("Required"),
});

const Login = () => {
    const {error} = useSelector((state)=> state.auth)
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = (value) => {
        const email = value.email;
        const password = value.password;
        dispatch(loginAction({ email, password, cb: () => router.push("/") }));
      };


    return (        
            <div className='h-screen flex'>
                <div className='h-full hidden md:flex flex-[0.6]'>
                    <Left />
                </div>   
                <div className='flex-1 md:flex-[0.4] px-14 py-[120px] overflow-scroll overflow-x-hidden text-[#688e51]'>
                    <div className='mb-10 text-2xl font-bold'>
                        <h1 >Start Accessing Banking Needs
                            With All Devices and All Platforms
                            With 30.000+ Users</h1>
                    </div>
                    <div className='text-md mb-14'>
                        <p >Transfering money is eassier than ever, you can access CANA wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
                    </div>

                    {error? (
                        <div className="alert alert-error shadow-lg">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{error}</span>
                            </div>
                        </div>
                    ) : null}
                    <Formik
                    initialValues={{
                        email: "",
                        password:""
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                    >
                        {({errors, touched }) =>(
                            <Form>
                                <div className="flex flex-col gap-8 mb-5">
                                    <div className='border-b-2 flex gap-5 py-3 items-center '>
                                        <Icon.Mail className=''/>
                                        <Field className='flex-1 focus:outline-none px-1' type="email" name="email" placeholder="Enter your e-mail" />  
                                    </div>
                                    {errors.email && touched.email ? (<div className="text-red-500">{errors.email}</div>) : null}
                                    <div className='border-b-2 flex gap-5 py-3 items-center '>
                                        <Icon.Lock className=''/>
                                        <Field className='flex-1 focus:outline-none' type="password" name="password" placeholder="Enter your password" />                                          
                                    </div>
                                    {errors.password && touched.password ? (<div className="text-red-500">{errors.password}</div>) : null}
                                </div>
                                <div className='text-end text-sm mb-16'>
                                    <Link href='/forgot-password'>
                                        <p >Forgot password?</p>
                                    </Link>
                                </div>
                                <div className='pb-10'>
                                    <button className="btn text-center border rounded-md bg-[#1d2817] w-full" type='submit'>Login</button>
                                </div>
                                <div className='flex justify-center gap-5'>
                                    <p>Don’t have an account? Let’s </p>
                                    <Link href='/register'> <p className='text-[#1d2817]'>Sign Up</p></Link>
                                </div>
                            </Form>

                        )}

                        
                    </Formik>
                </div>
            </div>
        
    )
}

export default Login;