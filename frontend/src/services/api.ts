/**
 * Client API layer with simulated async responses
 */
export async function mockFetch<T>(data: T, delayMs = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}

export const api = {
  get: mockFetch,
  post: mockFetch,
};
