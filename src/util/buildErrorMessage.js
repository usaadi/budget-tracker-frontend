const buildErrorMessage = (error) => {
  let message = "";
  try {
    const errorData = error?.response?.data;
    if (errorData && errorData.status === 400) {
      message += errorData.title;
      for (var item in errorData.errors) {
        var arr = errorData.errors[item];
        arr.forEach((msg) => {
          message += " " + msg;
        });
      }
    } else if (error.response) {
      message = "Error. Check console for details.";
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      message = "Error. Check console for details.";
      console.log(error.request);
    } else {
      message = `Error. ${error.message}`;
    }
  } catch {
    message = "Error";
  }
  return message;
};

export default buildErrorMessage;
