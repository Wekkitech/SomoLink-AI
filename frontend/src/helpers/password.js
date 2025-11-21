export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
export function validatePassword(p) {
  if (!PASSWORD_REGEX.test(p)) {
    return "Password must be at least 8 chars, include uppercase, lowercase, number and special char.";
  }
  return "";
}
