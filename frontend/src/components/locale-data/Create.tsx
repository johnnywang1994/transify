import { FC } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  TopToolbar,
  Toolbar,
  Button,
  SaveButton,
  required,
  useNotify,
  useCreate,
  useCreatePath,
  FormOwnProps,
} from "react-admin";
import ListIcon from "@mui/icons-material/List";
import { useNavigate } from "react-router-dom";
import usePreviousRoute from "../../hooks/usePreviousRoute";

const LocalesCreateActions = ({ onReturn }: { onReturn: () => void }) => {
  return (
    <TopToolbar>
      <Button label="Return" onClick={onReturn}>
        <ListIcon />
      </Button>
    </TopToolbar>
  );
};

const LocaleDataCreateToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const LocaleDataCreate: FC = () => {
  const navigate = useNavigate();
  const createPath = useCreatePath();
  const { to, from } = usePreviousRoute();

  const notify = useNotify();
  const [create] = useCreate(undefined, undefined, {
    onError: () => notify("Failed to create", { type: "error" }),
    onSuccess: () => {
      notify("Create successfully", { type: "success" });
      navigate(from.pathname);
    },
  });

  const localeId = from.pathname.split("/").pop();

  const handleSubmit: FormOwnProps["onSubmit"] = (data) => {
    create("locale-data", {
      data: {
        ...data,
        localeId, // inject localeId here, this is why we use "useCreate" here
      },
    });
  };

  if (to.pathname === from.pathname) {
    window.location.href = createPath({ resource: "locales", type: "list" });
    return <></>;
  }
  return (
    <Create
      resource="locale-data"
      title="New Translation Key"
      actions={
        <LocalesCreateActions onReturn={() => navigate(from.pathname)} />
      }
    >
      <SimpleForm toolbar={<LocaleDataCreateToolbar />} onSubmit={handleSubmit}>
        <TextInput source="key" validate={[required()]} fullWidth />
        <TextInput source="value" validate={[required()]} fullWidth />
      </SimpleForm>
    </Create>
  );
};

export default LocaleDataCreate;
