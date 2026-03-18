import { BASE_URL } from "../Config/Api";

const ABSOLUTE_URL_REGEX = /^(https?:)?\/\//i;

export const resolveImageUrl = (imageUrl?: string) => {
  if (!imageUrl) return "";

  const value = imageUrl.trim();

  if (!value) return "";
  if (ABSOLUTE_URL_REGEX.test(value)) return value;
  if (value.startsWith("data:") || value.startsWith("blob:")) return value;

  const normalizedBaseUrl = BASE_URL.replace(/\/+$/, "");
  const normalizedPath = value.startsWith("/") ? value : `/${value}`;

  return `${normalizedBaseUrl}${normalizedPath}`;
};
