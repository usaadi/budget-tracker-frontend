import { useMemo } from "react";
import DataTable from "../../../lib/components/DataTable";

import { getMonthYear } from "../../../lib/util/formatting/dateFormatting";

const Summary = ({ selectedMonth }) => {
  const strDate = getMonthYear(selectedMonth);

  const data = useMemo(
    () => [
      {
        item: "Expenses",
        description: "JOD 4000",
      },
      {
        item: "Income",
        description: "JOD 8000",
      },
      {
        item: "Balance",
        description: "JOD 4000",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Item",
        accessor: "item", // accessor is the "key" in the data
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );

  return (
    <div>
      <div>
        <div className="tw-mb-10px">Summary for month: {strDate}</div>
        <DataTable
          columns={columns}
          data={data}
          noHeader={true}
          noPagination={true}
        />
      </div>
    </div>
  );
};

export default Summary;
