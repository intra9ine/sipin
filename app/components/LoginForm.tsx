/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FormState, LoginFormProps } from '@/lib/type';
import { useRouter } from 'next/navigation';
import { fetchWithoutAuth } from '@/lib/apiData';
import { LOGIN_USER, TOKEN_VALUE, USER_VALUE } from '@/lib/constant';
import Link from 'next/link';
import { setEncryptedLocalStorageItem } from '@/lib/helper';

interface LoginResponse {
  token: string;
  userData: {
    user_id: string;
  };
}


const LoginForm = () => {
  const [formState, setFormState] = useState<LoginFormProps>({
    email: '',
    password: '',
    showPassword: false
  });
  const router=useRouter()
  const update = (data: Partial<FormState>) => setFormState(prev => ({ ...prev, ...data }));
  

  

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reqData={
        email:formState.email,
        password:formState.password
      }
      const res=await fetchWithoutAuth(LOGIN_USER,'POST',reqData)
      if (res.status === 'success') {
        const data = res.data as LoginResponse;
        setEncryptedLocalStorageItem(TOKEN_VALUE,data.token)
        setEncryptedLocalStorageItem(USER_VALUE,String(data.userData.user_id))
        toast.success('Login successful');
        router.push('/dashboard')
      } else {
        toast.error(res.data?.toString() || 'Something went wrong');
      }
     
    } catch (error) {
      console.error(`${error}` || 'Unexpected error');
    }
   
  };


  

  return (
   
        
        <section className="lg:w-full  w-1/2 bg-[var(--primary-white-hex)]  p-8 flex flex-col">
          <h3 className="text-2xl font-semibold ">Login to SIPIN</h3>
          <form autoComplete="off" className="flex-1 space-y-4 overflow-y-auto" onSubmit={handleSubmit}>
          <div className="flex flex-col  gap-4 pt-8">

            {/* Email */}
  <div className="relative flex-1 pb-3">
    <input
      type="email"
      required
      name='email'
      placeholder=" "
      value={formState.email}
      onChange={e => update({ email: e.target.value })}
      className="peer  w-full border  px-3 py-2 rounded-lg text-sm  focus:outline-none"
    />
    <label
      htmlFor="email"
      className={`absolute left-3 top-[7%] -translate-y-1/2 text-sm text-gray-500 transition-all duration-200 
        peer-placeholder-shown:top-[38%] peer-placeholder-shown:text-sm 
        peer-focus:top-[-0.1rem] peer-focus:text-xs 
        ${formState.email ? 'top-[0.1rem] text-xs' : ''} bg-[var(--primary-white-hex)] px-1`}
    >
      Email*
    </label>
  </div>

  <fieldset className="relative pb-[0.5rem]">
    <input
  type={formState.showPassword ? 'text' : 'password'}
  required
  name='password'
      value={formState.password}
      placeholder=" "
      onChange={e => update({ password: e.target.value })}
      className="peer w-full border px-3 py-2 rounded-lg text-sm  focus:outline-none"
    />
  
    <label
      htmlFor={'password'}
      className={`absolute left-3 transition-all duration-200  bg-[var(--primary-white-hex)] px-1 
        text-sm text-gray-500 
        ${
          formState.password || formState.showPassword
            ? 'top-[-0.7rem] text-xs' // stay up if there's value or password is shown
            : 'top-[30%] -translate-y-1/2 peer-placeholder-shown:top-[39%] peer-placeholder-shown:text-sm peer-focus:top-[-0.1rem] peer-focus:text-xs'
        }`}
    >
      Password*
    </label>
  
    <button
      type="button"
      onClick={() => update({ showPassword: !formState.showPassword })}
      className={`${formState.password || formState.showPassword?'top-[39%]':'top-[39%]'} absolute right-2  -translate-y-1/2`}
    >
      {formState.showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
    </button>
  
   
  </fieldset>
          

         

            <button type="submit" className="w-full bg-[var(--primary-blue-hex)] text-white py-2 rounded-lg text-sm ">Login</button>

            <p className="text-center text-sm text-gray-500">
              {`Don't have an account?`} <Link href="/register" className="text-blue-600 font-semibold">Register</Link>
            </p>
            </div>

          </form>
        <Toaster/>
        </section>
      
      
    
  );
};

export default LoginForm;
