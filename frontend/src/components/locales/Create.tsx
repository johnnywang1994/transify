import { FC } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  TopToolbar,
  Toolbar,
  ListButton,
  SaveButton,
  required,
  useGetList,
} from "react-admin";

const LocalesCreateActions = () => (
  <TopToolbar>
    <ListButton label="Return" />
  </TopToolbar>
);

const LocalesCreateToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const LocalesCreate: FC = () => {
  const { data } = useGetList("project");
  return (
    <Create
      resource="locales"
      title="New Translation"
      actions={<LocalesCreateActions />}
    >
      <SimpleForm toolbar={<LocalesCreateToolbar />}>
        <SelectInput
          source="projectName"
          optionValue="name"
          choices={data ?? []}
        />
        <TextInput source="lang" validate={[required()]} fullWidth />
        <TextInput source="namespace" validate={[required()]} fullWidth />
      </SimpleForm>
    </Create>
  );
};

export default LocalesCreate;
