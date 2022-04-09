import { useState } from "react";
import { useForm } from "react-hook-form";

import useEditCategory from "../../../api/categories/useEditCategory";

import StandardInput from "../../../lib/components/input/StandardInput";
import Spinner from "../../../lib/components/Spinner";

import buildErrorMessage from "../../../util/buildErrorMessage";

const EditCategoryForm = ({ category, transactionType, closeMe }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const editCategoryMutation = useEditCategory();

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
      name: category.name,
      description: category.description,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    const result = await editCategoryMutation.mutateAsync(
      {
        uniqueId: category.uniqueId,
        name: data.name,
        description: data.description,
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
      className="tw-flex tw-flex-col tw-items-stretch tw-w-668px tw-mt-40px tw-pb-36px"
    >
      <StandardInput
        placeholder="Category Name"
        register={register("name", { required: "This is required" })}
        value={watch("name")}
        errorMessage={errors.name?.message}
        borderColorClass="tw-border-db-blue-gray-1/50"
        textClass="tw-font-roboto tw-text-16px"
        placeholderClass="placeholder:tw-text-db-gray-27"
        className="tw-mb-20px"
      />
      <StandardInput
        placeholder="Category Description"
        register={register("description")}
        value={watch("description")}
        errorMessage={errors.description?.message}
        borderColorClass="tw-border-db-blue-gray-1/50"
        textClass="tw-font-roboto tw-text-16px"
        placeholderClass="placeholder:tw-text-db-gray-27"
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

export default EditCategoryForm;
