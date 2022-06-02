import { useTable, usePagination } from "react-table";

const DataTable = ({
  className,
  columns,
  data,
  hiddenColumns = [],
  noHeader,
  noPagination,
  noPaginationForTenItems,
}) => {
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

  const ddata = showPagination ? page : rows;

  //const className = "tw-text-16px tw-font-medium";

  const tableClass = "tw-min-w-full";
  const theadClass = "tw-select-none tw-text-16px tw-font-medium tw-text-black";
  const thClass = `tw-py-2 tw-px-6 tw-text-xs tw-font-medium tw-tracking-wider 
    tw-text-gray-700 tw-uppercase tw-text-left`;
  const rowClass = "tw-border-b odd:tw-bg-white/40 even:tw-bg-zinc-200/50";
  const cellClass =
    "tw-py-2 tw-px-6 tw-text-sm tw-font-medium tw-text-gray-900 tw-whitespace-nowrap";

  const paginationClass = "tw-mt-10px tw-flex tw-gap-5px tw-flex-wrap";

  return (
    <div
      className={`${className} tw-border tw-border-solid tw-border-black/30 tw-rounded tw-p-8px`}
    >
      <div className="tw-overflow-y-visible">
        <table {...getTableProps()} className={`${tableClass}`}>
          {showHeader && (
            <thead className={`${theadClass}`}>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th className={`${thClass}`} {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          )}
          <tbody {...getTableBodyProps()}>
            {ddata.map((row, i) => {
              prepareRow(row);
              return (
                <tr className={`${rowClass}`} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className={`${cellClass}`} {...cell.getCellProps()}>
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
        <div className={`${paginationClass}`}>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            className="tw-ml-5px"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default DataTable;
