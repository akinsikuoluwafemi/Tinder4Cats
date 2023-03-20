export function useEnvVars() {
  const API_KEY = process.env['NEXT_PUBLIC_CATS_API_KEY'] as string;

  const API_ENDPOINT = process.env['NEXT_PUBLIC_API_ENDPOINT'] as string;

  return {
    API_KEY,
    API_ENDPOINT,
  };
}
