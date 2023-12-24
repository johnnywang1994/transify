import { FC } from "react";
import {
  TabbedShowLayout,
  Tab,
  ReferenceManyField,
  WrapperField,
  Datagrid,
  Pagination,
  DateField,
  TextField,
  EditButton,
} from "react-admin";

const ProjectShow: FC = () => {
  return (
    <div>
      <TabbedShowLayout>
        <Tab label="翻譯">
          <ReferenceManyField
            label=""
            reference="locales"
            target="id"
            source="name" // change the id reference to name field
            perPage={5}
            sort={{ field: "createdAt", order: "DESC" }}
            pagination={<Pagination />}
          >
            <Datagrid bulkActionButtons={false}>
              <TextField source="id" label="ID" />
              <WrapperField label="Lang / Namespace">
                <TextField source="lang" /> / <TextField source="namespace" />
              </WrapperField>
              <DateField source="updatedAt" label="Last Updated" showTime />
              <DateField source="createdAt" label="Created" showTime />
              <EditButton resource="locale-data" />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </div>
  );
};

export default ProjectShow;
