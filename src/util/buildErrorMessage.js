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
    } else {
      message = "Error";
    }
  } catch {
    message = "Error";
  }
  return message;
};

export default buildErrorMessage;
