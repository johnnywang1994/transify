import { FC } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  TopToolbar,
  Toolbar,
  ListButton,
  SaveButton,
  required,
} from "react-admin";

const PostCreateActions = () => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

const PostCreateToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const ProjectCreate: FC = () => {
  return (
    <Create
      resource="project"
      title="New Project"
      actions={<PostCreateActions />}
    >
      <SimpleForm toolbar={<PostCreateToolbar />}>
        <TextInput source="name" validate={[required()]} fullWidth />
      </SimpleForm>
    </Create>
  );
};

export default ProjectCreate;
