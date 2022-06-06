import { useEffect, useRef, useState } from "react";

import { useTable, usePagination } from "@tanstack/react-table";
import ReactPaginate from "react-paginate";

import PagingSelect from "./select/PagingSelect";

import leftArrow from "../../components/shared/images/pagination/left-arrow.png";
import rightArrow from "../../components/shared/images/pagination/right-arrow.png";

const DataTable = ({
  className,
  columns,
  data,
  hiddenColumns = [],
  noHeader,
  noPagination,
  noPaginationForTenItems,
}) => {
  // const [currentPage, setCurrentPage] = useState(0);

  const paginationRef = useRef();
  const data_data = data ?? [];
  const showHeader = !noHeader;
  const showPagination =
    !noPagination && (data_data?.length > 10 || !noPaginationForTenItems);
  const initialState = { hiddenColumns };

  const tableInstance = useTable(
    {
      columns,
      data: data_data,
      initialState,
      autoResetHiddenColumns: false,
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const currentPage = pageIndex;
  const start = pageIndex * pageSize + 1;
  const end = start + pageSize - 1;
  const total = rows.length;
  const realEnd = end <= total ? end : total;

  const ddata = showPagination ? page : rows;

  const scrollToPagination = () => {
    setTimeout(
      () =>
        paginationRef.current.scrollIntoView({
          behavior: "auto",
          block: "start",
        }),
      200
    );
  };

  const handlePageClick = (event) => {
    gotoPage(event.selected);
    //setCurrentPage(event.selected);
    scrollToPagination();
  };

  //const className = "tw-cursor-default";

  const tableClass = "tw-min-w-full";
  const theadClass = "";
  const thClass = `tw-py-12px tw-font-medium tw-tracking-wider 
    tw-text-16px tw-font-medium tw-text-black tw-uppercase tw-text-left`;
  const rowClass = "tw-border-b tw-border-bt-blue-200";
  const cellClass =
    "tw-py-15px tw-text-18px tw-text-bt-gray-700 tw-whitespace-nowrap";

  const paginationClass = `tw-mt-10px tw-flex tw-justify-end tw-gap-5px tw-flex-wrap tw-text-14px tw-text-bt-gray-500 tw-mb-32px 
    tw-mt-38px tw-items-center`;

  return (
    <div className={`${className} `}>
      <div className="tw-overflow-y-visible">
        <table {...getTableProps()} className={`${tableClass}`}>
          {showHeader && (
            <thead className={`${theadClass}`}>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => {
                    let alignClass = "";
                    if (i === headerGroup.headers.length - 1) {
                      alignClass = "tw-text-right";
                    }
                    return (
                      <th
                        className={`${thClass} ${alignClass}`}
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
          )}
          <tbody {...getTableBodyProps()}>
            {ddata.map((row, i) => {
              prepareRow(row);
              return (
                <tr className={`${rowClass}`} {...row.getRowProps()}>
                  {row.cells.map((cell, idx) => {
                    let alignClass = "";
                    if (idx === row.cells.length - 1) {
                      alignClass = "tw-text-right";
                    }
                    return (
                      <td
                        className={`${cellClass} ${alignClass}`}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showPagination && (
        <div ref={paginationRef} className={`${paginationClass}`}>
          <span>
            Results {start} - {realEnd} of {total}
          </span>
          <PagingSelect
            className="tw-ml-5px tw-mr-36px"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              scrollToPagination();
            }}
            options={[
              { value: 10, text: "10" },
              { value: 20, text: "20" },
              { value: 30, text: "30" },
              { value: 40, text: "40" },
              { value: 50, text: "50" },
            ]}
          />
          <ReactPaginate
            forcePage={pageIndex}
            breakLabel="..."
            nextLabel={
              <div>
                <img src={rightArrow} />
              </div>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<img src={leftArrow} />}
            renderOnZeroPageCount={null}
            containerClassName="tw-inline-block"
            pageClassName="tw-inline-block tw-text-bt-gray-600"
            previousClassName="tw-inline-block"
            nextClassName="tw-inline-block"
            breakClassName="tw-inline-block"
            pageLinkClassName="tw-inline-flex tw-justify-center tw-items-center tw-text-14px 
            tw-w-40px tw-h-40px tw-rounded-full"
            activeLinkClassName="tw-bg-bt-orange tw-text-white tw-font-medium"
            previousLinkClassName="tw-inline-flex tw-justify-center tw-items-center 
            tw-w-40px tw-h-40px tw-rounded-full tw-bg-bt-blue-100"
            nextLinkClassName="tw-inline-flex tw-justify-center tw-items-center 
            tw-w-40px tw-h-40px tw-rounded-full tw-bg-bt-blue-100"
            disabledLinkClassName="tw-bg-transparent tw-cursor-default"
          />
          <span className="tw-font-medium tw-text-bt-gray-600 tw-ml-20px tw-mr-10px">
            Go to
          </span>
          <input
            placeholder={`e.g. 43`}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              if (!isNaN(page)) {
                gotoPage(page);
                scrollToPagination();
              }
            }}
            className="tw-h-40px tw-bg-bt-blue-100 tw-w-96px tw-text-18px tw-text-bt-gray-600 
            tw-outline-none tw-px-8px tw-rounded-5px"
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;
