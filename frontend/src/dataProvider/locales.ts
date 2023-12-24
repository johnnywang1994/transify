import {
  DataProvider,
  GetListResult,
  GetManyReferenceResult,
  CreateResult,
} from "react-admin";

import restClient from "../clients/rest";
import { cleanUpFilter, isEmptyFilter } from "../utils/filter";

const emptyListResult = { data: [], total: 0 };

const LocalesProvider: Partial<DataProvider> = {
  // trigger by <List />(filter from: <SearchInput />)
  getList: async (resource, { filter }): Promise<GetListResult<any>> => {
    const cleanFilter = cleanUpFilter(filter);
    if (isEmptyFilter(cleanFilter)) return emptyListResult;

    const { projectName } = cleanFilter;
    const { json } = await restClient(
      `locales/${encodeURIComponent(projectName)}`
    );
    if (!json.data) return emptyListResult;

    const result = Array.isArray(json.data) ? json.data : [json.data];
    return {
      total: result.length,
      data: result,
    };
  },

  // trigger by ReferenceManyField
  getManyReference: async (
    resource,
    { id }
  ): Promise<GetManyReferenceResult<any>> => {
    const projectName = id;
    const { json } = await restClient(`locales/${projectName}`);
    if (!json.data) return emptyListResult;

    const result = Array.isArray(json.data) ? json.data : [json.data];
    return {
      total: result.length,
      data: result,
    };
  },

  // trigger by SaveButton
  create: async (resource, { data }): Promise<CreateResult> => {
    const { projectName, lang, namespace } = data;
    const { json } = await restClient(
      `locales/add/${encodeURIComponent(projectName)}/${encodeURIComponent(
        lang
      )}/${encodeURIComponent(namespace)}`,
      {
        method: "POST",
        body: JSON.stringify({ data: {} }),
      }
    );
    if (!!json.error) {
      throw Error("Failed to create");
    }
    // console.log(json);
    return {
      data: json.data,
    };
  },
};

export default LocalesProvider;
