/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FormState, LoginFormProps } from '@/lib/type';
import { useRouter } from 'next/navigation';
import { fetchWithoutAuth } from '@/lib/apiData';
import { LOGIN_USER, TOKEN_VALUE, USER_NAME, USER_VALUE } from '@/lib/constant';
import Link from 'next/link';
import { setEncryptedLocalStorageItem } from '@/lib/helper';

interface LoginResponse {
  token: string;
  userData: {
    user_id: string;
    name:string;
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
        setEncryptedLocalStorageItem(USER_NAME,data.userData.name)
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
   
        
    <section className="lg:w-3/4 smxl:w-11/12 lg:mx-auto  absolute shadow-lg top-[4rem] bottom-[2rem] rounded-[2.5rem] right-[6rem] xlgm:right-[2rem] lg:right-0 lg:left-0 w-[35%] bg-[var(--primary-white-hex)]  p-8 smx:px-6 flex flex-col">
    <main className='flex justify-between'>
    <h1 className='text-lg smx:text-base mb-4'>Welcome to <span className='text-[var(--primary-green-hex)]'>SIPIN</span></h1>
      <h1 className='smx:text-sm text-[var(--light-shade-grey-hex)]'>No Account ?<br/>
     <Link href={'/register'} className='text-[var(--primary-green-hex)]'>Sign up</Link> 
      </h1>
      </main>
      
    <h3 className="text-4xl smx:text-3xl font-semibold mb-2 ">Sign in</h3>
          <form autoComplete="off" className="flex-1 space-y-4 overflow-y-auto" onSubmit={handleSubmit}>
          
          <div className="flex flex-col  gap-4 pt-8">
          <main className='text-sm flex flex-col gap-4 '>
            {/* Email */}
  <fieldset >
  <label
      
      >
       Enter your username or email address
      </label>
    <input
      type="email"
      name='email'
      required
      placeholder=" "
      value={formState.email}
      onChange={e => update({ email: e.target.value })}
      className="input--custom"
    />
  
  </fieldset>

  <fieldset >
  <label
      
      >
        Enter your Password
      </label>
    <input
  type={formState.showPassword ? 'text' : 'password'}
  required
  name='password'
      value={formState.password}
      placeholder=" "
      onChange={e => update({ password: e.target.value })}
      className="input--custom"
    />

    </fieldset>
    
  
  
  
   
<aside className='w-full pb-5 flex justify-end items-center'>
  <Link href={'/forgot-password'} className='text-[var(--primary-sky-blue-hex)]'>Forgot Password</Link>
</aside>
          
</main>
         

            <button type="submit" className="w-full bg-[var(--primary-green-hex)] text-white py-2 rounded-lg text-sm ">Sign in</button>

           
            </div>

          </form>
        <Toaster/>
        </section>
      
      
    
  );
};

export default LoginForm;
