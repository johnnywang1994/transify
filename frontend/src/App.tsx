import { Admin, Resource } from "react-admin";
import { BrowserRouter } from "react-router-dom";

import dataProvider from "./dataProvider";
import DevLayout from "./layouts/DevLayout";

import ProjectList from "./components/project/List";
import ProjectCreate from "./components/project/Create";

import LocalesList from "./components/locales/List";
import LocalesCreate from "./components/locales/Create";

import LocaleDataEdit from "./components/locale-data/Edit";
import LocaleDataCreate from "./components/locale-data/Create";

import { PreviousRouteProvider } from "./hooks/usePreviousRoute";

// wrap BrowserRouter on top of Admin will change router history
// https://marmelab.com/react-admin/Upgrade.html#using-a-custom-history
function App() {
  return (
    <BrowserRouter>
      <PreviousRouteProvider>
        <Admin dataProvider={dataProvider} layout={DevLayout}>
          <Resource
            name="project"
            list={ProjectList}
            create={ProjectCreate}
            options={{ label: "Project List" }}
          />
          <Resource
            name="locales"
            list={LocalesList}
            create={LocalesCreate}
            options={{ label: "Translation List" }}
          />
          <Resource
            name="locale-data"
            edit={LocaleDataEdit}
            create={LocaleDataCreate}
          />
        </Admin>
      </PreviousRouteProvider>
    </BrowserRouter>
  );
}

export default App;
