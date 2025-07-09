'use client';

import Loader from '@/components/Loader';
import PopupModal from '@/components/PopupModal';
import StatusDropdown from '@/components/StatusDropDown';
import Table from '@/components/Table';
import { fetchAuthorized } from '@/lib/apiData';
import { GET_ALL_BID_SCHEME, GET_ALL_BID_USERS, MONTHLY_BID_EDIT, MONTHLY_BID_WINNER, SCHEME_GET_ALL_PAYMENT, SCHEME_PAYMENT_EDIT, TOKEN_VALUE, USER_VALUE } from '@/lib/constant';
import {  getEncryptedLocalStorageItem, getOrdinal } from '@/lib/helper';
import { TableCellType } from '@/lib/type';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


interface SchemeData {
  scheme_id: number;
  turnover: number;
  duration: number;
  tier_name:string;
  status:string;
  months_paid:number;
  remaining_months:number;
  join_date:string;
  paid_on:string;
  invoice_number:string;
  transaction_id:string;
  payment_status:string;
  total_winner_amount:string
  payment_id:number;
  amount_paid: string;
  total_interest_earned:string;
  total_amount_paid:string;
  all_users_bidded:number;
  total_user_gains:number;
  base_amount:number;
  distribution_done_prev_month:number
  distribution_done_current_month:number
}
interface UserData {
  user_id: number;
  first_name: string;
  total_paid: string;
  latest_bid_month:number;
  latest_bid_amount:number;
  total_bids:number;
  winner_amount:string;
  interest_amount:string;
  interest_per_user:string;
  distributed_on:string;

}
const BidManagement = () => {
  const [rowData, setRowData] = useState<SchemeData[]>([]);
  const [transactionData,setTransactionData]=useState<SchemeData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [userData,setUserData]=useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const radius = 180; // Radius of large circle
  const center = radius + 10; // Padding
  const [formData, setFormData] = useState({ turnover: '',payment_id:0,paid_on:'',invoice_number:'',transaction_id:'',payment_status:'', duration: '', scheme_id: '' ,tier_name:'',status:'',months_paid:1,amount_paid:''});
  const [showModal, setShowModal] = useState(false);
  const [showViewModal,setShowViewModal]=useState(false)
  const [showBidModal,setShowBidModal]=useState(false)
const [tierName,setTierName]=useState('')
  const token = getEncryptedLocalStorageItem(TOKEN_VALUE);
  const [bidAmount, setBidAmount] = useState<number>();
  const userValue = getEncryptedLocalStorageItem(USER_VALUE);
  const headers = ['Scheme Id', 'Turnover', 'Duration','Remaining Months','Total Months Paid','Total Amount Paid','Total Gain','Base Amount','Joining Status','Joined On', 'Action'];
  const turnover = Number(formData?.turnover) || 0;
  const duration = Number(formData?.duration) || 1; // prevent divide-by-zero
  
  const monthlyInstallment = turnover / duration;
  const totalAmount = monthlyInstallment * 2;
  
  const fetchSchemeData = async (token: string) => {
    try {
      const res = await fetchAuthorized(`${GET_ALL_BID_SCHEME}?status=${tierName}`, token, 'GET');
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
  const fetchUserData = async (schemeId?: string, month?: number) => {
   
    try {
      if (!token) {
        toast.error('Invalid Token');
        return;
      }
      const res = await fetchAuthorized(`${GET_ALL_BID_USERS}?scheme_id=${formData.scheme_id||schemeId}&month_number=${formData.months_paid||month}`, token, 'GET');
      if (res.status === 'success') {
        const data = res.data as UserData[];
        
        setUserData(data);
        setShowBidModal(true)
      } else {
        setUserData([]);
        console.log(res.data?.toString() || 'Something went wrong');
      }
    } catch (error) {
      console.log(`${error}`);
    } finally {
      setLoading(false);
    }

  };
const handleBidding=(scheme_id:number,scheme:SchemeData)=>{
  setSelectedUser(null)
 
  const updatedFormData = {
    turnover: scheme.turnover.toString(),
    duration: scheme.duration.toString(),
    scheme_id: scheme_id.toString(),
    tier_name: scheme.tier_name,
    status: scheme.status,
    months_paid: scheme.months_paid,
    transaction_id: scheme.transaction_id?.toString() || '',
    paid_on: scheme.paid_on?.toString(),
    payment_status: scheme.payment_status?.toString() || '',
    invoice_number: scheme.invoice_number?.toString() || '',
    payment_id: scheme.payment_id,
    amount_paid: scheme.amount_paid?.toString() || '',
  };
  console.log(scheme,'scheme handle bidding')
  console.log(updatedFormData,'updateddata')
  setFormData(updatedFormData);
  fetchUserData(updatedFormData.scheme_id, updatedFormData.months_paid);
}

  useEffect(() => {
    if (token) {
      fetchSchemeData(token);
    } else {
      setLoading(false);
    }
  }, [tierName]);
  useEffect(() => {
    if (token) {
      fetchSchemeData(token);
    } else {
      setLoading(false);
    }
  }, [showBidModal]);
  useEffect(() => {
    if(showBidModal){
      if(formData.months_paid===10)getBidResults()
      console.log(formData.months_paid,'months_paid')
    fetchUserData(formData.scheme_id,formData.months_paid)
    }
  }, [formData.months_paid,showBidModal]);

  const handleViewScheme=async(scheme:SchemeData)=>{
    try {
      if (!token) {
        toast.error('Invalid Token');
        return;
      }
     
       const res = await fetchAuthorized(`${SCHEME_GET_ALL_PAYMENT}?scheme_id=${scheme.scheme_id}`, token, 'GET');
 
       if (res.status === 'success') {
        const data = res.data as SchemeData[];
        
        setTransactionData(data);
        setShowViewModal(true)
      } else {
        setTransactionData([]);
        console.log(res.data?.toString() || 'Something went wrong');
      }
     } catch (error) {
      setTransactionData([]);
       toast.error(`${error}`);
     }
  }
  const handleJoinScheme = (scheme: SchemeData) => {
    setFormData({
      turnover: scheme.turnover.toString(),
      duration: scheme.duration.toString(),
      scheme_id: scheme.scheme_id.toString(),
      tier_name: scheme.tier_name,
      status: scheme.status,
      months_paid: scheme.months_paid,
      transaction_id: scheme.transaction_id?.toString() ||'',
      paid_on: scheme.paid_on?.toString(),
      payment_status: scheme.payment_status?.toString()||'',
      invoice_number: scheme.invoice_number?.toString()||'',
      payment_id: scheme.payment_id,
      amount_paid: scheme.amount_paid?.toString()||'',
    });
    
   setShowModal(true)
  };



 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error('Invalid Token');
      return;
    }

    try {
     const req={
      scheme_id:formData.scheme_id,
      month_number:formData.status==='Pending'?1:formData.months_paid+1,
      amount_paid:formData.status==='Pending'?totalAmount:monthlyInstallment,
     }

     

      const res = await fetchAuthorized(SCHEME_PAYMENT_EDIT, token, 'POST', req);

      if (res.status === 'success') {
        toast.success(formData.status==="Pending" ? 'Scheme Joined Successfully' : `${formData.months_paid+1} Scheme installment Added`);
        setFormData({ turnover: '',payment_id:0,paid_on:'',invoice_number:'',transaction_id:'',payment_status:'', duration: '', scheme_id: '' ,tier_name:'',status:'',months_paid:0,amount_paid:''})
        setShowModal(false);
        fetchSchemeData(token);
      } else {
        toast.error(res.data?.toString() || 'Something went wrong');
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const rows: TableCellType[][] = rowData.map((row) => [
    { type: 'number', value: row.scheme_id },
    { type: 'number', value: row.turnover },
    { type: 'number', value: row.duration },
    { type: 'number', value: row.remaining_months },
    { type: 'number', value: row.months_paid },
    { type: 'text', value: row.total_amount_paid },
    { type: 'text', value: row.total_user_gains },
    { type: 'number', value: row.base_amount },
    { type: 'text', value: row.status },
    { type: 'text', value: row.join_date },

    {
      type: 'actions',
      buttons: [
        {
          label: 'Join',
          variant: 'join',
          onClick: () => handleJoinScheme(row),
          disabled:(row.distribution_done_current_month===0 &&row.months_paid!==0)
        },
        {
          label: 'View',
          variant: 'view',
          onClick: () => handleViewScheme(row),
          disabled:row.status=='Pending'
        },
        {
          label: 'Bid',
          variant: 'bid',
          onClick: () => handleBidding(row.scheme_id,row),
          disabled:row.status=='Pending'
        },
      ],
    },
  ]);
  const transactionHeaders=['Payment ID','Amount Paid','Paid On','Invoice Number','Transaction ID','Payment Status']
  const transactionRows: TableCellType[][] = transactionData.map((row) => [
    { type: 'number', value: row.payment_id },
    { type: 'text', value: row.amount_paid },
    { type: 'text', value: row.paid_on },
    { type: 'text', value: row.invoice_number },
    { type: 'text', value: row.transaction_id },
    { type: 'text', value: row.payment_status },
   

  
  ]);

  const handleOpenBid = (user: UserData) => {
    setSelectedUser(user);
    setShowBidModal(true);
  };
  
  const handleBidSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
   
    if (!token) {
      toast.error('Invalid Token');
      return;
    }

    try {
     const req={
      scheme_id:formData.scheme_id,
      month_number:formData.months_paid,
      bid_amount:bidAmount,
     }

     

      const res = await fetchAuthorized(MONTHLY_BID_EDIT, token, 'POST', req);

      if (res.status === 'success') {
        toast.success(res.data?.toString()||'Bid added Successfully');
        setSelectedUser(null);setBidAmount(0)
        fetchUserData()
      } else {
        toast.error(res.data?.toString() || 'Something went wrong');
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  }
const getBidResults=async()=>{
  try {
    if (!token) {
      toast.error('Invalid Token');
      return;
    }
    const res = await fetchAuthorized(`${MONTHLY_BID_WINNER}?scheme_id=${formData.scheme_id}&month_number=${formData.months_paid}`, token, 'GET');
    if (res.status === 'success') {
      const data = res.data as UserData[];
      console.log(data)
      fetchUserData()
 
    } else {
     
      console.log(res.data?.toString() || 'Something went wrong');
    }
  } catch (error) {
    console.log(`${error}`);
  } finally {
    setLoading(false);
  }
}

const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setFormData({...formData,months_paid:Number(e.target.value)});
};
  return (
    <section className="bg-[var(--lighter-green-hex)]  min-h-screen p-6 ">
    <main className="flex mt-[7rem] lg:mt-[2rem]  justify-between sm:flex-col sm:items-start items-center mb-6">
    <h1 className="text-2xl font-semibold sm:mb-4 smxl:text-xl">User Bid Management</h1>
  <div className="flex items-center gap-4">
  <div className="flex items-center gap-4">
  <StatusDropdown
    value={tierName}
    onChange={setTierName}
    options={["Normal", "Active", "InActive"]}
    defaultTitle='Filter By Joining Status'
  />
 
</div>
    
  </div>
</main>



      {loading ? (
        <Loader />
      ) : rows.length > 0 ? (
        <Table headers={headers} rows={rows} />
      ) : (
        <p className="text-center py-32 text-gray-500 rounded-[1rem] shadow-md border">
          No schemes found.
        </p>
      )}

      {showModal && (
        <PopupModal
          title={formData.status=='Pending' ? 'Join Scheme' : 'Update Scheme'}
          onClose={() =>{ setShowModal(false) }}
          content={
            <form className="flex flex-col gap-3 mt-5 text-[var(--view-text-hex)]" onSubmit={handleSubmit}>
           {formData.status==='Pending'?(<> <div className="border-b pb-2">
  <span className="font-semibold ">Base Amount to be Paid:</span> {monthlyInstallment.toFixed(2)}
</div>
<div className="border-b pb-2">
  <span className="font-semibold ">First Month Installment to be Paid:</span> {monthlyInstallment.toFixed(2)}
</div>
<div className="border-b pb-2">
  <span className="font-semibold ">Total amount to be Paid:</span> {totalAmount.toFixed(2)}
</div></>
       ):<><div className="border-b pb-2">
       <span className="font-semibold ">{formData.months_paid+1} Month Installment to be Paid:</span> {monthlyInstallment.toFixed(2)}
     </div>
     <div className="border-b pb-2">
       <span className="font-semibold ">Total amount to be Paid:</span> {monthlyInstallment.toFixed(2)}
     </div></>
        }

              <main className="w-full mt-4 flex justify-center items-center">
                <button type="submit" className="px-10 btn--secondary">
                  {`Pay ${formData.status==='Pending'?totalAmount:monthlyInstallment}`}
                </button>
              </main>
            </form>
          }
        />
      )}
       {showViewModal && (
        <PopupModal
                  maxWidth='max-w-[75rem]'
          title={'Payment Details'}
          onClose={() => setShowViewModal(false)}
          content={
            loading ? (
              <Loader />
            ) : transactionData.length > 0 ? (
              <main className='h-[20rem] mt-4 overflow-y-auto'><Table headers={transactionHeaders} rows={transactionRows} /></main>
            ) : (
              <p className="text-center mt-4 py-32 text-gray-500 rounded-[1rem] shadow-md border">
                No schemes found.
              </p>
            )}
          
        />
      )}
      {showBidModal && (
  <PopupModal
            maxWidth='max-w-[75rem]'
    title={`Bidding Details for the ${getOrdinal(formData.months_paid)} Month`}
    onClose={() => setShowBidModal(false)}
    content={
      <>
        {/* Legend */}
        <div className="flex mt-4 justify-start items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[var(--primary-green-hex)]  " />
            <span className="text-xs">Bidded</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[#D9D9D9]  " />
            <span className="text-xs">Yet to Bid</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[#FCDF46] " />
            <span className="text-xs">Winner</span>
          </div>
        </div>

         {/* Get Bid Results Button */}
         <main className="flex justify-between items-center w-full ">
        <div className='flex gap-1 items-center'>
      <label htmlFor="month-select" className="block  text-sm font-medium">
       Month:
      </label>
      <select
        id="month-select"
        value={formData.months_paid}
        onChange={handleChange}
        className="input--secondary"
      >
        <option value="" disabled>
        </option>
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

    </div>
          <button
            onClick={getBidResults}
            disabled={userData.some(user => user.latest_bid_amount === null) ||userData.filter((item)=>item.latest_bid_amount!==null).length!==userData.length}
            className="disabled:bg-[var(--light-grey-hex)] px-4 py-1 text-xs bg-[var(--primary-green-hex)] text-white  hover:bg-[var(--light-green-hex)] transition"
          >
            Get Bid Results
          </button>
        </main>
<main className='flex'>
        {/* Circular Visualization */}
        <div className="w-full overflow-x-scroll overflow-y-scroll h-[30rem] flex justify-center">
          <div
            className="relative m-10"
            style={{
              width: `${2 * center}px`,
              height: `${2 * center}px`,
            }}
          >
            {/* Central Circle */}
            <div
              className="absolute rounded-full border-[0.2rem] border-[var(--primary-green-hex)] bg-[#E3FFF0]"
              style={{
                width: `${2 * radius}px`,
                height: `${2 * radius}px`,
                top: '10px',
                left: '10px',
              }}
            />

            {/* Winner Center Info */}
            {userData.some(u => u.winner_amount) && (
              <div
                className="absolute flex flex-col items-center justify-center text-center text-sm font-semibold p-2 text-blue-700"
                style={{
                  width: '120px',
                  height: '120px',
                  top: `${center - 60}px`,
                  left: `${center - 60}px`,
                  backgroundColor: '#fff',
                  border: '2px solid #facc15',
                  borderRadius: '9999px',
                  zIndex: 10,
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}
              >
                <div className="text-yellow-500 text-2xl mb-1">🏆</div>
                <div className="text-xs text-gray-500">Winner</div>
                <div>{userData.find(u => u.winner_amount)?.first_name}</div>
                <div className="text-xs text-gray-700">
                  ₹{userData.find(u => u.winner_amount)?.winner_amount}
                </div>
              </div>
            )}

            {/* User Bubbles */}
            {userData.map((user, index) => {
              const angle = (index / userData.length) * 2 * Math.PI;
              const x = center + radius * Math.cos(angle) - 50;
              const y = center + radius * Math.sin(angle) - 50;

              const isCurrentUser = userValue && user.user_id === +userValue;
              const hasBid = user.latest_bid_amount !== null;
              const isWinner = !!user.winner_amount;

              let bgColorClass = 'bg-[#D9D9D9]';
              if (isWinner) bgColorClass = 'bg-[#FCDF46]';
              else if (hasBid) bgColorClass = 'bg-[var(--primary-green-hex)]';

              return (
                <div
                  key={user.user_id}
                  className={`absolute w-[90px] h-[90px] rounded-full shadow-md border flex flex-col items-center justify-center text-xs text-center p-2
                    ${isCurrentUser ? 'bg-[#007438] text-[var(--primary-white-hex)]' : 'border-gray-300'}
                    ${bgColorClass}
                  `}
                  style={{ top: `${y}px`, left: `${x}px` }}
                >
                  {isCurrentUser ? (
                    <>
                     
                      <span className="font-bold">{user.first_name}</span>
                      <button
                        onClick={() => handleOpenBid(user)}
                        disabled={user.latest_bid_month == formData.months_paid || userData.filter((item)=>item.latest_bid_amount===null).length!==userData.length}
                        className="disabled:bg-[var(--light-grey-hex)] px-3 py-1 text-xs bg-[var(--light-green-hex)] text-white rounded-[1rem] mt-1 transition"
                      >
                        Raise Bid
                      </button>
                      <div className="font-bold text-xs">{user.latest_bid_amount}</div>
                    </>
                  ) : (
                    <main>
                      <div className="font-bold text-xs">{user.first_name}</div>
                      {/* <div className="font-bold flex text-xs flex-col">
                        Bid Amount:
                        <h1 className='text-ellipsis'>{user.latest_bid_amount ?? '—'}</h1>
                      </div> */}
                    </main>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Prize Distribution Table */}
        {userData.some(u => u.winner_amount || u.interest_per_user) && (
  <div className="mt-6 w-full overflow-auto">
   
    <table className="min-w-full md:overflow-scroll md:min-w-[25rem]  p-2 text-xs border-separate border-spacing-y-2 text-left border-[0.2rem] border-[var(--primary-green-hex)] rounded shadow">
      <thead className="bg-[var(--primary-white-hex)]">
        <tr className='border-b-[0.2rem] border-[var(--primary-green-hex)]  '>
          <th className=" px-2 py-2">Name</th>
          <th className=" px-2 py-2">Role</th>
          <th className=" px-2 py-2">Received</th>
        </tr>
      </thead>
      <tbody>
        {userData.map(user => {
          const isWinner = parseFloat(user.winner_amount || "0") > 0;
          const hasInterest = parseFloat(user.interest_per_user || "0") > 0;
          const isFinalMonth = formData.months_paid === 10;
         
          if (!isWinner && !hasInterest) return null;

          return (
            <React.Fragment key={user.user_id}>
              {isWinner && (
                <tr className="bg-yellow-100 m-2">
                  <td className="px-4 py-2 first:border-l first:rounded-l-[0.4rem] last:rounded-r-[0.4rem] last:border-r  border-t border-b border-[var(--lighter-grey-hex)]   align-center">{user.first_name}</td>
                  <td className="px-4 py-2 first:border-l first:rounded-l-[0.4rem] last:rounded-r-[0.4rem] last:border-r  border-t border-b border-[var(--lighter-grey-hex)]   align-center">Winner</td>
                  <td className="px-4 py-2 first:border-l first:rounded-l-[0.4rem] last:rounded-r-[0.4rem] last:border-r  border-t border-b border-[var(--lighter-grey-hex)]   align-center">₹{parseFloat(user.winner_amount).toFixed(2)}</td>
                </tr>
              )}
              {(hasInterest && (!isWinner || !isFinalMonth)) && (
                <tr className={`${isWinner ? 'bg-[var(--lighter-green-hex)]' : ''}`}>
                  <td className="px-4 py-2 first:border-l first:rounded-l-[0.4rem] last:rounded-r-[0.4rem] last:border-r  border-t border-b border-[var(--lighter-grey-hex)]   align-center">{user.first_name}</td>
                  <td className="px-4 py-2 first:border-l first:rounded-l-[0.4rem] last:rounded-r-[0.4rem] last:border-r  border-t border-b border-[var(--lighter-grey-hex)]   align-center">Interest Share</td>
                  <td className="px-4 py-2 first:border-l first:rounded-l-[0.4rem] last:rounded-r-[0.4rem] last:border-r  border-t border-b border-[var(--lighter-grey-hex)]   align-center">₹{parseFloat(user.interest_per_user).toFixed(2)}</td>
                </tr>
              )}
               { isFinalMonth && (
                <tr className={`${isWinner ? 'bg-[var(--light-green-hex)]' : ''}`}>
                  <td className="px-4 py-2 first:border-l first:rounded-l-[0.4rem] last:rounded-r-[0.4rem] last:border-r  border-t border-b border-[var(--lighter-grey-hex)]   align-center">{user.first_name}</td>
                  <td className="px-4 py-2 first:border-l first:rounded-l-[0.4rem] last:rounded-r-[0.4rem] last:border-r  border-t border-b border-[var(--lighter-grey-hex)]   align-center">Interest Share</td>
                  <td className="px-4 py-2 first:border-l first:rounded-l-[0.4rem] last:rounded-r-[0.4rem] last:border-r  border-t border-b border-[var(--lighter-grey-hex)]   align-center">₹{parseFloat(user.interest_amount).toFixed(2)}</td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  </div>
)}




        </main>
      </>
    }
  />
)}



{showBidModal && selectedUser && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-md w-[300px]">
      <h3 className="text-lg font-semibold mb-4">Raise Bid for Month </h3>
      <form
        onSubmit={handleBidSubmit}
      >
        <input
          type="number"
          placeholder="Enter bid amount"
          value={bidAmount ||''}
          onChange={(e) => setBidAmount(Number(e.target.value))}
          className="w-full border border-[--primary-grey-hex] rounded-[2rem] px-3 py-2 mb-4"
          required
        />
        <div className="flex justify-end gap-4 font-medium ">
          <button
            type="button"
            onClick={() => {setSelectedUser(null);setBidAmount(0)}}
            className="text-sm text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-[var(--primary-green-hex)] text-white rounded-[0.5rem] text-sm hover:bg-blue-600"
          >
            Submit Bid
          </button>
        </div>
      </form>
    </div>
  </div>
)}

 

      <Toaster />
    </section>
  );
};

export default BidManagement;
