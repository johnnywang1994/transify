import { Router } from "express";
import {
  query,
  param,
  body,
  matchedData,
  validationResult,
} from "express-validator";

import Project from "../models/project";
import {
  FailedResponse,
  SuccessResponse,
  breakArrayIfOne,
} from "../utils/response";

export const prefix = "/api/project";

const router = Router();

router.get("/list", query(["skip", "take"]).optional(), async (req, res) => {
  const { skip = 0, take = 50 } = matchedData(req);
  try {
    const result = await Project.findMany(Number(skip), Number(take));
    res.json(SuccessResponse(result));
  } catch (err) {
    console.error(err);
    res.json(FailedResponse());
  }
});

router.get(
  "/item/:idOrName",
  param("idOrName").isString(),
  async (req, res) => {
    const { idOrName } = matchedData(req);
    try {
      const result = await Project.find(idOrName);
      res.json(SuccessResponse(result));
    } catch (err) {
      console.error(err);
      res.json(FailedResponse());
    }
  }
);

router.post("/create", body("name").isString(), async (req, res) => {
  if (validationResult(req).array().length > 0) {
    return res.json(FailedResponse());
  }
  const { name } = matchedData(req);
  try {
    const result = await Project.create(name);
    res.json(SuccessResponse(result));
  } catch (err) {
    console.error(err);
    res.json(FailedResponse());
  }
});

router.post("/delete/:id", param("id").notEmpty(), async (req, res) => {
  if (validationResult(req).array().length > 0) {
    return res.json(FailedResponse());
  }
  const { id } = matchedData(req);
  if (!id) {
    res.json(FailedResponse());
    return;
  }
  try {
    await Project.delete(Number(id));
    res.json(SuccessResponse());
  } catch (err) {
    console.error(err);
    res.json(FailedResponse());
  }
});

router.post(
  "/update/:id",
  param("id").notEmpty(),
  body("name").isString(),
  async (req, res) => {
    if (validationResult(req).array().length > 0) {
      return res.json(FailedResponse());
    }
    const { id, name } = matchedData(req);
    try {
      await Project.update(Number(id), name);
      res.json(SuccessResponse());
    } catch (err) {
      console.error(err);
      res.json(FailedResponse());
    }
  }
);

export default router;
