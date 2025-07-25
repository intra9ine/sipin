'use client';

import Loader from '@/components/Loader';
import PopupModal from '@/components/PopupModal';
import { fetchAuthorized } from '@/lib/apiData';
import { GET_ALL_SCHEME, PAYMENT_EDIT, TOKEN_VALUE, USER_VALUE } from '@/lib/constant';
import { getEncryptedLocalStorageItem } from '@/lib/helper';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';



interface SchemeData {
  scheme_id: number;
  turnover: number;
  duration: number;
  tier_name:string
  amount:string;
  user_id:number;
}

type GroupedScheme = {
  id: number;
  title: string;
  amount: string;
 
  schemeLists: {
    scheme_id: number;
    turnover: number;
    duration: number;
    user_id:number;
  }[];
};

interface SchemeListItem{
  scheme_id: number;
  turnover: number;
  duration: number;
  user_id:number;
}

const Scheme = () => {
  const [rowData, setRowData] = useState<SchemeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ amount: '',tier_name:''});
  const [showModal, setShowModal] = useState(false);
  const token = getEncryptedLocalStorageItem(TOKEN_VALUE);
  const userValue = getEncryptedLocalStorageItem(USER_VALUE);
 const [schemeLists,setSchemeLists]=useState<SchemeListItem[]>()
const router=useRouter()
  const fetchSchemeData = async (token: string) => {
    try {
      const res = await fetchAuthorized(GET_ALL_SCHEME, token, 'GET');
      if (res.status === 'success') {
        const data = res.data as SchemeData[];
        const schemeMap = new Map();

for (const item of data) {
  const key = `${item.turnover}_${item.duration}_${item.tier_name}`;

  // If this combo is not stored yet, store it
  if (!schemeMap.has(key)) {
    schemeMap.set(key, item);
  }

  // But if this is the preferred user, replace whatever was there
  if (userValue &&item.user_id === +userValue) {
    schemeMap.set(key, item);
  }
}

const uniqueSchemes = Array.from(schemeMap.values());

       
        setRowData(uniqueSchemes ||[]);
      } else {
        setRowData([]);
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




  const formatSchemesByTier = (schemes: SchemeData[]): GroupedScheme[] => {
    const tierMap: Record<string, GroupedScheme> = {
      Free: { id: 1, title: 'Free', amount: '0', schemeLists: [] },
      Basic: { id: 2, title: 'Basic', amount: '0', schemeLists: [] },
      Standard: { id: 3, title: 'Standard', amount: '0', schemeLists: [] },
      Premium: { id: 4, title: 'Premium', amount: '0', schemeLists: [] },
    };
  
    for (const scheme of schemes) {
      const tier = scheme.tier_name as keyof typeof tierMap;
      if (tierMap[tier]) {
        if (tierMap[tier].amount === '0' && scheme.amount) {
          tierMap[tier].amount = scheme.amount.toString();
        }
  
        tierMap[tier].schemeLists.push({
          scheme_id: scheme.scheme_id,
          turnover: scheme.turnover,
          duration: scheme.duration,
          user_id: scheme.user_id,
        });
      }
    }
  
    return Object.values(tierMap);
  };
  
  
  
  const handlePaySubmission=async()=>{
    if (!token) {
      toast.error('Invalid Token');
      return;
    }

    try {
      

      const req={
       amount:formData.amount,
       currency:'IDR',
       payment_method:'card',
       tier_name :formData.tier_name
      }
 
       const res = await fetchAuthorized(PAYMENT_EDIT, token, 'POST', req);
 
       if (res.status === 'success') {
        if (formData?.tier_name === 'Free') {
          toast.success('Now you can use free trial');
          router.push('/bid-management');
        } else if (formData?.tier_name) {
          toast.success(`Payment done for ${formData.tier_name}`);
        }
        
         setFormData({ amount: '', tier_name: ''});
         setShowModal(false);
         fetchSchemeData(token);
       } else {
         toast.error(res.data?.toString() || 'Something went wrong');
       }
     } catch (error) {
       toast.error(`${error}`);
     }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePaySubmission()
   
   
  }; 

  const handlePay = (schemeLists: SchemeListItem[], amount: string, tier_name: string) => {
   
    setSchemeLists(schemeLists);
    setFormData((prev) => ({
      ...prev,
      amount,
      tier_name
    }));
 
   
  
    setShowModal(true);
  };
  


  return (
    <section className=" bg-[var(--lighter-green-hex)]  min-h-screen p-6 ">
   

      {loading ? (
        <Loader />
      ) : rowData.length > 0 ? (
        
<section className='mt-[12rem] lg:mt-[6rem] smxlx:mt-[4rem] lg:mb-[5rem]'>
<main className='grid grid-cols-4 gap-10 xlg:grid-cols-2 xlg:gap-6 smx:gap-2 smxlx:grid-cols-1 smxlx:gap-y-24 '>
  {formatSchemesByTier(rowData).map((item, index) => {
  console.log(item.schemeLists,'item')
  const isTierPaid = item.schemeLists.every(
    (scheme) => scheme.user_id !== null && userValue && scheme.user_id == +userValue
  );
  
     return(
      <section key={item.id} className='relative'>
      {index === 1 && (
        <div className="text-lg  uppercase font-semibold absolute w-full z-0 pt-4 pb-16 top-[-3.5rem] rounded-t-[2.5rem] left-0 bg-[var(--primary-green-hex)] text-[var(--primary-white-hex)] px-2 flex justify-center items-center rounded-br-lg">
          Recommended
        </div>
      )}
      <article
      key={item.id}
      className={`relative flex rounded-[2.5rem] flex-col bg-[var(--primary-white-hex)] text-[var(--primary-black-hex)] items-start py-4 px-5 shadow-sm hover:shadow-lg transition-shadow duration-300
        ${index === 1 ? 'shadow-2xl border-[0.3rem] border-[var(--primary-green-hex)]' : ''}`}
    >
      
    
      {/* Article Content */}
      <h1 className='text-lg font-semibold text-center leading-[3rem]'>{item.title}</h1>
      <h1 className='text-4xl font-semibold font-inter text-center leading-[3rem]'>
        {`${item.amount} `}<span className='text-sm'>IDR</span>
      </h1>
    

    
      <ul className='flex flex-col gap-2 mt-8 h-[14rem] smx:h-[12rem] xlg:text-sm z-10'>
      <li  className='flex gap-2 items-center'>
           <Image width={100} height={100} alt='check' src={'/icons/check.svg'} className='w-[1rem]'/>
           
            <span>Join up to {item.schemeLists.length} Schemes</span>
          </li>
          <li  className='flex gap-2 items-center'>
           <Image width={100} height={100} alt='check' src={'/icons/check.svg'} className='w-[1rem]'/>
           
            <span>Credit Score should be {item.id==1?'600+':item.id===2?'650+':item.id===3?'700+':'750+'}</span>
          </li>
        {/* {item.schemeLists.map((listItem) => (
          <li  key={listItem?.scheme_id} className='flex gap-2 items-center'>
           <Image width={100} height={100} alt='check' src={'/icons/check.svg'} className='w-[1rem]'/>
            <span>{listItem?.turnover} - {listItem.duration} Months</span>
            
          </li>
        ))} */}
      </ul>
    <main className='w-full '>
    <button
  // disabled={isTierPaid}
  onClick={() => {
   
    if (isTierPaid) {
  
      router.push('/bid-management');
    } else {
      handlePay(item.schemeLists, item.amount, item.title);
    }
  }}
  className={`mt-4 px-4 w-full py-2 rounded-[1rem] transition z-10 font-bold bg-gray-300`}
>


        {item.id===1?'Get Started':isTierPaid ? 'Get Started' : 'Pay Now'}
      </button>
      </main>
    </article>
    </section>
  )})}
</main>

</section>

      ) : (
        <p className="text-center py-32 text-gray-500 rounded-[1rem] shadow-md border">
          No schemes found.
        </p>
      )}
  {showModal && (
        <PopupModal
          title={formData.amount=='0'?'Get Started' :'Payment'}
          onClose={() => setShowModal(false)}
          content={
            <form className="flex flex-col gap-3 " onSubmit={handleSubmit}>
            <h1 className='text-[var(--primary-black-hex)] underline text-base'>List of schemes</h1>
            <ul className="flex flex-col gap-2 pl-5 mt-2">
  {schemeLists && schemeLists.map((listItem) => (
    <li
      key={listItem?.scheme_id}
      className="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-800 shadow-sm border border-gray-300"
    >
      <span className="font-medium text-[var(--primary-black-hex)]">
        ₹{listItem?.turnover?.toLocaleString()} - {listItem?.duration} Months
      </span>
    </li>
  ))}
</ul>
             
           
                
              <main className="w-full mt-4 flex justify-center items-center">
                <button type="submit" className="w-[10rem] btn--secondary">
                 {formData.amount==='0'?'Join Scheme':`Pay ${formData.amount}`}
                </button>
              </main>
            </form>
          }
        />
      )}
<Toaster/>.
    </section>
  );
};

export default Scheme;
