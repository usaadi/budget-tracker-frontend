import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";

import { validate as isValidUUID } from "uuid";

import useEditTransaction from "../../../api/transactions/useEditTransaction";
import useCategories from "../../../api/categories/useCategories";

import buildErrorMessage from "../../../util/buildErrorMessage";

import StandardInput from "../../../lib/components/input/StandardInput";
import StandardSelect from "../../../lib/components/select/StandardSelect";
import StandardDatePicker from "../../../lib/components/date-picker/StandardDatePicker";

import Spinner from "../../../lib/components/Spinner";
import XButton from "../../shared/components/buttons/XButton";
import whiteCrossIcon from "../../shared/images/white-cross.png";

import patterns from "../../../constants/patterns";
import { getTransactionTypeName } from "../../../util/getEnumName";

const EditTransactionForm = ({ transaction, closeMe }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const transactionType = transaction.transactionType;
  const transactionTypeName = getTransactionTypeName(transactionType);

  // console.log("transaction: " + JSON.stringify(transaction));
  // console.log("transactionType: " + transactionType);
  // console.log("transaction.category: " + transaction.category);

  console.log("transaction.transactionDate " + transaction.transactionDate);
  console.log("transaction.transactionDate type  " + typeof transaction.transactionDate);

  const categoriesInfo = useCategories(transactionTypeName, 0, 0, true);
  const categories = categoriesInfo.isSuccess ? categoriesInfo.data.data.items : [];

  const categoriesOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.uniqueId,
        label: category.name,
      })),
    [categories]
  );

  const editTransactionMutation = useEditTransaction();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryUniqueId: transaction.category.uniqueId,
      amount: transaction.amount,
      description: transaction.description,
      transactionDate: transaction.transactionDate,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    let categoryUniqueId;
    let createCategoryCommand;
    if (isValidUUID(data.categoryUniqueId)) {
      createCategoryCommand = null;
      categoryUniqueId = data.categoryUniqueId;
    } else {
      categoryUniqueId = null;
      createCategoryCommand = {
        name: data.categoryUniqueId,
        transactionType: transactionType,
      };
    }
    const result = await editTransactionMutation.mutateAsync(
      {
        uniqueId: transaction.uniqueId,
        description: data.description,
        categoryUniqueId: categoryUniqueId,
        createCategoryCommand: createCategoryCommand,
        amount: data.amount,
        transactionDate: data.transactionDate,
      },
      {
        onSuccess: async (data) => {
          closeMe();
        },
        onError: async (error) => {
          const errorMsg = buildErrorMessage(error);
          setErrorMessage(errorMsg);
          setIsLoading(false);
        },
      }
    );
  };

  const onErrorSubmit = async (error) => {
    // SetSubmitTriggered(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onErrorSubmit)}
      className="tw-flex tw-flex-col tw-items-stretch"
    >
      <label
        htmlFor="transaction-date"
        className="tw-text-14px tw-text-bt-black tw-font-medium tw-mb-6px tw-leading-none"
      >
        Date
      </label>
      <StandardDatePicker
        id="transaction-date"
        //openToDate={openToDate}
        control={control}
        validationRules={{ required: "This field is required" }}
        name="transactionDate"
        errorMessage={errors.transactionDate?.message}
        className="tw-mb-20px"
      />
      <label
        htmlFor="amount"
        className="tw-text-14px tw-text-bt-black tw-font-medium tw-mb-6px tw-leading-none"
      >
        Amount
      </label>
      <StandardInput
        id="amount"
        // placeholder="Amount"
        register={register("amount", {
          required: { value: true, message: "This field is required" },
          pattern: {
            value: patterns.decimal_3p,
            message: "Must be a valid amount",
          },
        })}
        errorMessage={errors.amount?.message}
        borderColorClass="tw-border-db-blue-gray-1/50"
        textClass="tw-font-roboto tw-text-16px"
        placeholderClass="placeholder:tw-text-db-gray-27"
        className="tw-mb-20px"
      />
      <label
        htmlFor="category"
        className="tw-text-14px tw-text-bt-black tw-font-medium tw-mb-6px tw-leading-none"
      >
        Category
      </label>
      <StandardSelect
        id="category"
        options={categoriesOptions}
        control={control}
        name="categoryUniqueId"
        validationRules={{ required: "This field is required" }}
        allowCreate={true}
        isClearable={false}
        // placeholder="Category"
        errorMessage={errors.categoryUniqueId?.message}
        borderColorClass="tw-border-db-blue-gray-1/50"
        fontSize="18px"
        fontFamily="Satoshi"
        placeholderColor="#7d86a9"
        textColor="#13141C"
        className="tw-mb-20px"
      />
      <label
        htmlFor="description"
        className="tw-text-14px tw-text-bt-black tw-font-medium tw-mb-6px tw-leading-none"
      >
        Description (Optional)
      </label>
      <StandardInput
        id="description"
        // placeholder="Description"
        register={register("description")}
        errorMessage={errors.description?.message}
        borderColorClass="tw-border-db-blue-gray-1/50"
        textClass="tw-font-roboto tw-text-16px"
        placeholderClass="placeholder:tw-text-db-gray-27"
        className="tw-mb-20px"
      />
      <XButton type="submit" className="tw-text-18px tw-font-bold">
        <span className="tw-flex tw-justify-center tw-items-center tw-gap-10px">
          {isLoading && <Spinner strokeColor="white" />}
          <span>Save</span>
        </span>
      </XButton>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default EditTransactionForm;
