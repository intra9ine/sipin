
import React from 'react';

import Image from 'next/image';
import LoginForm from '@/components/LoginForm';



const Login = () => {

  return (
   
      
    
     
   <section className=' w-full h-screen relative'>
    <section className='bg-[var(--primary-green-hex)] h-1/2'>
      <main className='w-1/2 lg:hidden pl-[6rem] lg:w-full text-[var(--primary-white-hex)] h-full flex gap-5 justify-center items-start flex-col'>
      <h1 className='text-4xl font-semibold'>Sign in to </h1>
      <h1 className='text-xl font-medium'>Lorem Ipsum is simply </h1>
      <p className='pt-3 xlg:w-3/4 xlgm:w-[80%] w-1/2 font-[300] leading-7'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,</p>
      </main>
    </section>
    <section className='bg-[var(--primary-white-hex)] h-1/2'>
      <main className='w-full lg:hidden pl-[6rem] pb-[4rem] h-full flex items-end'>
      <Image src={'/icons/footer-logo.svg'} alt='logo' width={100} height={100} className='w-[20rem]'/>
      </main>
    </section>
    <LoginForm/>
   </section>
       
      
    
     

  );
};

export default Login;
