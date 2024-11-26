export const registrationInputValidation = (values) => {
  let errors = {};

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordPattern = /^(?=.*[a-zA-Z0-9]).{8,}$/;

  const validateField = (value, pattern, fieldName) => {
    if (!value || (value.trim && !value.trim())) {
      return `*required`;
    } else if (pattern && !pattern.test(value)) {
      return `Invalid ${fieldName}`;
    }
    return "";
  };

  const requiredFields = ['firstname', 'lastname', 'middlename', 'gender', 'birthday', 'username', "confirm_password"];

  requiredFields.forEach(field => {
    errors[field] = validateField(values[field], null, field);
  });

  errors.email = validateField(values.email, emailPattern, 'email');
  errors.password = validateField(values.password, passwordPattern, 'password');

  if (values.password !== values.confirm_password) {
    errors.confirm_password = "*Passwords do not match";
    errors.password = "*Passwords do not match";
  }

  return errors;
};
