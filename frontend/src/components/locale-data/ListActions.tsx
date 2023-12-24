import { FC } from "react";
import { ListButton, CreateButton, TopToolbar } from "react-admin";

const ListActions: FC = () => (
  <TopToolbar>
    <CreateButton resource="locale-data" label="Create Key" />
    <ListButton resource="locales" label="Return" />
  </TopToolbar>
);

export default ListActions;
