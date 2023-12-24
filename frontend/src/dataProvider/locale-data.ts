import {
  DataProvider,
  GetOneResult,
  GetManyReferenceResult,
  UpdateResult,
  CreateResult,
  DeleteResult,
} from "react-admin";

import restClient from "../clients/rest";

const LocaleDataProvider: Partial<DataProvider> = {
  // trigger by <Edit />
  getOne: async (resource, { id }): Promise<GetOneResult<any>> => {
    const { json } = await restClient(`locales/item/${id}`);
    return {
      data: json.data ?? {},
    };
  },

  // trigger by ReferenceManyField
  getManyReference: async (
    resource,
    { id }
  ): Promise<GetManyReferenceResult<any>> => {
    const localeId = id;
    const { json } = await restClient(`locales/item/${localeId}`);
    const result = Object.entries(JSON.parse(json.data?.data ?? "{}")).map(
      ([key, value]) => {
        return {
          id: key, // use key as record id
          localeId, // pass localeId for update
          key,
          value,
        };
      }
    );
    // console.log(result);
    return {
      total: result.length,
      data: result,
    };
  },

  // trigger by useUpdate
  update: async (
    resource,
    { previousData, data }
  ): Promise<UpdateResult<any>> => {
    const { localeId, key, value } = data;
    const { key: prevKey } = previousData;

    const { json } = await restClient(`locales/update/${localeId}/data`, {
      method: "POST",
      body: JSON.stringify({ key, value, prevKey }),
    });

    if (!!json.error) {
      throw Error("Failed to update");
    }
    return {
      data: {
        // returned "id" will be used to update old record in react-admin
        ...data,
        key,
        value,
      },
    };
  },

  // trigger by useCreate
  create: async (resource, { data }): Promise<CreateResult> => {
    const { localeId, key, value } = data;
    const { json } = await restClient(`locales/update/${localeId}/data`, {
      method: "POST",
      body: JSON.stringify({
        key,
        value,
      }),
    });
    if (!!json.error) {
      throw Error("Failed to create");
    }
    return {
      data: {
        id: key,
        localeId,
        key,
        value,
      },
    };
  },

  // trigger by SimpleForm: DeleteButton
  delete: async (resource, { id, previousData }): Promise<DeleteResult> => {
    const key = id;
    const localeId = previousData?.localeId;
    const { json } = await restClient(`locales/update/${localeId}/data`, {
      method: "POST",
      body: JSON.stringify({ key }),
    });
    if (!!json.error) {
      throw Error("Failed to delete");
    }
    return {
      data: null,
    };
  },
};

export default LocaleDataProvider;
