import {
  CreateParams,
  DataProvider,
  DeleteManyParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  UpdateManyParams,
  UpdateParams,
} from "react-admin";
import ProjectProvider from "./project";
import LocalesProvider from "./locales";
import LocaleDataProvider from "./locale-data";

type ReactAdminParams =
  | GetListParams
  | GetOneParams
  | GetManyParams
  | GetManyReferenceParams
  | UpdateParams
  | UpdateManyParams
  | CreateParams
  | DeleteParams
  | DeleteManyParams;

interface DataProvidersMap {
  resource: string;
  dataProvider: Partial<DataProvider>;
}

const dataProvidersMap: DataProvidersMap[] = [
  { resource: "project", dataProvider: ProjectProvider },
  { resource: "locales", dataProvider: LocalesProvider },
  { resource: "locale-data", dataProvider: LocaleDataProvider },
];

function mappingDataProvider(
  resource: string,
  method: keyof DataProvider,
  params: ReactAdminParams
) {
  const dataProvider = dataProvidersMap.find(
    (provider) => provider.resource === resource
  )?.dataProvider;

  return dataProvider && dataProvider[method]
    ? dataProvider[method](resource, params)
    : Promise.reject(
        new Error(`Method not implemented: ${resource}-${method}`)
      );
}

const appDataProvider: DataProvider = {
  getList: (resource: string, params: GetListParams) => {
    return mappingDataProvider(resource, "getList", params);
  },
  getOne: (resource: string, params: GetOneParams) => {
    return mappingDataProvider(resource, "getOne", params);
  },
  create: (resource: string, params: CreateParams) => {
    return mappingDataProvider(resource, "create", params);
  },
  update: (resource: string, params: UpdateParams) => {
    return mappingDataProvider(resource, "update", params);
  },
  delete: (resource: string, params: DeleteParams) => {
    return mappingDataProvider(resource, "delete", params);
  },
  getMany: (resource: string, params: GetManyParams) => {
    return mappingDataProvider(resource, "getMany", params);
  },
  getManyReference: (resource: string, params: GetManyReferenceParams) => {
    return mappingDataProvider(resource, "getManyReference", params);
  },
  updateMany: (resource: string, params: UpdateManyParams) => {
    return mappingDataProvider(resource, "updateMany", params);
  },
  deleteMany: (resource: string, params: DeleteManyParams) => {
    return mappingDataProvider(resource, "deleteMany", params);
  },
};

export default appDataProvider;
