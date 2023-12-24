import {
  DataProvider,
  GetListResult,
  GetManyResult,
  UpdateResult,
  CreateResult,
  DeleteResult,
} from "react-admin";

import restClient from "../clients/rest";
import { cleanUpFilter, isEmptyFilter } from "../utils/filter";

const ProjectProvider: Partial<DataProvider> = {
  // trigger by <List />(filter from: <SearchInput />)
  getList: async (resource, { filter }): Promise<GetListResult<any>> => {
    const cleanFilter = cleanUpFilter(filter);
    if (!!cleanFilter.projectName) {
      const { json } = await restClient(
        `project/item/${encodeURIComponent(cleanFilter.projectName)}`
      );
      const data = [json.data];
      return { data, total: data.length };
    }
    const { json } = await restClient("project/list");
    return {
      total: json.data?.length ?? 0,
      data: json.data ?? [],
    };
  },

  // trigger from ReferenceField
  getMany: async (resource, { ids }): Promise<GetManyResult<any>> => {
    const results = ids.map((id) => restClient(`project/item/${id}`));
    const data = await Promise.all(results);
    return {
      data: data.map(({ json }) => json.data),
    };
  },

  // trigger from useUpdate
  update: async (resource, { id, data }): Promise<UpdateResult<any>> => {
    const { name } = data;

    const { json } = await restClient(`project/update/${id}`, {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    if (!!json.error) {
      throw Error("Failed to update");
    }
    return {
      data: { id, name },
    };
  },

  // trigger by Create
  create: async (resource, { data }): Promise<CreateResult> => {
    const { json } = await restClient("project/create", {
      method: "POST",
      body: JSON.stringify({ name: data.name }),
    });
    if (!!json.error) {
      throw Error("Failed to create");
    }
    return {
      data: json.data,
    };
  },

  // trigger by SimpleForm: DeleteButton
  delete: async (resource, { id }): Promise<DeleteResult> => {
    const { json } = await restClient(`project/delete/${id}`, {
      method: "POST",
    });
    if (!!json.error) {
      throw Error("Failed to delete");
    }
    return {
      data: null,
    };
  },
};

export default ProjectProvider;
