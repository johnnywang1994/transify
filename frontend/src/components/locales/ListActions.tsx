import { FC } from "react";
import { FilterButton, CreateButton, TopToolbar } from "react-admin";

const ListActions: FC = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

export default ListActions;
