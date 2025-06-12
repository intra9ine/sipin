import { TableProps } from '@/lib/type';
import React, { useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';



const Table: React.FC<TableProps> = ({ headers, rows }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <div className="overflow-x-auto">
      <div className="overflow-y-auto max-h-[60vh] rounded-[1rem] shadow-md border bg-white">
        <table className="min-w-max w-full border-collapse table-auto text-sm">
          <thead className="bg-[var(--primary-blue-hex)] shadow-md text-[var(--primary-white-hex)] sticky top-0 z-10">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="text-center px-8 py-4 border-r-[var(--primary-blue-hex)]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="even:bg-[var(--table-blue-hex)] hover:bg-[var(--pinkish-white-hex)]"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-4 border border-r-[var(--primary-blue-hex)] last:border-none shadow-md align-top"
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
                              <select
                                value={cell.value}
                                onChange={(e) => cell.onChange(e.target.value)}
                                className="input--select"
                              >
                                {cell.options.map((opt, i) => (
                                  <option key={i} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            );
                          case 'actions':
                            return (
                              <div className="flex gap-2 flex-wrap">
                                {cell.buttons.map((btn, bIdx) => {
                                  const Icon =
                                    btn.variant === 'delete'
                                      ? FaTrash
                                      : btn.variant === 'edit'
                                      ? FaEdit
                                      : FaEye;
  
                                  return (
                                    <button
                                      key={bIdx}
                                      onClick={btn.onClick}
                                      className={`flex items-center gap-1 px-2 py-1 text-xs rounded`}
                                    >
                                      <Icon
                                        className={`text-xl ${
                                          btn.variant === 'delete'
                                            ? 'text-[var(--primary-red-hex)]'
                                            : btn.variant === 'edit'
                                            ? 'text-[var(--primary-blue-hex)]'
                                            : 'text-[var(--lighter-blue-hex)]'
                                        }`}
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
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="disabled:opacity-50"
          >
            <BsArrowLeftCircleFill className="text-[var(--primary-blue-hex)] text-4xl" />
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="disabled:opacity-50"
          >
            <BsArrowRightCircleFill className="text-[var(--primary-blue-hex)] text-4xl" />
          </button>
        </div>
      )}
    </div>
  );
  
  
};

export default Table;
