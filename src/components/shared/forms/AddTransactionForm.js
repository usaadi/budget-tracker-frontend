import { useState } from "react";
import { useForm } from "react-hook-form";

import { validate as isValidUUID } from "uuid";

import useCreateTransaction from "../../../api/transactions/useCreateTransaction";
import useCategories from "../../../api/categories/useCategories";

import StandardInput from "../../../lib/components/input/StandardInput";
import StandardSelect from "../../../lib/components/select/StandardSelect";
import StandardDatePicker from "../../../lib/components/date-picker/StandardDatePicker";

import buildErrorMessage from "../../../util/buildErrorMessage";

import XButton from "../../shared/components/buttons/XButton";
import Spinner from "../../../lib/components/Spinner";
import whiteCrossIcon from "../../shared/images/white-cross.png";

import { getTransactionTypeName } from "../../../util/getEnumName";
import patterns from "../../../constants/patterns";

const AddTransactionForm = ({ isHidden, transactionType, openToDate, closeMe }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const displayClass = isHidden ? "tw-hidden" : "tw-flex";

  const transactionTypeName = getTransactionTypeName(transactionType);
  console.log(transactionType);
  console.log(transactionTypeName);

  const categoriesInfo = useCategories(transactionTypeName);
  const categories = categoriesInfo.isSuccess ? categoriesInfo.data.data.items : [];

  const categoriesOptions = categories.map((category) => ({
    value: category.uniqueId,
    label: category.name,
  }));

  console.log(categoriesOptions);

  const createTransactionMutation = useCreateTransaction();

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
      amount: "",
      categoryUniqueId: "",
      transactionDate: openToDate,
      description: "",
    },
    mode: "onChange",
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
    // console.log("data.transactionDate " + data.transactionDate);
    // console.log("type " + typeof data.transactionDate);
    const result = await createTransactionMutation.mutateAsync(
      {
        amount: data.amount,
        categoryUniqueId: categoryUniqueId,
        createCategoryCommand: createCategoryCommand,
        transactionDate: data.transactionDate,
        description: data.description,
      },
      {
        onSuccess: async (data) => {
          setIsLoading(false);
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
    <form onSubmit={handleSubmit(onSubmit, onErrorSubmit)} className={`${displayClass} tw-flex-col tw-items-stretch`}>
      <label className="tw-text-14px tw-text-bt-black tw-font-medium tw-mb-6px tw-leading-none">Date</label>
      <StandardDatePicker
        //openToDate={openToDate}
        control={control}
        validationRules={{ required: "This field is required" }}
        name="transactionDate"
        errorMessage={errors.transactionDate?.message}
        className="tw-mb-20px"
      />
      <label className="tw-text-14px tw-text-bt-black tw-font-medium tw-mb-6px tw-leading-none">Amount</label>
      <StandardInput
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
      <label className="tw-text-14px tw-text-bt-black tw-font-medium tw-mb-6px tw-leading-none">Category</label>
      <StandardSelect
        options={categoriesOptions}
        control={control}
        name="categoryUniqueId"
        validationRules={{ required: "This field is required" }}
        allowCreate={true}
        // placeholder="Category"
        errorMessage={errors.categoryUniqueId?.message}
        borderColorClass="tw-border-db-blue-gray-1/50"
        fontSize="18px"
        fontFamily="Satoshi"
        placeholderColor="#7d86a9"
        textColor="#13141C"
        className="tw-mb-20px"
      />
      <label className="tw-text-14px tw-text-bt-black tw-font-medium tw-mb-6px tw-leading-none">
        Description (Optional)
      </label>
      <StandardInput
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
          <img src={whiteCrossIcon} />
          <span>Add new</span>
        </span>
      </XButton>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default AddTransactionForm;
