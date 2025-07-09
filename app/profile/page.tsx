'use client';

import React, { useEffect, 
  // useRef,
   useState } from 'react';
import { motion } from 'framer-motion';
// import Image from 'next/image';
import { EDIT_INFO, TOKEN_VALUE, USER_INFO } from '@/lib/constant';
import { getEncryptedLocalStorageItem } from '@/lib/helper';
import { fetchAuthorized } from '@/lib/apiData';
import toast, { Toaster } from 'react-hot-toast';

interface User {
  email: string;
  password:string
  phone_number: string;
  first_name: string;
  last_name: string;
  doc: string;
}

const Profile = () => {
  // const fileRef = useRef<HTMLInputElement | null>(null);

  // const [user, setUser] = useState<User>({
  //   email: '',
  //   phone_number: '',
  //   first_name: '',
  //   last_name: '',
  //   password:'',
  //   doc: ''
  // });

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone_number:'',
    old_password: '',
    email:'',
    new_password: '',
    confirm_password: '',
    doc:''
  });

  const [loading, setLoading] = useState(false);
  const token = getEncryptedLocalStorageItem(TOKEN_VALUE);
  

  const fetchSchemeData = async (token: string) => {
    try {
      const res = await fetchAuthorized(USER_INFO, token, 'GET');
      if (res.status === 'success') {
        const user = res.data as User;
        setForm({
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number:user.phone_number,
            email:user.email,
            old_password: user.password,
            new_password: '',
            confirm_password: '',
            doc:user.doc
          });
      } else {
        console.log(res.data?.toString() || 'Something went wrong');
      }
    } catch (error) {
      console.log(`${error}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      fetchSchemeData(token);
    } else {
      setLoading(false);
    }
  }, []);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const triggerFileUpload = () => {
  //   fileRef.current?.click();
  // };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.[0]) {
  //     const fileURL = URL.createObjectURL(e.target.files[0]);
  //     setUser(prev => ({ ...prev, doc: fileURL }));
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
try{
    if(!token){
toast.error('Invalid operation')
return
    }
    if (form.new_password !== form.confirm_password) {
      toast.error("New password and confirm password don't match.");
      return;
    }

    setLoading(true);

    const req = {
      first_name: form.first_name,
      last_name: form.last_name,
      ...(form.new_password && { password: form.new_password }),
  ...(form.doc && { doc: form.doc })
    };
   

    const res = await fetchAuthorized(EDIT_INFO, token, 'POST', req);

      if (res.status === 'success') {
        toast.success(res.data?.toString()||'Profile updated');
        fetchSchemeData(token);
      } else {
        toast.error(res.data?.toString() || 'Something went wrong');
      }
      setLoading(false);
    } catch (error) {
        setLoading(false);
      toast.error(`${error}`);
    }
  };

  // const getInitials = (name: string) => name?.charAt(0).toUpperCase();

  // const randomColor = () => {
  //   const colors = ['#0E2A46', '#AD1519', '#22D07B'];
  //   return colors[Math.floor(Math.random() * colors.length)];
  // };

  return (
    <motion.div
      className="max-w-xl   mx-auto py-8 px-10 mt-[10rem] mb-[5rem] bg-white shadow-lg rounded-[1.5rem]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Profile
      </h2> */}

      {/* <div className="flex justify-center mb-6 relative group">
        <div
          onClick={triggerFileUpload}
          className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 cursor-pointer relative flex items-center justify-center group hover:ring-2 ring-blue-500 transition-all"
        >
          {user.doc ? (
            <Image
            width={100}
            height={100}
              src={user.doc}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <div
              className="text-white text-3xl font-bold w-full h-full flex items-center justify-center"
              style={{ backgroundColor: randomColor() }}
            >
             <h1> {getInitials(form.first_name)}</h1>
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 text-white text-xs flex items-center justify-center transition-opacity">
            Click to change
          </div>
        </div>
        <input
          type="file"
          ref={fileRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div> */}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label
      
      >
       Email<span className='text-[var(--primary-red-hex)]'>*</span>
      </label>
          <input
            type="email"
            value={form.email ||""}
            disabled
           className="input--custom"
          />
        </div>

        <div>
        <label
      
      >
       Phone Number<span className='text-[var(--primary-red-hex)]'>*</span>
      </label>
          <input
            type="text"
            value={form.phone_number ||""}
            disabled
             className="input--custom"
          />
        </div>

        
          <div>
          <label
      
      >
        First Name<span className='text-[var(--primary-red-hex)]'>*</span>
      </label>
            <input
              type="text"
              name="first_name"
               placeholder='First Name'
              value={form.first_name||""}
              onChange={handleChange}
               className="input--custom"
            />
          </div>
          <div>
          <label
      
      >
        Last Name
      </label>
            <input
              type="text"
              name="last_name"
               placeholder='Last Name'
              value={form.last_name ||""}
              onChange={handleChange}
               className="input--custom"
            />
          </div>
         
       

        
          <div >
          <label
      
      >
       Password
      </label>
            <input
              type="password"
              name="password"
              defaultValue={form.old_password}
               className="input--custom"
               disabled
            />
  
          <div className='my-2'>
            <label>New Password</label>
            <input
              type="password"
               placeholder='New Password'
              name="new_password"
              value={form.new_password}
              onChange={handleChange}
               className="input--custom"
            />
          </div>
          <div>
            <label >Confirm Password</label>
            <input
            placeholder='Confirm Password'
              type="password"
              name="confirm_password"
              value={form.confirm_password}
              onChange={handleChange}
               className="input--custom"
            />
          </div>
        </div>
<main className='flex w-full justify-center items-center'>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="w-full mt-4 bg-[var(--primary-green-hex)] hover:bg-[var(--light-green-hex)] text-white font-medium py-2.5 rounded transition-all"
        >
          {loading ? 'Saving...' : 'Update Profile'}
        </motion.button>
        </main>
      </form>
      <Toaster/>
    </motion.div>
  );
};

export default Profile;
