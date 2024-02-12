

export const EmailValidators = ({ onChange = null, onBlur = null } = {}) => {

  const obj = {
    required: { value: true, message: "required" },
    pattern: {
      value: /^[A-za0-9]+@[A-z]{2,}\.[A-z]{2,3}$/,
      message: "pattern"
    },
    onChange,
    onBlur
  };

  return obj;
}

export const PasswordValidators = ({ onChange = null, onBlur = null } = {}) => {
  const obj = {
    required: { value: true, message: "required" },
    minLength: { value: 8, message: "minLength" },
    pattern: {
      value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      message: "pattern"
    },
    onChange,
    onBlur
  }
  return obj;
}

export const ConfirmPassValidators = (form) => {
  const obj = {
    validate: (value) => {
      const { password } = form;
      return password === value ? true : "distinct";
    }
  }

  return obj
}

export const UserNameValidators = ({ onChange = null, onBlur = null } = {}) => {

  return {
    required: { value: true, message: "required" },
    minLength: { value: 4, message: "minLength" },
    maxLength: { value: 20, message: "maxLength" },
    pattern: { value: /^[a-zA-Z][a-zA-Z0-9-_.]{2,19}[\w]$/, message: "pattern" },
    onChange,
    onBlur
  }
}