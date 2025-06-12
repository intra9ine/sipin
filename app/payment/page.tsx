'use client'
import Table from '@/components/Table';
import { TableCellType } from '@/lib/type';
import React, { useState } from 'react';


interface RowData {
  name: string;
  status: string;
  inputValue: string;
  selectValue: string;
}

const Payment= () => {
  const [rowData, setRowData] = useState<RowData[]>(
    Array.from({ length: 30 }, (_, i) => ({
      name: `Row ${i + 1}`,
      status: i % 2 === 0 ? 'Active' : 'Inactive',
      inputValue: `Default ${i + 1}`,     // ✅ Default input value
      selectValue: 'Option1',
    }))
  );

  const handleInputChange = (index: number, value: string) => {
    const updated = [...rowData];
    updated[index].inputValue = value;
    setRowData(updated);
  };

  const handleSelectChange = (index: number, value: string) => {
    const updated = [...rowData];
    updated[index].selectValue = value;
    setRowData(updated);
  };

  const headers = ['Name', 'Select', 'Input', 'Status', 'Actions'];

  const rows: TableCellType[][] = rowData.map((row, index) => [
    { type: 'text', value: row.name },
    {
      type: 'select',
      value: row.selectValue,
      options: ['Option1', 'Option2'],
      onChange: (val) => handleSelectChange(index, val),
    },
    {
      type: 'input',
      value: row.inputValue, // 👈 uses default if not changed
      onChange: (val) => handleInputChange(index, val),
    },
    { type: 'text', value: row.status },
    {
      type: 'actions',
      buttons: [
        {
          label: 'Edit',
          variant: 'edit',
          onClick: () => alert(`Edit ${row.name}`),
        },
        {
          label: 'Delete',
          variant: 'delete',
          onClick: () => alert(`Delete ${row.name}`),
        },
      ],
    },
  ]);

  return (
    <div className="min-h-screen font-poppins p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Table with Default Inputs</h1>
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default Payment;
