/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
    <fieldset className="relative pb-[0.5rem]">
    <input
  type={formState[showField] && formState[field] ? 'text' : 'password'}
  required
      id={field}
      value={formState[field]}
      placeholder=" "
      onChange={e => update({ [field]: e.target.value })}
      onBlur={validatePasswords}
      className="peer w-full border px-3 py-2 rounded-lg text-sm  focus:outline-none"
    />
  
    <label
      htmlFor={field}
      className={`absolute left-3 transition-all duration-200  bg-[var(--primary-white-hex)] px-1 
        text-sm text-gray-500 
        ${
          formState[field] || formState[showField]
            ? 'top-[-0.7rem] text-xs' // stay up if there's value or password is shown
            : 'top-[30%] -translate-y-1/2 peer-placeholder-shown:top-[39%] peer-placeholder-shown:text-sm peer-focus:top-[-0.1rem] peer-focus:text-xs'
        }`}
    >
      {label}
    </label>
  
    <button
      type="button"
      onClick={() => update({ [showField]: !formState[showField] })}
      className={`${formState[field] || formState[showField]?'top-[39%]':'top-[39%]'} absolute right-2  -translate-y-1/2`}
    >
      {formState[showField] ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
    </button>
  
    {field === 'confirmPassword' && formState.passwordMatchError && (
      <p className="text-[var(--darker-red-hex)] text-xs absolute left-1 -bottom-2">{formState.passwordMatchError}</p>
    )}
  </fieldset>
  
  );
  

  return (
   
        
        <section className="lg:w-full  w-1/2 bg-[var(--primary-white-hex)]  p-8 flex flex-col">
          <h3 className="text-2xl font-semibold mb-2 ">Register to SIPIN</h3>
          <p className="text-sm ">You can launch your investment platform in under 10 minutes.</p>
          <form autoComplete="off" className="flex-1 space-y-4 overflow-y-auto" onSubmit={handleSubmit}>
          <div className="flex lg:flex-col flex-row gap-6 pt-4">
  {/* First Name */}
  <div className="relative flex-1">
    <input
      type="text"
      id="firstName"
      required
      placeholder=" "
      value={formState.fullName}
      onChange={e => update({ fullName: e.target.value })}
      className="peer w-full border px-3 py-2 rounded-lg text-sm  focus:outline-none"
    />
    <label
      htmlFor="firstName"
      className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 transition-all duration-200 
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm 
        peer-focus:top-[-0.1rem] peer-focus:text-xs 
        ${formState.fullName ? 'top-[0.1rem] text-xs' : ''} bg-[var(--primary-white-hex)] px-1`}
    >
      First Name*
    </label>
  </div>

  {/* Last Name */}
  <div className="relative flex-1">
    <input
      type="text"
      id="lastName"
      placeholder=" "
      value={formState.lastName}
      onChange={e => update({ lastName: e.target.value })}
      className="peer w-full border px-3 py-2 rounded-lg text-sm  focus:outline-none"
    />
    <label
      htmlFor="lastName"
      className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 transition-all duration-200 
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm 
        peer-focus:top-[-0.1rem] peer-focus:text-xs 
        ${formState.lastName ? 'top-[0.1rem] text-xs' : ''} bg-[var(--primary-white-hex)] px-1`}
    >
      Last Name
    </label>
  </div>
</div>

<fieldset className='my-20'>
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
              
                className="w-full  px-4 rounded-lg border focus:outline-none text-sm bg-[var(--primary-white-hex)] phone-input-inner"
            />
{formState.phoneInputError && (
      <p className="pl-2 pt-2 text-[var(--darker-red-hex)] text-xs ">{formState.phoneInputError}</p>
    )}
 </fieldset>
            {/* Email */}
  <div className="relative flex-1 pb-3">
    <input
      type="email"
      id="email"
      required
      placeholder=" "
      value={formState.email}
      onChange={e => update({ email: e.target.value })}
      className="peer  w-full border px-3 py-2 rounded-lg text-sm  focus:outline-none"
    />
    <label
      htmlFor="email"
      className={`absolute left-3 top-[7%] -translate-y-1/2 text-sm text-gray-500 transition-all duration-200 
        peer-placeholder-shown:top-[38%] peer-placeholder-shown:text-sm 
        peer-focus:top-[0.1rem] peer-focus:text-xs 
        ${formState.email ? 'top-[0.1rem] text-xs' : ''} bg-[var(--primary-white-hex)] px-1`}
    >
      Email*
    </label>
  </div>

            {renderPasswordField('Password*', 'password', 'showPassword')}
            {renderPasswordField('Confirm Password*', 'confirmPassword', 'showConfirmPassword')}

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

            <button type="submit" className="w-full bg-[var(--primary-blue-hex)] text-white py-2 rounded-lg text-sm ">Create Account</button>

            <p className="text-center text-sm text-gray-500">
              Already have an account? <Link href="/login" className="text-blue-600 font-semibold">Login</Link>
            </p>
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
