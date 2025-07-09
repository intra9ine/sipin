import { TableProps } from '@/lib/type';
import Image from 'next/image';
import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';



const Table: React.FC<TableProps> = ({ headers, rows }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <div className="overflow-x-auto border rounded-[2.5rem] bg-[var(--primary-white-hex)] border-[var(--table-outer-grey-hex)] px-5 py-4">
      <div className="overflow-y-auto max-h-[60vh]   ">
        <table className="min-w-max w-full border-separate border-spacing-y-2 table-auto text-sm">
          <thead className="bg-[var(--primary-white-hex)]  sticky top-0 z-20">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="text-left px-4 py-4 text-[var(--light-shade-grey-hex)]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody >
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="   hover:bg-[var(--primary-green-hex)] hover:text-[var(--primary-white-hex)]"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-2 first:border-l first:rounded-l-[0.4rem] last:rounded-r-[0.4rem] last:border-r  border-t border-b border-[var(--lighter-grey-hex)]   align-center"
                    >
                      {(() => {
                         
                        switch (cell.type) {
                          case 'text':
                          case 'number':
                            return cell.value;
                          case 'input':
                            return (
                              <input
                                type="text"
                                value={cell.value}
                                onChange={(e) => cell.onChange(e.target.value)}
                                className="border px-2 py-1 input--secondary"
                              />
                            );
                          case 'select':
                            return (
                              <CustomDropdown
                              value={cell.value}
                              options={cell.options}
                              onChange={cell.onChange}
                            />
                            
                            );
                          case 'actions':
                            return (
                              <div className="flex gap-2 flex-wrap">
                              {cell.buttons.map((btn, bIdx) => {
                                const isRowHovered = hoveredRow === rowIndex;
                            
                                // Map button variant to appropriate image paths
                                const variantImageSrc = {
                                  delete: isRowHovered ? '/icons/delete-hover.svg' : '/icons/delete.svg',
                                  edit: isRowHovered ? '/icons/edit-hover.svg' : '/icons/edit.svg',
                                  bid: isRowHovered ? '/icons/bidding-hover.svg' : '/icons/bidding.svg',
                                  join: isRowHovered ? '/icons/group-hover.svg' : '/icons/group.svg',
                                  view: isRowHovered ? '/icons/view-hover.svg' : '/icons/view.svg',
                                };
                            
                                const src = variantImageSrc[btn.variant as keyof typeof variantImageSrc] || '/icons/view.svg';
                            
                                const colorClass = btn.disabled
                                  ? 'text-[var(--light-grey-hex)]'
                                  : isRowHovered
                                  ? 'text-[var(--primary-white-hex)]'
                                  : btn.variant === 'delete'
                                  ? 'text-[var(--primary-red-hex)]'
                                  : btn.variant === 'edit'
                                  ? 'text-[var(--primary-green-hex)]'
                                  : btn.variant === 'bid'
                                  ? 'text-[var(--lighter-blue-hex)]'
                                  : 'text-[var(--lighter-blue-hex)]';
                            
                                return (
                                  <button
                                    key={bIdx}
                                    disabled={btn.disabled}
                                    onClick={btn.onClick}
                                    className="flex items-center gap-1 px-2 py-1 text-xs rounded"
                                  >
                                    <Image
                                      src={src}
                                      alt={btn.variant ?? 'icon'}
                                      width={16}
                                      height={16}
                                      className={`${colorClass} w-[2rem]`}
                                    />
                                  </button>
                                );
                              })}
                            </div>
                            
                            
                            );
                          default:
                            return null;
                        }
                      })()}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-8 text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* ✅ Pagination should be after full scrollable table container */}
   {rows.length > 0 && (
  <div className="flex items-end justify-end gap-4 mt-4 flex-wrap">
    {/* Prev Button */}
    <button
      onClick={handlePrev}
      disabled={page === 1}
      className=" bg-transparent p-2"
    >
      <Image src={'/icons/arrow-left.svg'} alt='arrow-left' width={100} height={100} className='w-[1rem]'/>
    </button>

    {/* Page Numbers */}
    <div className="flex items-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          className={`w-9 h-9 rounded-[0.5rem]  text-sm ${
            page === pageNum
              ? 'bg-[var(--pagination-btn-hex)] text-[var(--primary-black-hex)]'
              : ' text-[var(--darker-grey-hex)]'
          }`}
        >
          {pageNum}
        </button>
      ))}
    </div>

    {/* Next Button */}
    <button
      onClick={handleNext}
      disabled={page === totalPages}
      className=" bg-transparent p-2"
    >
       <Image src={'/icons/arrow-right.svg'} alt='arrow-right' width={100} height={100} className='w-[1rem]'/>
    </button>
  </div>
)}

    </div>
  );
  
  
};

export default Table;
