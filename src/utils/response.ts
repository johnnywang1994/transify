export const SuccessResponse = (data?: any) => ({
  msg: "success",
  data,
});

export const FailedResponse = (error: any = "failed") => ({
  error,
});

export const breakArrayIfOne = (result: any[]) =>
  result.length > 1 ? result : result[0];
