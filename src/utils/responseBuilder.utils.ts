export interface SuccessResponse {
  statusCode: number;
  message: string;
  body: any;
}
export function createSuccessResponse(
  statusCode: number,
  message: string,
  body: any,
): SuccessResponse {
  return {
    statusCode,
    message,
    body,
  };
}
