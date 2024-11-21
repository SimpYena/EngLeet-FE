export interface ErrorInfo {
  error_id?: string,
  title?: string,
  message?: string,
  field?: string,
  errors?: [ErrorInfo];
};
