export interface ValidationResult {
  isValid: boolean;
  errors: {
    email?: string;
    password?: string;
    terms?: string;
  };
}

export const validateRegisterForm = (
  email: string,
  password: string,
  confirmPassword: string,
  acceptTerms: boolean,
): ValidationResult => {
  const errors: ValidationResult["errors"] = {};
  let isValid = true;

  if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
    isValid = false;
  }

  if (password !== confirmPassword) {
    errors.password = "Passwords do not match";
    isValid = false;
  }

  if (!acceptTerms) {
    errors.terms = "You must accept the terms and conditions";
    isValid = false;
  }

  return { isValid, errors };
};
