'use client'
import Loader from '@/components/Loader';
import { fetchAuthorized } from '@/lib/apiData';
import { DASHBOARD_INFO, TOKEN_VALUE } from '@/lib/constant';
import { getEncryptedLocalStorageItem } from '@/lib/helper';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react'
import {   Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';




interface DashboardProps{
  schemePayment: {
    scheme_id: number;
    month_number: number;
    total_paid: number;
    gain_type: 'Winner' | 'Interest' | 'None';
    gain_amount: number;
    interest_gained:string;
  }[];
  info: {
    total_active_schemes: string;
    total_scheme_yet_to_join:string
  };
}
function Dashboard() {

  const [dashboardData,setDashboardData]=useState<DashboardProps>()
  const token = getEncryptedLocalStorageItem(TOKEN_VALUE);
  const [loading, setLoading] = useState(true);

  
  const fetchDashboardData = async (token:string) => {
  
    try {
     
      const res = await fetchAuthorized(`${DASHBOARD_INFO}`, token, 'GET');
      if (res.status === 'success') {
        const data = res.data as DashboardProps;
        
        setDashboardData(data);
       
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
      fetchDashboardData(token);
    } else {
      setLoading(false);
    }
  }, []);
  const formattedData = dashboardData?.schemePayment.map((item) => ({
    ...item,
    label: `Month ${item.month_number}`
  }));


  const totalInterest = useMemo(() => {
    return dashboardData?.schemePayment.reduce((sum, item) => {
      return sum + parseFloat(item.interest_gained || '0');
    }, 0);
  }, [dashboardData?.schemePayment]);
  return (
    <section className="mt-[5rem] lg:mt-[0rem] lg:mb-[5rem] min-h-screen p-6 bg-[var(--primary-white-hex)]">
    <main className='flex gap-1 flex-col'>
      <section className='shadow-lg p-4 rounded-2xl mb-6'>
      <h1 className="text-xl font-semibold text-[var(--darker-blue-hex)]">Today’s Sales</h1>
      <h2 className="text-xs text-[var(--light-grey-hex)] font-semibold ">Sales Summery</h2>
      <aside className="grid w-full mx-auto gap-10 grid-cols-3 my-6 
  lg:grid-cols-none lg:flex lg:overflow-x-auto lg:scrollbar-thin lg:scrollbar-thumb-gray-300">

        <article className='lg:w-[20rem] flex-shrink-0 lg:pr-4 bg-[var(--light-red-hex)] rounded-[0.8rem]  px-4 py-6 flex flex-col gap-2'>
<Image src={'/icons/platform-fee.svg'} width={100} height={100} className='w-[2rem] h-[2rem]' alt='icon'/>
<h1 className="text-xl font-semibold ">{dashboardData?.info.total_active_schemes}</h1>
<h6 className="text-sm font-semibold text-[var(--darker-grey-hex)]">Total Active Schemes</h6>
        </article>
        <article className='lg:w-[20rem] flex-shrink-0 lg:pr-4 bg-[var(--light-yellow-hex)] rounded-[0.8rem] px-4 py-6 flex flex-col gap-2'>
<Image src={'/icons/payment.svg'} width={100} height={100} className='w-[2rem] h-[2rem]' alt='icon'/>
<h1 className="text-xl font-semibold ">{dashboardData?.info.total_scheme_yet_to_join}</h1>
<h6 className="text-sm font-semibold text-[var(--darker-grey-hex)]">Total Schemes Yet to be Joined</h6>
        </article>
        <article className='lg:w-[20rem] flex-shrink-0 lg:pr-4 bg-[var(--light-purple-hex)] rounded-[0.8rem] px-4 py-6 flex flex-col gap-2'>
<Image src={'/icons/payment.svg'} width={100} height={100} className='w-[2rem] h-[2rem]' alt='icon'/>
<h1 className="text-xl font-semibold ">{totalInterest}</h1>
<h6 className="text-sm font-semibold text-[var(--darker-grey-hex)]">Total Interest Earned</h6>
        </article>
      </aside>
      </section>
      <main className=' border px-3 lg:px-2 pb-6 rounded-lg border-[var(--primary-green-hex)] shadow-lg'>
      <h1 className="text-xl lg:text-lg font-semibold mt-4 mb-2">Total Revenue</h1>
      <div className="w-full h-[20rem] lg:h-[18rem]">
     
     {loading?<Loader/>:
      <ResponsiveContainer width="100%" height="100%">
      <BarChart data={formattedData} className='text-sm' margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" angle={-40} textAnchor="end" interval={0} height={80} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total_paid" name="Total Paid" fill="#6366f1" />
        <Bar dataKey="gain_amount" name="Amount Gained" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
    
}
    </div>
    </main>
      </main>
      </section>
  )
}

export default Dashboard