import { useState } from "react";
import { useForm } from "react-hook-form";

import useCreateTransaction from "../../../api/transactions/useCreateTransaction";
import useCategories from "../../../api/categories/useCategories";

import StandardInput from "../../../lib/components/input/StandardInput";
import StandardSelect from "../../../lib/components/select/StandardSelect";
import StandardDatePicker from "../../../lib/components/date-picker/StandardDatePicker";

import Spinner from "../../../lib/components/Spinner";
import { getTransactionTypeName } from "../../../util/getEnumName";
import patterns from "../../../constants/patterns";

const AddNewTransactionForm = ({ transactionType, closeMe }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const transactionTypeName = getTransactionTypeName(transactionType);
  console.log(transactionType);
  console.log(transactionTypeName);

  const categoriesInfo = useCategories(transactionTypeName);
  const categories = categoriesInfo.isSuccess
    ? categoriesInfo.data.data.items
    : [];

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
      transactionDate: "",
      description: "",
    },
    mode: "onChange",
  });

  const BuildErrorMessage = (error) => {
    const errorData = error?.response?.data;
    let message = "";
    if (errorData && errorData.status === 400) {
      message += errorData.title;
      for (var item in errorData.errors) {
        var arr = errorData.errors[item];
        arr.forEach((msg) => {
          message += " " + msg;
        });
      }
    } else {
      message = "Error";
    }
    setErrorMessage(message);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    const result = await createTransactionMutation.mutateAsync(
      {
        amount: data.amount,
        categoryUniqueId: data.categoryUniqueId,
        transactionDate: data.transactionDate,
        description: data.description,
      },
      {
        onSuccess: async (data) => {
          closeMe();
        },
        onError: async (error) => {
          BuildErrorMessage(error);
        },
        onSettled: async (data) => {
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
      className="tw-flex tw-flex-col tw-items-stretch tw-w-668px tw-mt-40px tw-pb-36px"
    >
      <StandardInput
        placeholder="Amount"
        register={register("amount", {
          required: { value: true, message: "This field is required" },
          pattern: {
            value: patterns.decimal_3p,
            message: "Must be a valid amount",
          },
          //valueAsNumber: true,
        })}
        //name="amount"
        //errorMessage={errors.amount ? "error" : "no-error"}
        errorMessage={errors.amount?.message}
        borderColorClass="tw-border-db-blue-gray-1/50"
        textClass="tw-font-roboto tw-text-16px"
        placeholderClass="placeholder:tw-text-db-gray-27"
        className="tw-mb-20px"
      />
      <StandardDatePicker
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
        ADD
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default AddNewTransactionForm;
