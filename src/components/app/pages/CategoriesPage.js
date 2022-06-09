import { useMemo } from "react";

import DataTable from "../../../lib/components/DataTable";
import CategoriesList from "../../shared/components/CategoriesList";
import Button from "../../../lib/components/buttons/Button";

import noDataImg from "../../shared/images/no-data.png";
import editIcon from "../../shared/images/edit-icon.png";
import deleteIcon from "../../shared/images/delete-icon.png";

const sampleCategories = [
  { categoryId: 1, categoryName: "Food", description: "description" },
  { categoryId: 2, categoryName: "Travel", description: "description" },
];

const CategoriesPage = () => {
  const data = sampleCategories;
  const preparedData = useMemo(() => {
    return data;
  }, [data]);
  const columns = useMemo(
    () => [
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
        Cell: ({ cell }) => (
          <>
            <Button>
              <img src={editIcon} />
            </Button>
            <Button className="tw-ml-21px">
              <img src={deleteIcon} />
            </Button>
          </>
        ),
      },
    ],
    []
  );
  return (
    <>
      {preparedData ? (
        <div className="tw-flex tw-flex-col tw-items-stretch tw-overflow-hidden lg:tw-overflow-visible">
          <DataTable
            className="tw-hidden lg:tw-block"
            columns={columns}
            data={preparedData}
          />
          <CategoriesList
            className="lg:tw-hidden tw-grow"
            data={preparedData}
          />
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

export default CategoriesPage;
