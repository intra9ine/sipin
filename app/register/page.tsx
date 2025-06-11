
import React from 'react';
import RegisterForm from '@/components/RegisterForm';



const Register = () => {

  return (
    <main className=" font-poppins h-screen flex justify-center items-center  ">
      
      <section className="w-full lg:pt-20 flex lg:flex-col flex-row  ">
     
   <section className='lg:hidden bg-[url("/register-bg.webp")] bg-center bg-no-repeat bg-cover w-3/4 xlgm:w-1/2 h-screen'></section>
        {/* Form Section */}
      <RegisterForm/>
      </section>
     
    </main>
  );
};

export default Register;
