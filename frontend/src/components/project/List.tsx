import { FC } from "react";
import {
  List,
  TextField,
  DateField,
  SearchInput,
  ListProps,
  Datagrid,
  useUpdate,
  useNotify,
  RaRecord,
} from "react-admin";

import EditableTextField from "../EditableTextField";
import ListActions from "./ListActions";
import ProjectShow from "./Show";

const postFilters = [
  <SearchInput
    key="projectName"
    source="projectName"
    alwaysOn
    placeholder="搜尋專案名稱"
  />,
];

const ProjectList: FC<ListProps> = (props) => {
  const notify = useNotify();
  const [update] = useUpdate(undefined, undefined, {
    onError: () => notify("Failed to update project", { type: "error" }),
    onSuccess: () => notify("Update successfully", { type: "success" }),
  });

  const handlePostSave = (record: RaRecord, data: any) => {
    update("project", {
      id: record.id,
      previousData: record,
      data: data,
    });
  };

  return (
    <List
      {...props}
      filters={postFilters}
      actions={<ListActions />}
      empty={false}
    >
      <Datagrid expand={<ProjectShow />} bulkActionButtons={false}>
        <TextField source="id" label="ID" />
        <EditableTextField source="name" label="Name" onSave={handlePostSave} />
        <DateField source="updatedAt" label="Last Updated" showTime />
        <DateField source="createdAt" label="Created" showTime />
      </Datagrid>
    </List>
  );
};

export default ProjectList;
