import { FC } from "react";
import {
  List,
  Datagrid,
  SearchInput,
  ListProps,
  ReferenceField,
  DateField,
  TextField,
  EditButton,
  WrapperField,
} from "react-admin";

import ListActions from "./ListActions";

const postFilters = [
  <SearchInput
    key="projectName"
    source="projectName"
    alwaysOn
    placeholder="搜尋專案名稱"
  />,
];

const LocalesList: FC<ListProps> = (props) => (
  <List
    {...props}
    filters={postFilters}
    actions={<ListActions />}
    // sort={{ field: "invoiceDate", order: "DESC" }}
    empty={false}
  >
    <Datagrid bulkActionButtons={false}>
      <ReferenceField
        reference="project"
        source="projectId"
        link={false}
        label="Project Name"
      >
        <WrapperField>
          <TextField source="name" />
          (ID: <TextField source="id" />)
        </WrapperField>
      </ReferenceField>
      <WrapperField label="Lang / Namespace">
        <TextField source="lang" /> / <TextField source="namespace" />
      </WrapperField>
      <DateField source="updatedAt" label="Last Updated" showTime />
      <DateField source="createdAt" label="Created" showTime />
      <WrapperField>
        <EditButton resource="locale-data" />
      </WrapperField>
    </Datagrid>
  </List>
);

export default LocalesList;
