import useClickAway from "@/hooks/useClickAway";
import { FC, useState, useRef, ReactElement } from "react";
import {
  TextInput,
  SimpleForm,
  FieldProps,
  useRecordContext,
  required,
  RaRecord,
  FormOwnProps,
} from "react-admin";

type Props = FieldProps & {
  toolbar?: ReactElement | false;
  onSave?: (record: RaRecord, data: any) => Promise<void> | void;
};

const EditableTextField: FC<Props> = ({ label, source, toolbar, onSave }) => {
  const record = useRecordContext();
  const ref = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const text = source ? record[source] : record.id;

  const handleSave: FormOwnProps["onSubmit"] = (data) => {
    if (onSave) onSave(record, data);
    setIsEditing(false);
  };

  useClickAway(ref, () => setIsEditing(false));

  return (
    <div
      ref={ref}
      className="w-full cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <SimpleForm toolbar={toolbar} onSubmit={handleSave}>
          <TextInput
            source={source as string}
            label={label as string}
            validate={[required()]}
            fullWidth
          />
        </SimpleForm>
      ) : (
        text
      )}
    </div>
  );
};

export default EditableTextField;
