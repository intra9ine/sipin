'use client';

import Loader from '@/components/Loader';
import PopupModal from '@/components/PopupModal';
import Table from '@/components/Table';
import { fetchAuthorized } from '@/lib/apiData';
import { EDIT_SCHEME, GET_ALL_SCHEME, SCHEME } from '@/lib/constant';
import { getLocalStorageItem } from '@/lib/helper';
import { TableCellType } from '@/lib/type';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoIosAddCircle } from 'react-icons/io';

interface SchemeData {
  scheme_id: number;
  turnover: number;
  duration: number;
}

const Scheme = () => {
  const [rowData, setRowData] = useState<SchemeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ turnover: '', duration: '', scheme_id: '' });
  const [showModal, setShowModal] = useState(false);
  const [deleteSchemeId, setDeleteSchemeId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const token = getLocalStorageItem('token');
  const headers = ['Scheme Id', 'Turnover', 'Duration', 'Action'];

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

  const handleEditClick = (scheme: SchemeData) => {
    setFormData({
      turnover: scheme.turnover.toString(),
      duration: scheme.duration.toString(),
      scheme_id: scheme.scheme_id.toString(),
    });
    setShowModal(true);
  };

  const handleAddScheme = () => {
    setFormData({ turnover: '', duration: '', scheme_id: '' });
    setShowModal(true);
  };

  const handleDeleteConfirm = (scheme_id: number) => {
    setDeleteSchemeId(scheme_id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteSchemeId || !token) {
      toast.error('Invalid operation');
      return;
    }

    try {
      const res = await fetchAuthorized(`${SCHEME}/${deleteSchemeId}`, token, 'DELETE');
      if (res.status === 'success') {
        toast.success('Deleted successfully');
        setShowDeleteModal(false);
        setDeleteSchemeId(null);
        fetchSchemeData(token);
      } else {
        toast.error(res.data?.toString() || 'Something went wrong');
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error('Invalid Token');
      return;
    }

    try {
      const { turnover, duration, scheme_id } = formData;
      const req: { turnover: string; duration: string; scheme_id?: string } = { turnover, duration };

      if (scheme_id) {
        req.scheme_id = scheme_id;
      }

      const res = await fetchAuthorized(EDIT_SCHEME, token, 'POST', req);

      if (res.status === 'success') {
        toast.success(scheme_id ? 'Scheme updated' : 'Scheme added');
        setFormData({ turnover: '', duration: '', scheme_id: '' });
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
    {
      type: 'actions',
      buttons: [
        {
          label: 'Edit',
          variant: 'edit',
          onClick: () => handleEditClick(row),
        },
        {
          label: 'Delete',
          variant: 'delete',
          onClick: () => handleDeleteConfirm(row.scheme_id),
        },
      ],
    },
  ]);

  return (
    <div className="min-h-screen font-poppins p-6 bg-gray-50">
      <main className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-6">Scheme</h1>
        <button onClick={handleAddScheme}>
          <IoIosAddCircle className="text-4xl text-[var(--primary-blue-hex)]" />
        </button>
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
              <main className="w-full mt-4 flex justify-center items-center">
                <button type="submit" className="w-[7rem] btn--secondary">
                  Save
                </button>
              </main>
            </form>
          }
        />
      )}

      {showDeleteModal && (
        <PopupModal
          title="Confirm Deletion"
          onClose={() => {
            setShowDeleteModal(false);
            setDeleteSchemeId(null);
          }}
          content={
            <div className="flex flex-col items-center gap-4">
              <p>Are you sure you want to delete this scheme?</p>
              <div className="flex gap-4 mt-4">
                <button className="btn--secondary w-[5rem]" onClick={handleDelete}>
                  Yes
                </button>
                <button
                  className="btn--primary w-[5rem]"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteSchemeId(null);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          }
        />
      )}

      <Toaster />
    </div>
  );
};

export default Scheme;
