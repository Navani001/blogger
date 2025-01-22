export const validateURL = (url: string): string => {
  if (!url.trim()) return "URL is required";
  if (url.includes(" ")) return "URL cannot contain spaces";
  
  // Check for special characters except for - and _
  const specialCharsRegex = /[!@#$%^&*()+={}\[\]|\\:;"'<>,?~`]/;
  if (specialCharsRegex.test(url)) {
    return "URL cannot contain special characters except - and _";
  }

  // Check length
  if (url.length < 3) return "URL must be at least 3 characters long";
  if (url.length > 50) return "URL must be less than 50 characters";

  // Check for starting/ending hyphens
  if (url.startsWith("-") || url.endsWith("-")) {
    return "URL cannot start or end with a hyphen";
  }

  // Check for consecutive hyphens
  if (url.includes("--")) {
    return "URL cannot contain consecutive hyphens";
  }

  // Only allow letters, numbers, hyphens, and underscores
  const validCharactersRegex = /^[a-zA-Z0-9-_]+$/;
  if (!validCharactersRegex.test(url)) {
    return "URL can only contain letters, numbers, hyphens, and underscores";
  }

  return "valid";
};