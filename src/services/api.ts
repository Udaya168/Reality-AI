/**
 * Client API layer with mock delay simulators for prototype execution
 */
export async function mockFetch<T>(data: T, delayMs = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}

export const api = {
  get: mockFetch,
  post: mockFetch,
};
