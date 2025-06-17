'use client';

import Loader from '@/components/Loader';
import PopupModal from '@/components/PopupModal';
import Table from '@/components/Table';
import { fetchAuthorized } from '@/lib/apiData';
import { EDIT_SCHEME, GET_ALL_BID_SCHEME, TOKEN_VALUE } from '@/lib/constant';
import { getEncryptedLocalStorageItem } from '@/lib/helper';
import { TableCellType } from '@/lib/type';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


interface SchemeData {
  scheme_id: number;
  turnover: number;
  duration: number;
  tier_name:string;
}

const BidManagement = () => {
  const [rowData, setRowData] = useState<SchemeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ turnover: '', duration: '', scheme_id: '' ,tier_name:''});
  const [showModal, setShowModal] = useState(false);
const [tierName,setTierName]=useState('')
  const token = getEncryptedLocalStorageItem(TOKEN_VALUE);
  const headers = ['Scheme Id', 'Turnover', 'Duration','Tier Name', 'Action'];

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

  useEffect(() => {
    if (token) {
      fetchSchemeData(token);
    } else {
      setLoading(false);
    }
  }, [tierName]);

  const handleEditClick = (scheme: SchemeData) => {
    setFormData({
      turnover: scheme.turnover.toString(),
      duration: scheme.duration.toString(),
      scheme_id: scheme.scheme_id.toString(),
      tier_name: scheme.tier_name.toString(),
    });
    setShowModal(true);
  };



 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error('Invalid Token');
      return;
    }

    try {
      const { turnover, duration,tier_name, scheme_id} = formData;
      const req: { turnover: string; duration: string;tier_name:string ; scheme_id?: string;} = { turnover, duration,tier_name };

      if (scheme_id) {
        req.scheme_id = scheme_id;
      }

      const res = await fetchAuthorized(EDIT_SCHEME, token, 'POST', req);

      if (res.status === 'success') {
        toast.success(scheme_id ? 'Scheme updated' : 'Scheme added');
        setFormData({ turnover: '', duration: '', scheme_id: '',tier_name:'' });
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
    { type: 'text', value: row.tier_name },
    {
      type: 'actions',
      buttons: [
        {
          label: 'Edit',
          variant: 'edit',
          onClick: () => handleEditClick(row),
        },
     
      ],
    },
  ]);

  return (
    <section className="min-h-screen font-poppins p-6 bg-gray-50">
    <main className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-semibold">Bid Management</h1>
  <div className="flex items-center gap-4">
    <select
      value={tierName}
      onChange={(e) => setTierName(e.target.value)}
      className="input--secondary"
      required
    >
      <option value="">Filter By Tier Name</option>
      <option value="Normal">Normal</option>
      <option value="Basic">Basic</option>
      <option value="Standard">Standard</option>
      <option value="Premium">Premium</option>
    </select>
    
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
          title={formData.scheme_id ? 'Edit Scheme' : 'Add Scheme'}
          onClose={() => setShowModal(false)}
          content={
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="number"
                value={formData.turnover}
                onChange={(e) => setFormData({ ...formData, turnover: e.target.value })}
                className="input--secondary"
                placeholder="Turnover"
                required
              />
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="input--secondary"
                placeholder="Duration"
                required
              />
                <select
  value={formData.tier_name}
  onChange={(e) => setFormData({ ...formData, tier_name: e.target.value })}
  className="input--secondary"
  required
>
  <option value="">Select Tier Name</option>
  <option value="Normal">Normal</option>
  <option value="Basic">Basic</option>
  <option value="Standard">Standard</option>
  <option value="Premium">Premium</option>
</select>
              <main className="w-full mt-4 flex justify-center items-center">
                <button type="submit" className="w-[7rem] btn--secondary">
                  Save
                </button>
              </main>
            </form>
          }
        />
      )}

 

      <Toaster />
    </section>
  );
};

export default BidManagement;
