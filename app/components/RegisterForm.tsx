/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FormState } from '@/lib/type';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import 'react-international-phone/style.css';
import dynamic from 'next/dynamic';
// Dynamically import the PhoneInput component to disable SSR
const PhoneInput = dynamic(() => import('react-international-phone').then(mod => mod.PhoneInput), { ssr: false });

// TypeScript type for the country
import type { ParsedCountry } from 'react-international-phone';
import PopupModal from '@/components/PopupModal';
import { fetchWithoutAuth } from '@/lib/apiData';
import { REGISTER_USER } from '@/lib/constant';
import Link from 'next/link';



const RegisterForm = () => {
  const [formState, setFormState] = useState<FormState>({
    fullName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    passwordMatchError: '',
    phoneInputError:''
  });
  const [country, setCountry] = useState<ParsedCountry | null>(null);
  const update = (data: Partial<FormState>) => setFormState(prev => ({ ...prev, ...data }));
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [agreed, setAgreed] = useState(false);



  const handleOpen = (type: 'terms' | 'privacy') => {
    setModalTitle(type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy');
    setModalContent(
      type === 'terms'
        ? `Your terms and conditions go here...`
        : `Your privacy policy content goes here...`
    );
    setShowModal(true);
  };
  
  const isValidPhoneNumber = (phone: string, country: CountryCode) => {
    const phoneNumber = parsePhoneNumberFromString(phone, country);
    return phoneNumber?.isValid() || false;
  };
  const validatePasswords = () => {
    if (formState.password !== formState.confirmPassword) {
      update({ passwordMatchError: 'Passwords do not match' });
      return false;
    }
    update({ passwordMatchError: '' });
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validatePasswords()) return;
  
    const isPhoneValid = isValidPhoneNumber(formState.phoneNumber, country as any);
    if (!isPhoneValid) {
      update({ phoneInputError: 'Invalid Phone Number' });
      return;
    }
    update({ phoneInputError: '' });
  
    const reqData = {
      email: formState.email,
      first_name: formState.fullName,
      last_name: formState.lastName,
      phone_number: formState.phoneNumber,
      password: formState.password,
    };
  
    try {
      const res = await fetchWithoutAuth(REGISTER_USER, 'POST', reqData);
  
      if (res.status === 'success') {
        toast.success(res.data?.toString() || 'Registration successful');
      } else {
        toast.error(res.data?.toString() || 'Something went wrong');
      }
    } catch (error) {
      toast.error(`${error}` || 'Unexpected error');
    }
  };
  
  const renderPasswordField = (
    label: string,
    field: 'password' | 'confirmPassword',
    showField: 'showPassword' | 'showConfirmPassword'
  ) => (
    <fieldset className="pb-[0.5rem]">
      <label
    >
     {label}<span className='text-[var(--primary-red-hex)]'>*</span>
    </label>
    <input
  type={formState[showField] && formState[field] ? 'text' : 'password'}
  required
      id={field}
      value={formState[field]}
      placeholder={field==='password'?"Password":'Confirm Password'}
      onChange={e => update({ [field]: e.target.value })}
      onBlur={validatePasswords}
      className="input--custom"
    />
  
    
  
  
  
    {field === 'confirmPassword' && formState.passwordMatchError && (
      <p className="text-[var(--darker-red-hex)] text-xs ">{formState.passwordMatchError}</p>
    )}
  </fieldset>
  
  );
  

  return (
   
    <section className="lg:w-3/4 sm:w-10/12 smxl:w-11/12 lg:mx-auto  absolute shadow-lg top-[4rem] bottom-[2rem] rounded-[2.5rem] right-[6rem] xlgm:right-[2rem] lg:right-0 lg:left-0 w-[35%] xlg:w-[40%] xlgm:w-1/2 bg-[var(--primary-white-hex)]  p-8 smx:px-6 flex flex-col">
          <main className='flex justify-between'>
          <h1 className='text-lg smx:text-base mb-4'>Welcome to <span className='text-[var(--primary-green-hex)]'>SIPIN</span></h1>
            <h1 className='smx:text-sm text-[var(--light-shade-grey-hex)]'>Have an Account ?<br/>
           <Link href={'/login'} className='text-[var(--primary-green-hex)]'>Sign in</Link> 
            </h1>
            </main>
            
          <h3 className="text-4xl smx:text-3xl font-semibold mb-2 ">Sign up</h3>
          <form autoComplete="off" className="flex-1 space-y-4 overflow-y-auto" onSubmit={handleSubmit}>
         <main className='overflow-y-scroll smx:text-sm flex flex-col gap-4 h-[50vh] lg:h-auto'>
          <div className="flex  w-full lg:flex-col flex-row gap-6 pt-4">
  {/* First Name */}
  <fieldset className='w-1/2 lg:w-full'>
  <label
      
    >
      First Name<span className='text-[var(--primary-red-hex)]'>*</span>
    </label>
    <input
      type="text"
      required
      placeholder="First Name"
      value={formState.fullName}
      onChange={e => update({ fullName: e.target.value })}
      className="input--custom"
    />
   
  </fieldset>

  {/* Last Name */}
  <fieldset className='w-1/2 lg:w-full'>
  <label
      
    >
      Last Name<span className='text-[var(--primary-red-hex)]'>*</span>
    </label>
    <input
      type="text"
      id="lastName"
      placeholder="Last Name"
      value={formState.lastName}
      onChange={e => update({ lastName: e.target.value })}
     className="input--custom"
    />
    
  </fieldset>
</div>

<fieldset>
<label
      
    >
      Contact Number<span className='text-[var(--primary-red-hex)]'>*</span>
    </label>
            <PhoneInput
             defaultCountry="in"
             name='phone'
              value={formState.phoneNumber}
              onChange={(
                phone: string,
                meta: { country: ParsedCountry; inputValue: string }
              ) => {
                update({ phoneNumber: phone || '' })
                setCountry(meta.country);
              }}
              
                className="input--custom py-[0.1rem]"
            />
{formState.phoneInputError && (
      <p className="pl-2 pt-2 text-[var(--darker-red-hex)] text-xs ">{formState.phoneInputError}</p>
    )}
 </fieldset>
            {/* Email */}
  <fieldset>
  <label
      
    >
      Email<span className='text-[var(--primary-red-hex)]'>*</span>
    </label>
    <input
      type="email"
      id="email"
      required
      placeholder="Email is here"
      value={formState.email}
      onChange={e => update({ email: e.target.value })}
      className="input--custom"
    />
   
  </fieldset>

            {renderPasswordField('Password', 'password', 'showPassword')}
            {renderPasswordField('Confirm Password', 'confirmPassword', 'showConfirmPassword')}
            </main>
            <div className="flex items-start pl-[1rem] gap-2 mt-4">
        <input
          type="checkbox"
          id="agree"
          required
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <p className="text-xs text-gray-500">
          By signing up, you agree to{' '}
          <button
            type="button"
            onClick={() => handleOpen('terms')}
            className="underline text-blue-600"
          >
            Terms
          </button>{' '}
          and{' '}
          <button
            type="button"
            onClick={() => handleOpen('privacy')}
            className="underline text-blue-600"
          >
            Privacy Policy
          </button>
          .
        </p>
      </div>

            <button type="submit" className="w-full bg-[var(--primary-green-hex)] text-[var(--primary-white-hex)] py-3 rounded-lg ">Create Account</button>

           
          </form>
          {showModal && (
        <PopupModal
          title={modalTitle}
          content={modalContent}
          onClose={() => setShowModal(false)}
        />
      )}
      <Toaster/>
        </section>
      
      
    
  );
};

export default RegisterForm;
