import { validationResult } from "express-validator";

export const validateResult = (req: any) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) {
    console.log(errors);
  }
  return errors;
};
