

'use client';

import React, { useState } from 'react';
import { FaAppStore, FaClipboardList, FaEye, FaEyeSlash } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import 'react-phone-number-input/style.css';

import { SiG2A, SiTrustpilot } from 'react-icons/si';
import { toast } from 'react-hot-toast';
import { FormState } from '@/lib/type';

const PhoneInput = dynamic(() => import('react-phone-number-input'), { ssr: false });

const Register = () => {
  const [formState, setFormState] = useState<FormState>({
    fullName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    companySector: '',
    password: '',
    confirmPassword: '',
    companyDoc: null,
    domain: '',
    showPassword: false,
    showConfirmPassword: false,
    passwordMatchError: '',
    fileSizeError: '',
  });

  const updateFormState = (updates: Partial<FormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  };

  const validatePasswords = () => {
    if (formState.password && formState.confirmPassword && formState.password !== formState.confirmPassword) {
      updateFormState({ passwordMatchError: 'Passwords do not match' });
      return false;
    }
    updateFormState({ passwordMatchError: '' });
    return true;
  };

  const validateFileSize = (file: File | null) => {
    if (file && file.size > 2 * 1024 * 1024) {
      updateFormState({ fileSizeError: 'File size must not exceed 2MB' });
      return false;
    }
    updateFormState({ fileSizeError: '' });
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateFormState({ companyDoc: file });
    validateFileSize(file);
  };

  const togglePasswordVisibility = () => {
    updateFormState({ showPassword: !formState.showPassword });
  };

  const toggleConfirmPasswordVisibility = () => {
    updateFormState({ showConfirmPassword: !formState.showConfirmPassword });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords() || !validateFileSize(formState.companyDoc)) {
      return;
    }
    if (
      !formState.fullName ||
      !formState.email ||
      !formState.phoneNumber ||
      !formState.companyName ||
      !formState.companySector ||
      !formState.password ||
      !formState.domain ||
      !formState.companyDoc
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }
    toast.success('Registration successful!');
    // Add API call or navigation logic here
    // Example: router.push('/dashboard');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--lighter-grey-hex)] px-4">
      <section className="w-full max-w-[1400px] xtraSmall:max-w-[300px] smallMobile:max-w-[360px] mobile:max-w-[400px] tablet:max-w-[900px] laptop:max-w-[1300px] h-auto tablet:h-[400px] laptop:h-[700px] flex flex-col tablet:flex-row rounded-2xl shadow-2xl overflow-hidden">
        <aside className="hidden tablet:flex w-full tablet:w-1/2 bg-[var(--primary-blue-hex)] text-[var(--primary-white-hex)] flex-col justify-start p-6 relative overflow-hidden">
          <div className="flex items-center space-x-2 mb-4">
            <img src="/icons/logo.png" alt="Logo" className="w-8 h-auto" />
         
          </div>
          <main className="max-w-md mt-4">
            <h1 className="text-4xl leading-tight mb-2 font-poppins text-[var(--primary-white-hex)] whitespace-nowrap">
              Build a modern and flexible
            </h1>
            <mark className="text-3xl mb-4 inline-block px-3 py-2 rounded bg-gradient-to-r from-green-400 via-green-500 to-blue-500 text-white font-semibold font-poppins">
              job board in minutes
            </mark>
            <p className="text-base leading-relaxed mb-8 text-white font-poppins">
              Artha job board allows you to earn revenue & generate employment by providing you a ready-to-use job board platform.
            </p>
           
            <p className="text-md text-white mb-5">5 Star based on reviews</p>
            <footer className="text-white">
              <span className="flex flex-wrap gap-6 items-center text-sm font-medium">
                <span className="flex items-center gap-2 text-lg font-semibold font-poppins">
                  <SiG2A size={18} /> G2 CROWD
                </span>
                <span className="flex items-center gap-2 text-lg font-semibold font-poppins">
                  <FaClipboardList size={18} /> Capterra
                </span>
                <span className="flex items-center gap-2 text-lg font-semibold font-poppins">
                  <SiTrustpilot size={18} /> TrustRadius
                </span>
              </span>
              <span className="flex items-center gap-2 mt-2 text-lg font-semibold font-poppins">
                <FaAppStore size={20} /> GetApp
              </span>
            </footer>
          </main>
          <img
            src="/registerImage.webp"
            alt="Register Illustration"
            className="absolute bottom-0 right-0 w-[26rem] max-w-full h-auto object-contain"
          />
        </aside>
        <section className="w-full tablet:w-1/2 bg-[var(--primary-white-hex)] p-4 smallMobile:p-6 tablet:p-8 flex flex-col laptop:max-h-screen max-h-[calc(100vh-4rem)]">
          <h3 className="text-2xl font-semibold text-left mb-1 font-poppins sticky top-0 bg-[var(--primary-white-hex)] z-10 pb-0">
            Register Your Account
          </h3>
          <p className="text-sm text-[var(--medium-grey-hex)] mb-4 mt-0">
            Start building your job board in under 10 minutes. 14-day free trial. No credit card required.
          </p>
          <form className="space-y-4 overflow-y-auto flex-1 scrollbar-hidden" onSubmit={handleSubmit}>
            <div className="flex flex-col xtraSmall:flex-row gap-4">
              <fieldset className="flex-1">
                <label className="block text-sm font-medium text-[var(--primary-black-hex)] mb-0.5 font-poppins">First Name*</label>
                <input
                  type="text"
                  value={formState.fullName}
                  onChange={(e) => updateFormState({ fullName: e.target.value })}
                  className="w-full px-3 py-1.5 border border-[var(--lighter-gray-hex)] rounded-lg focus:outline-none text-sm font-poppins"
                  placeholder="First name"
                  suppressHydrationWarning
                />
              </fieldset>
              <fieldset className="flex-1">
                <label className="block text-sm font-medium text-[var(--primary-black-hex)] mb-0.5 font-poppins">Last Name</label>
                <input
                  type="text"
                  value={formState.lastName}
                  onChange={(e) => updateFormState({ lastName: e.target.value })}
                  className="w-full px-3 py-1.5 border border-[var(--lighter-gray-hex)] rounded-lg focus:outline-none text-sm font-poppins"
                  placeholder="Last name"
                  suppressHydrationWarning
                />
              </fieldset>
            </div>
            <fieldset>
              <label className="block text-sm font-medium text-[var(--primary-black-hex)] mb-0.5 font-poppins">Phone Number*</label>
              <PhoneInput
                id="phone"
                defaultCountry="IN"
                value={formState.phoneNumber}
                onChange={(value) => updateFormState({ phoneNumber: value || '' })}
                international
                withCountryCallingCode
                countryCallingCodeEditable={false}
                className="w-full px-3 py-1.5 border border-[var(--lighter-gray-hex)] rounded-lg focus:outline-none text-sm font-poppins"
              />
            </fieldset>
            <fieldset>
              <label className="block text-sm font-medium text-[var(--primary-black-hex)] mb-0.5 font-poppins">Email*</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => updateFormState({ email: e.target.value })}
                className="w-full px-3 py-1.5 border border-[var(--lighter-gray-hex)] rounded-lg focus:outline-none text-sm font-poppins"
                placeholder="Enter your email"
                suppressHydrationWarning
              />
            </fieldset>
            <fieldset>
              <label className="block text-sm font-medium text-[var(--primary-black-hex)] mb-0.5 font-poppins">Company Name*</label>
              <input
                type="text"
                value={formState.companyName}
                onChange={(e) => updateFormState({ companyName: e.target.value })}
                className="w-full px-3 py-1.5 border border-[var(--lighter-gray-hex)] rounded-lg focus:outline-none text-sm font-poppins"
                placeholder="Enter your company name"
                suppressHydrationWarning
              />
            </fieldset>
            <fieldset>
              <label className="block text-sm font-medium text-[var(--primary-black-hex)] mb-0.5 font-poppins">Company Sector*</label>
              
            </fieldset>
            <fieldset>
              <label className="block text-sm font-medium text-[var(--primary-black-hex)] mb-0.5 font-poppins">Password*</label>
              <div className="relative">
                <input
                  type={formState.showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formState.password}
                  onChange={(e) => updateFormState({ password: e.target.value })}
                  onBlur={validatePasswords}
                  className="w-full px-3 py-1.5 border border-[var(--lighter-gray-hex)] rounded-lg focus:outline-none text-sm font-poppins"
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[var(--primary-black-hex)]"
                  suppressHydrationWarning
                >
                  {formState.showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </fieldset>
            <fieldset>
              <label className="block text-sm font-medium text-[var(--primary-black-hex)] mb-0.5 font-poppins">Confirm Password*</label>
              <div className="relative">
                <input
                  type={formState.showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={formState.confirmPassword}
                  onChange={(e) => updateFormState({ confirmPassword: e.target.value })}
                  onBlur={validatePasswords}
                  className="w-full px-3 py-1.5 border border-[var(--lighter-gray-hex)] rounded-lg focus:outline-none text-sm font-poppins"
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[var(--primary-black-hex)]"
                  suppressHydrationWarning
                >
                  {formState.showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
                {formState.passwordMatchError && (
                  <p className="text-[var(--primary-red-hex)] text-xs mt-1">{formState.passwordMatchError}</p>
                )}
              </div>
            </fieldset>
            <fieldset>
              <label className="block text-sm font-medium text-[var(--primary-black-hex)] mb-0.5 font-poppins">Domain*</label>
              <input
                type="text"
                value={formState.domain}
                onChange={(e) => updateFormState({ domain: e.target.value })}
                className="w-full px-3 py-1.5 border border-[var(--lighter-gray-hex)] rounded-lg focus:outline-none text-sm font-poppins"
                placeholder="Enter your domain"
                suppressHydrationWarning
              />
              <p className="text-xs text-[var(--medium-grey-hex)] mt-1 font-poppins">
                Example: www.yourdomain.com
              </p>
            </fieldset>
            <fieldset>
              <label className="block text-sm font-medium text-[var(--primary-black-hex)] mb-0.5 font-poppins">Company Document*</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border border-[var(--lighter-gray-hex)] p-1 rounded-lg file:mr-3 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[var(--lighter-blue-hex)] file:text-[var(--primary-blue-hex)]"
                suppressHydrationWarning
              />
              {formState.fileSizeError && (
                <p className="text-[var(--primary-red-hex)] text-xs mt-1">{formState.fileSizeError}</p>
              )}
            </fieldset>
            <p className="text-xs text-[var(--medium-grey-hex)] mt-1 font-poppins">
              By signing up, you agree to Worki9’s <a href="/terms" className="text-[var(--primary-blue-hex)] underline">Terms & Conditions</a> and <a href="/privacy" className="text-[var(--primary-blue-hex)] underline">Privacy Policy</a>. You consent to receive SMS notifications, which may incur standard messaging rates. You can manage preferences or opt out anytime in your profile settings.
            </p>
            <button
              type="submit"
              className="w-full bg-[var(--primary-blue-hex)] text-[var(--primary-white-hex)] py-1.5 rounded-lg transition text-sm font-poppins"
              suppressHydrationWarning
            >
              Create Account
            </button>
            <p className="mt-3 text-center text-sm text-[var(--medium-grey-hex)] font-poppins">
              Already Have an account?{' '}
              <a href="/login" className="text-[var(--primary-blue-hex)] font-semibold hover:underline">
                Login
              </a>
            </p>
          </form>
        </section>
      </section>
    </main>
  );
};

export default Register;