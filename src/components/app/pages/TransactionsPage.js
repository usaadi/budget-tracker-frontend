import { useMemo } from "react";

import DataTable from "../../../lib/components/DataTable";
import XList from "../../shared/components/XList";

import noDataImg from "../../shared/images/no-data.png";

import { transactionTypeEnum } from "../../../constants/enums";
import { shortDateFormatter } from "../../../lib/util/formatting/dateFormatting";

const sampleIncome = [
  {
    transactionDate: "2022-01-02T00:00:00+00:00",
    amount: 1000,
    categoryId: 1,
    categoryName: "Salary",
    description: "",
  },
];

const sampleExpenses = [
  {
    transactionDate: "2022-01-02T00:00:00+00:00",
    amount: 50,
    categoryId: 1,
    categoryName: "Food",
    description: "",
  },
];

const TransactionsPage = ({ transactionType }) => {
  const data =
    transactionType === transactionTypeEnum.income
      ? sampleIncome
      : sampleExpenses;
  const formattedData = useMemo(() => {
    return data.map((x) => ({
      transactionDateStr: shortDateFormatter(x.transactionDate),
      ...x,
    }));
  }, [data]);
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "transactionDateStr",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Category",
        accessor: "categoryName",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        accessor: "",
      },
    ],
    []
  );
  return (
    <>
      {data ? (
        <div className="tw-flex tw-flex-col tw-items-stretch tw-overflow-hidden lg:tw-overflow-visible">
          <DataTable
            className="tw-hidden lg:tw-block"
            columns={columns}
            data={formattedData}
          />
          <XList className="lg:tw-hidden tw-grow" data={formattedData} />
        </div>
      ) : (
        <div className="tw-flex-center tw-flex-col tw-h-full tw-gap-32px">
          <img src={noDataImg} />
          <h1 className="tw-text-34px tw-font-medium">No data to display</h1>
        </div>
      )}
    </>
  );
};

export default TransactionsPage;
