import { Router } from "express";
import { param, body, matchedData } from "express-validator";

import Project from "../models/project";
import Translation from "../models/translation";
import {
  SuccessResponse,
  FailedResponse,
  breakArrayIfOne,
} from "../utils/response";
import { validateResult } from "../utils/express-validator";

export const prefix = "/api/locales";

const router = Router();

router.get("/item/:id", param("id").isString(), async (req, res) => {
  if (validateResult(req).length > 0) return res.json(FailedResponse());
  const { id } = matchedData(req);

  try {
    const result = await Translation.findById(Number(id));
    res.json(SuccessResponse(result));
  } catch (err) {
    console.error(err);
    res.json(FailedResponse());
  }
});

router.get(
  "/:project/:lang?/:ns?",
  param("project").isString(),
  param(["lang", "ns"]).isString().optional(),
  async (req, res) => {
    if (validateResult(req).length > 0) return res.json(FailedResponse());
    const { project, lang = "all", ns = "all" } = matchedData(req);

    try {
      const result = await Translation.find(project, lang, ns);
      res.json(SuccessResponse(breakArrayIfOne(result)));
    } catch (err) {
      console.error(err);
      res.json(FailedResponse());
    }
  }
);

router.post(
  "/add/:project/:lang/:ns",
  param(["project", "lang", "ns"]).isString(),
  body("data").isObject(),
  async (req, res) => {
    console.log(req.body);
    if (validateResult(req).length > 0) return res.json(FailedResponse());
    const { project: projectName, lang, ns, data } = matchedData(req);

    try {
      const project = await Project.find(projectName);
      if (project) {
        const result = await Translation.create(project.id, lang, ns, data);
        res.json(SuccessResponse(result));
      } else {
        res.json(FailedResponse());
      }
    } catch (err) {
      console.error(err);
      res.json(FailedResponse());
    }
  }
);

router.post(
  "/update/:id/data",
  param("id").isString(),
  body("key").isString(),
  body(["value", "prevKey"]).isString().optional(),
  async (req, res) => {
    if (validateResult(req).length > 0) return res.json(FailedResponse());
    const { id, key, value, prevKey } = matchedData(req);
    try {
      await Translation.updateKey(Number(id), key, value, prevKey);
      res.json(SuccessResponse());
    } catch (err) {
      console.error(err);
      res.json(FailedResponse());
    }
  }
);

router.post("/delete/:id", param("id").isString(), async (req, res) => {
  if (validateResult(req).length > 0) return res.json(FailedResponse());
  const { id } = matchedData(req);
  try {
    await Translation.delete(Number(id));
    res.json(SuccessResponse());
  } catch (err) {
    console.error(err);
    res.json(FailedResponse());
  }
});

export default router;
