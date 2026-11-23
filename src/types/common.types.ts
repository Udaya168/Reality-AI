/**
 * Common application types and primitives
 */
export type StatusType = 'idle' | 'loading' | 'success' | 'error';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  total?: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
