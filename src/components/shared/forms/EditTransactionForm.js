import { useState } from "react";
import { useForm } from "react-hook-form";

import useEditTransaction from "../../../api/transactions/useEditTransaction";
import useCategories from "../../../api/categories/useCategories";

import buildErrorMessage from "../../../util/buildErrorMessage";

import StandardInput from "../../../lib/components/input/StandardInput";
import StandardSelect from "../../../lib/components/select/StandardSelect";
import StandardDatePicker from "../../../lib/components/date-picker/StandardDatePicker";
import Spinner from "../../../lib/components/Spinner";
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
  console.log(
    "transaction.transactionDate type  " + typeof transaction.transactionDate
  );

  const categoriesInfo = useCategories(transactionTypeName);
  const categories = categoriesInfo.isSuccess
    ? categoriesInfo.data.data.items
    : [];

  const categoriesOptions = categories.map((category) => ({
    value: category.uniqueId,
    label: category.name,
  }));

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
    console.log("data.transactionDate " + typeof data.transactionDate);
    const result = await editTransactionMutation.mutateAsync(
      {
        uniqueId: transaction.uniqueId,
        description: data.description,
        categoryUniqueId: data.categoryUniqueId,
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
      className="tw-flex tw-flex-col tw-items-stretch lg:tw-w-668px tw-mt-40px tw-pb-36px"
    >
      <StandardInput
        placeholder="Amount"
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
      <StandardDatePicker
        //openToDate={openToDate}
        control={control}
        validationRules={{ required: "This field is required" }}
        name="transactionDate"
        errorMessage={errors.transactionDate?.message}
        className="tw-mb-20px"
      />
      <StandardInput
        placeholder="Description"
        register={register("description")}
        errorMessage={errors.description?.message}
        borderColorClass="tw-border-db-blue-gray-1/50"
        textClass="tw-font-roboto tw-text-16px"
        placeholderClass="placeholder:tw-text-db-gray-27"
        className="tw-mb-20px"
      />
      <StandardSelect
        options={categoriesOptions}
        control={control}
        name="categoryUniqueId"
        validationRules={{ required: "This field is required" }}
        allowCreate={false}
        placeholder="Category"
        errorMessage={errors.categoryUniqueId?.message}
        borderColorClass="tw-border-db-blue-gray-1/50"
        fontSize="16px"
        fontFamily="Roboto"
        placeholderColor="#7d86a9"
        className="tw-mb-20px"
      />
      <button
        type="submit"
        className="tw-self-center tw-bg-standard-btn-gradient-green-2 tw-px-10px tw-rounded-md"
      >
        {isLoading && <Spinner strokeColor="black" />}
        SAVE
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default EditTransactionForm;
