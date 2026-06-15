export const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

export type ApiResponse = {
  success?: boolean | string;
  message?: string;
  [key: string]: unknown;
};

export const getErrorMessage = (
  error: unknown,
  fallback = DEFAULT_ERROR_MESSAGE,
): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export const getResponseMessage = (
  data: ApiResponse,
  fallback: string,
): string => {
  return typeof data.message === "string" ? data.message : fallback;
};

export async function fetchJson<T extends ApiResponse = ApiResponse>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, options);

  let data: T;
  try {
    data = await res.json();
  } catch {
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }

  if (!res.ok) {
    const message =
      (data as { message?: string })?.message ||
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data;
}
