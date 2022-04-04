import { useState } from "react";
import { useForm } from "react-hook-form";

import useCreateCategory from "../../../api/categories/useCreateCategory";

import StandardInput from "../../../lib/components/input/StandardInput";
import Spinner from "../../../lib/components/Spinner";

const AddNewCategoryForm = ({ categoryType, closeMe }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    },
  });

  const BuildErrorMessage = (error) => {
    const errorData = error?.response?.data;
    let message = "";
    if (errorData && errorData.status === 400) {
      message += errorData.title;
      console.log("keys");
      for (var item in errorData.errors) {
        console.log(item);
        console.log("arr");
        var arr = errorData.errors[item];
        console.log(arr);
        console.log("messages");
        arr.forEach((msg) => {
          console.log(msg);
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
    const result = await createCategoryMutation.mutateAsync(
      {
        categoryType: categoryType,
        name: data.name,
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
        placeholder="Category Name"
        register={register("name")}
        errorMessage={errors.name?.message}
        borderColorClass="tw-border-db-blue-gray-1/50"
        textClass="tw-font-roboto tw-text-16px"
        placeholderClass="placeholder:tw-text-db-gray-27"
        className="tw-mb-20px"
      />
      <StandardInput
        placeholder="Category Description"
        register={register("description")}
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
        ADD
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default AddNewCategoryForm;
