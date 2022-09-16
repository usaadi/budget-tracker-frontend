import { useState } from "react";
import { useForm } from "react-hook-form";

import useCreateCategory from "../../../api/categories/useCreateCategory";

import buildErrorMessage from "../../../util/buildErrorMessage";

import StandardInput from "../../../lib/components/input/StandardInput";
import StandardSelect from "../../../lib/components/select/StandardSelect";

import XButton from "../../shared/components/buttons/XButton";
import Spinner from "../../../lib/components/Spinner";
import whiteCrossIcon from "../../shared/images/white-cross.png";
import { transactionTypeEnum } from "../../../constants/enums";

const AddCategoryForm = ({ isHidden, closeMe }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const displayClass = isHidden ? "tw-hidden" : "tw-flex";

  const createCategoryMutation = useCreateCategory();

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
      name: "",
      description: "",
      transactionType: null,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    const result = await createCategoryMutation.mutateAsync(
      {
        transactionType: data.transactionType,
        name: data.name,
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

  const transactionTypeOptions = [
    { value: transactionTypeEnum.income, label: "Income" },
    { value: transactionTypeEnum.expenses, label: "Expenses" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onErrorSubmit)}
      className={`${displayClass} tw-flex-col tw-items-stretch`}
    >
      <label
        htmlFor="transaction-type"
        className="tw-text-14px tw-text-bt-black tw-font-medium tw-mb-6px tw-leading-none"
      >
        Type
      </label>
      <StandardSelect
        id="transaction-type"
        options={transactionTypeOptions}
        control={control}
        name="transactionType"
        validationRules={{ required: "This field is required" }}
        allowCreate={false}
        // placeholder="Category"
        errorMessage={errors.transactionType?.message}
        borderColorClass="tw-border-db-blue-gray-1/50"
        fontSize="18px"
        fontFamily="Satoshi"
        placeholderColor="#7d86a9"
        textColor="#13141C"
        className="tw-mb-20px"
      />
      <label
        htmlFor="name"
        className="tw-text-14px tw-text-bt-black tw-font-medium tw-mb-6px tw-leading-none"
      >
        Name
      </label>
      <StandardInput
        id="name"
        // placeholder="Category Name"
        register={register("name", {
          required: { value: true, message: "This field is required" },
        })}
        errorMessage={errors.name?.message}
        borderColorClass="tw-border-db-blue-gray-1/50"
        textClass="tw-font-roboto tw-text-16px"
        placeholderClass="placeholder:tw-text-db-gray-27"
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
        // placeholder="Category Description"
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

export default AddCategoryForm;
