export interface ErrorResponse {
  readonly message: string;

  readonly status: number;

  readonly code?: string;
}
