import { useState } from "react";
import { useForm } from "react-hook-form";

import useCreateCategory from "../../../api/categories/useCreateCategory";

import StandardInput from "../../../lib/components/input/StandardInput";
import Spinner from "../../../lib/components/Spinner";

const AddNewCategoryForm = (categoryType, closeMe) => {
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

  const doSubmit = async (data) => {
    setIsLoading(true);
    const result = await createCategoryMutation.mutateAsync(
      {
        categoryType,
        name: data.name,
        description: data.description,
      },
      {
        onSuccess: async (data) => {
          closeMe();
        },
        onError: async (error) => {
          setErrorMessage("Error");
        },
        onSettled: async (data) => {
          setIsLoading(false);
        },
      }
    );
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    //const result = await Auth.login(data.email, data.password);
    //const result = true;
    const result = await doSubmit(data);
    setIsLoading(false);
    if (result === true) {
      //onLogin();
    } else if (result?.data?.detail) {
      let msg = result.data.detail;
      if (result.data.detail === "LOGIN_BAD_CREDENTIALS") {
        msg = "Wrong email or password.";
      }
      setErrorMessage(msg);
    } else {
      setErrorMessage("Login failed.");
    }
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
