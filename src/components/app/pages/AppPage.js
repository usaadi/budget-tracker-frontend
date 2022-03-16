import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import AppToolbar from "../../shared/AppToolbar";

import { appSections } from "../../shared/defines/consts";

const sections = [
  { name: appSections.summary, component: <div>summary</div> },
  { name: appSections.expenses, component: <div>expenses</div> },
  { name: appSections.income, component: <div>income</div> },
];

const AppPage = () => {
  const [currentSection, setCurrentSection] = useState(appSections.summary);

  const { logout } = useAuth0();

  const hiddenClass = "tw-hidden";

  const onSectionChanged = (index) => {
    const sectionName = sections[index].name;
    setCurrentSection(sectionName);
  };

  const onLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <>
      <div>
        <AppToolbar onSectionChanged={onSectionChanged} onLogout={onLogout} />
      </div>

      {sections?.map((section, index) => {
        const hiddenClassName =
          section.name !== currentSection ? hiddenClass : "";
        return (
          <div className={`${hiddenClassName}`} key={index}>
            {section.component}
          </div>
        );
      })}
    </>
  );
};

export default AppPage;
