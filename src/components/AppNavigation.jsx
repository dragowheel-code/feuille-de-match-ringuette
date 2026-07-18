import Header from "./Header";
import Tabs from "./Tabs";
import { APP_INFO } from "../constants/version";

function AppNavigation({
  matchInfo,
  pageActive,
  setPageActive,
  ouvrirParametres,
}) {
  return (
    <>
      <Header
        appInfo={APP_INFO}
        matchInfo={matchInfo}
        ouvrirParametres={ouvrirParametres}
      />

      <Tabs
        pageActive={pageActive}
        setPageActive={setPageActive}
      />
    </>
  );
}

export default AppNavigation;