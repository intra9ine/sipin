'use client';

import Loader from '@/components/Loader';
import PopupModal from '@/components/PopupModal';
import { fetchAuthorized } from '@/lib/apiData';
import { GET_ALL_SCHEME, PAYMENT_EDIT, TOKEN_VALUE, USER_VALUE } from '@/lib/constant';
import { getEncryptedLocalStorageItem } from '@/lib/helper';
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

  const fetchSchemeData = async (token: string) => {
    try {
      const res = await fetchAuthorized(GET_ALL_SCHEME, token, 'GET');
      if (res.status === 'success') {
        const data = res.data as SchemeData[];
        setRowData(data);
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
    const tierMap: Record<string, { id: number; title: string; amount: string; schemeLists: SchemeListItem[] }> = {
      Normal: { id: 1, title: 'Normal', amount: '50', schemeLists: []},
      Basic: { id: 2, title: 'Basic', amount: '100', schemeLists: [] },
      Standard: { id: 3, title: 'Standard', amount: '200', schemeLists: [] },
      Premium: { id: 4, title: 'Premium', amount: '300', schemeLists: [] },
    };
console.log(schemes,'schemes')
    for (const scheme of schemes) {
      const tier = scheme.tier_name as keyof typeof tierMap;
      if (tierMap[tier]) {
        tierMap[tier].schemeLists.push({
          scheme_id: scheme.scheme_id,
          turnover: scheme.turnover,
          duration: scheme.duration,
          user_id:scheme.user_id
        });
      }
    }

    
  
    return Object.values(tierMap);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error('Invalid Token');
      return;
    }

    try {
      

     const req={
      amount:formData.amount,
      currency:'THD',
      payment_method:'card',
      tier_name :formData.tier_name
     }

      const res = await fetchAuthorized(PAYMENT_EDIT, token, 'POST', req);

      if (res.status === 'success') {
        toast.success(`Payment done for ${formData.tier_name}`);
        setFormData({ amount: '', tier_name: ''});
        setShowModal(false);
        fetchSchemeData(token);
      } else {
        toast.error(res.data?.toString() || 'Something went wrong');
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  }; 

const handlePay=(schemeLists:SchemeListItem[],amount:string,tier_name:string)=>{
  setShowModal(true);
  setSchemeLists(schemeLists)
  setFormData((prev) => ({
    ...prev,
    amount,
    tier_name
  }));
}


  return (
    <div className="min-h-screen font-poppins p-6 bg-gray-50">
      <main className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-6">Scheme</h1>
     
      </main>

      {loading ? (
        <Loader />
      ) : rowData.length > 0 ? (
        
<section className=' lg:mb-[5rem]'>
<main className='grid grid-cols-4 xlg:grid-cols-2 xlg:gap-6 smx:gap-2 smxlx:grid-cols-1 border-l border-r border-t-[0.2rem] border-t-[var(--primary-blue-hex)]'>
  {formatSchemesByTier(rowData).map((item, index) => {
     const isTierPaid = item.schemeLists.some((scheme) => scheme.user_id !== null && userValue && scheme.user_id==+userValue );
     return(
    <article
      key={item.id}
      className={`flex flex-col items-center py-4 px-3 shadow-sm hover:shadow-lg transition-shadow duration-300
        ${index === 0 ? 'shadow-2xl border border-[var(--primary-blue-hex)]  relative' : ''}`}
    >
      {index === 0 && (
        <div className="absolute top-0 left-0 bg-[var(--primary-blue-hex)] text-[var(--primary-white-hex)] px-2 py-1 text-xs rounded-br-lg">
          Recommended
        </div>
      )}

      <h1 className='text-lg font-semibold text-center leading-[3rem]'>{item.title}</h1>
      <h1 className='text-4xl font-semibold font-inter text-center leading-[3rem]'>
        {`${item.amount} `}<span className='text-sm'>THB</span>
      </h1>

      <ul className='flex flex-col gap-2 mt-8 h-[14rem] smx:h-[12rem] xlg:text-sm'>
        {item.schemeLists.map((listItem) => (
          <li key={listItem?.scheme_id}>
            <span>{listItem?.turnover} - {listItem.duration} Months{listItem.user_id}</span>
          </li>
        ))}
      </ul>
      

      <button
  disabled={isTierPaid}
  onClick={() => handlePay(item.schemeLists, item.amount, item.title)}
  className={`mt-4 px-4 py-2 rounded transition 
    ${isTierPaid 
      ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
      : 'bg-[var(--primary-blue-hex)] text-[var(--primary-white-hex)] hover:brightness-110'}`}
>
  {isTierPaid ? 'Paid' : 'Pay'}
</button>

    </article>
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
          title={ 'Payment'}
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
                 {`Pay ${formData.amount}`}
                </button>
              </main>
            </form>
          }
        />
      )}
<Toaster/>.
    </div>
  );
};

export default Scheme;
