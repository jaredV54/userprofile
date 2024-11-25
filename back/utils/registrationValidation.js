export const registrationInputValidation = (values) => {
  let errors = {};
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordPattern = /^(?=.*[a-zA-Z0-9]).{3,}$/;

  if (!values.firstname) {
    errors.firstname = "*required";
  } else {
    errors.firstname = "";
  }

  if (!values.lastname) {
    errors.lastname = "*required";
  } else {
    errors.lastname = "";
  }

  if (!values.username) {
    errors.lastname = "*required";
  } else {
    errors.lastname = "";
  }

  if (!values.email.trim()) {
    errors.email = "*required";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Invalid email address";
  } else {
    errors.email = "";
  }

  if (!values.password) {
    errors.password = "*required";
  } else if (!passwordPattern.test(values.password)) {
    errors.password = "minimum 3 characters"; 
  } else {
    errors.password = "";
  }

  return errors;
};