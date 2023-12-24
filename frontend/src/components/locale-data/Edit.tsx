import { FC } from "react";
import {
  Datagrid,
  Edit,
  ReferenceManyField,
  RaRecord,
  useNotify,
  useUpdate,
  Toolbar,
  SaveButton,
  DeleteButton,
} from "react-admin";
import { useParams } from "react-router-dom";

import ListActions from "./ListActions";
import EditableTextField from "../EditableTextField";

const LocaleDataToolbar = ({ noDelete }: { noDelete?: boolean }) => (
  <Toolbar className="flex justify-between">
    <SaveButton />
    {!noDelete && <DeleteButton redirect={false} />}
  </Toolbar>
);

const LocaleDataEdit: FC = () => {
  const { id: localeId } = useParams();

  const notify = useNotify();
  const [update] = useUpdate(undefined, undefined, {
    onError: () => notify("Failed to update", { type: "error" }),
    onSuccess: () => notify("Update successfully", { type: "success" }),
  });

  const handlePostSave = (record: RaRecord, data: any) => {
    update("locale-data", {
      id: record.id,
      previousData: record,
      data: data,
    });
  };

  return (
    <Edit
      resource="locale-data"
      id={localeId}
      title="Edit Translation"
      actions={<ListActions />}
    >
      {/* current resource: locales */}
      {/* target: the foreign key which used to search in reference resource */}
      <ReferenceManyField
        label="Translations"
        reference="locale-data"
        target="id"
      >
        <Datagrid bulkActionButtons={false}>
          <EditableTextField
            source="key"
            label="Key"
            toolbar={<LocaleDataToolbar />}
            onSave={handlePostSave}
          />
          <EditableTextField
            source="value"
            label="Translation"
            toolbar={<LocaleDataToolbar noDelete />}
            onSave={handlePostSave}
          />
        </Datagrid>
      </ReferenceManyField>
    </Edit>
  );
};

export default LocaleDataEdit;
