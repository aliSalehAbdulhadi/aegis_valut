const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s-]{8,15}$/;
const PASSWORD_MIN_LENGTH = 6;

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required';
  if (!EMAIL_REGEX.test(email)) return 'Invalid email format';
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return 'Phone number is required';
  if (!PHONE_REGEX.test(phone)) return 'Invalid phone number';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < PASSWORD_MIN_LENGTH)
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  return null;
}

export function validateSignUpForm(data: {
  email: string;
  phone: string;
  password: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  const emailError = validateEmail(data.email);
  const phoneError = validatePhone(data.phone);
  const passwordError = validatePassword(data.password);

  if (emailError) errors.email = emailError;
  if (phoneError) errors.phone = phoneError;
  if (passwordError) errors.password = passwordError;

  return errors;
}
