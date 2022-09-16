import { useState } from "react";
import { useForm } from "react-hook-form";

import useEditCategory from "../../../api/categories/useEditCategory";

import StandardInput from "../../../lib/components/input/StandardInput";
import Spinner from "../../../lib/components/Spinner";
import XButton from "../components/buttons/XButton";

import buildErrorMessage from "../../../util/buildErrorMessage";

const EditCategoryForm = ({ category, closeMe }) => {
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
      className="tw-flex tw-flex-col tw-items-stretch"
    >
      <label
        htmlFor="name"
        className="tw-text-14px tw-text-bt-black tw-font-medium tw-mb-6px tw-leading-none"
      >
        Category Name
      </label>
      <StandardInput
        id="name"
        // placeholder="Category Name"
        register={register("name", { required: "This is required" })}
        value={watch("name")}
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
        Category Description
      </label>
      <StandardInput
        id="description"
        // placeholder="Category Description"
        register={register("description")}
        value={watch("description")}
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

export default EditCategoryForm;
