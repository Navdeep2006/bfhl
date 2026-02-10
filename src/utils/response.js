export const success = (email, data = undefined) => ({
  is_success: true,
  official_email: email,
  data
});

export const fail = (email, message) => ({
  is_success: false,
  official_email: email,
  error: message
});
