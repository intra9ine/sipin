// 'use client'
// import Table from '@/components/Table';
// import { TableCellType } from '@/lib/type';
// import React, { useState } from 'react';


// interface RowData {
//   name: string;
//   status: string;
//   inputValue: string;
//   selectValue: string;
// }

// const Payment= () => {
//   const [rowData, setRowData] = useState<RowData[]>(
//     Array.from({ length: 30 }, (_, i) => ({
//       name: `Row ${i + 1}`,
//       status: i % 2 === 0 ? 'Active' : 'Inactive',
//       inputValue: `Default ${i + 1}`,     // ✅ Default input value
//       selectValue: 'Option1',
//     }))
//   );

//   const handleInputChange = (index: number, value: string) => {
//     const updated = [...rowData];
//     updated[index].inputValue = value;
//     setRowData(updated);
//   };

//   const handleSelectChange = (index: number, value: string) => {
//     const updated = [...rowData];
//     updated[index].selectValue = value;
//     setRowData(updated);
//   };

//   const headers = ['Name', 'Select', 'Input', 'Status', 'Actions'];

//   const rows: TableCellType[][] = rowData.map((row, index) => [
//     { type: 'text', value: row.name },
//     {
//       type: 'select',
//       value: row.selectValue,
//       options: ['Option1', 'Option2'],
//       onChange: (val) => handleSelectChange(index, val),
//     },
//     {
//       type: 'input',
//       value: row.inputValue, // 👈 uses default if not changed
//       onChange: (val) => handleInputChange(index, val),
//     },
//     { type: 'text', value: row.status },
//     {
//       type: 'actions',
//       buttons: [
//         {
//           label: 'Edit',
//           variant: 'edit',
//           onClick: () => alert(`Edit ${row.name}`),
//         },
//         {
//           label: 'Delete',
//           variant: 'delete',
//           onClick: () => alert(`Delete ${row.name}`),
//         },
//       ],
//     },
//   ]);

//   return (
//     <div className="min-h-screen font-poppins p-6 bg-gray-50">
//       <h1 className="text-2xl font-semibold mb-6">Table with Default Inputs</h1>
//       <Table headers={headers} rows={rows} />
//     </div>
//   );
// };

// export default Payment;
'use client';

import Loader from '@/components/Loader';
import PopupModal from '@/components/PopupModal';
import Table from '@/components/Table';
import { fetchAuthorized } from '@/lib/apiData';
import {   GET_ALL_PAYMENT, TOKEN_VALUE } from '@/lib/constant';
import { formatDateTime, getEncryptedLocalStorageItem } from '@/lib/helper';
import { TableCellType } from '@/lib/type';
import React, { useEffect,useState } from 'react';



interface PaymentData {
    payment_id: number;
    amount: string;
    tier_name: string;
    payment_status: string;
    payment_method: string;
    type: string;
    currency: string;
    paid_on:string;
    transaction_id:string,
    invoice_number:string
}

const Payment = () => {
  const [rowData, setRowData] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<PaymentData>({
    payment_id: 0,
    amount: '',
    tier_name: '',
    payment_status: '',
    payment_method: '',
    type: '',
    currency: '',
    paid_on: '',
    transaction_id:'',
          invoice_number:''
  });
  
  const [showModal, setShowModal] = useState(false);

  const token = getEncryptedLocalStorageItem(TOKEN_VALUE);
 

  const fetchPaymentData = async (token: string) => {
    try {
      const res = await fetchAuthorized(GET_ALL_PAYMENT, token, 'GET');
      if (res.status === 'success') {
        const data = res.data as PaymentData[];
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
      fetchPaymentData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const handleViewClick = (payment: PaymentData) => {
    setFormData({
      payment_id: payment.payment_id,
      amount: payment.amount,
      tier_name: payment.tier_name,
      payment_status: payment.payment_status,
      payment_method: payment.payment_method,
      type: payment.type,
      currency: payment.currency,
      paid_on:payment.paid_on,
      transaction_id:payment.transaction_id,
      invoice_number:payment.invoice_number
    });
    setShowModal(true);
  };




 



  const headers = ['Payment Id','Trial','Amount','Transaction Id','Paid On','Status','Action'];
  const rows: TableCellType[][] = rowData.map((row) => [
    { type: 'number', value: row.payment_id },
    { type: 'text', value: row.tier_name },
    { type: 'text', value: row.amount },
    { type: 'text', value: row.transaction_id },
    { type: 'text', value: row.payment_status },
    { type: 'text', value: formatDateTime(row.paid_on) },
    {
      type: 'actions',
      buttons: [
        {
          label: 'View',
          variant: 'view',
          onClick: () => handleViewClick(row),
        },
      
      ],
    },
  ]);

  return (
    <section className="bg-[var(--lighter-green-hex)]  min-h-screen p-6 ">
    <main className="flex mt-[5.5rem] lg:mt-[1rem] justify-between items-center">
      <h1 className="text-2xl font-semibold mb-4  smxl:text-xl">Scheme Tire Transaction</h1>
      

    </main>
      {loading ? (
        <Loader />
      ) : rows.length > 0 ? (
        <Table headers={headers} rows={rows} />
      ) : (
        <p className="text-center py-32 text-gray-500 rounded-[1rem] shadow-md border">
          No Transaction found.
        </p>
      )}

{showModal && (
     <PopupModal
     title={'View Payment Details'}
     onClose={() => setShowModal(false)}
     content={
      <ul className="grid list-disc grid-cols-1 smxl:text-sm  gap-4 p-4  text-[var(--view-text-hex)] overflow-y-scroll h-[20rem]">
         <li className="border-b w-auto pb-2">
           <span className="font-semibold ">Payment ID:</span> {formData?.payment_id}
         </li>
         <li className="border-b pb-2">
           <span className="font-semibold ">Paid on:</span> {formatDateTime(formData?.paid_on)}
         </li>
         <li className="border-b pb-2">
           <span className="font-semibold ">Amount:</span> {formData?.amount}
         </li>
        
         <li className="border-b pb-2">
           <span className="font-semibold ">Transaction ID:</span> {formData?.transaction_id}
         </li>
         <li className="border-b pb-2">
           <span className="font-semibold ">Invoice ID:</span> {formData?.invoice_number}
         </li>
         <li className="border-b pb-2">
           <span className="font-semibold ">Payment Status:</span> 
           <span className={`ml-2 font-medium ${
             formData?.payment_status === 'Active' ? 'text-[var(--primary-green-hex)]' : 
             formData?.payment_status === 'Pending' ? 'text-[var(--primary-yellow-hex)]' : 
             'text-[var(--primary-red-hex)]'
           }`}>
             {formData?.payment_status}
           </span>
         </li>
         <li className="border-b pb-2">
           <span className="font-semibold ">Usage:</span> {formData?.type}
         </li>
       
       </ul>
     }
   />
   
      )}

   
    </section>
  );
};

export default Payment;

