import Title from "@webclient/components/UI/Title/Title";
import Button from "@webclient/components/UI/Button/Button";
import { PlusIcon } from "@heroicons/react/outline";
import SideMenu from "@webclient/components/SideMenu/SideMenu";
import { useState } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import useKPI from "@webclient/hooks/useKPI";
import KpiGridLayout from "@webclient/components/KPIGridLayout/KPIGridLayout";

function DashboardInner({ workspaceid, dashboardid }) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const { data, setData, isError, isSuccess, status, error } = useKPI(
    workspaceid,
    dashboardid
  );

  const handleSideBarShown = (isOpen: boolean) => {
    return () => setIsSideMenuOpen(isOpen);
  };

  const handleAddKpiToDashboard = (kpi: any) => {
    setData((prevState) => [...prevState, kpi]);
    setIsSideMenuOpen(false);
  };

  if (isError) {
    return <>error: {JSON.stringify(error)}</>;
  }

  if (!isSuccess) {
    return <>status: {status}...</>;
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Title
          icon={data.icon}
          title={data.title}
          subtitle={data.description}
        />
        <Button
          title="Add New KPI"
          icon={<PlusIcon className="mr-1 h-4 w-4" />}
          className="text-[#5B4CCC] bg-white border rounded-md hover:shadow"
          onClick={handleSideBarShown(true)}
        />
      </div>

      <KpiGridLayout list={data} onItemAdd={handleAddKpiToDashboard} />

      <SideMenu
        isOpen={isSideMenuOpen}
        onCloseSideMenu={handleSideBarShown(false)}
        workspaceid={workspaceid}
        onKpiAdd={handleAddKpiToDashboard}
      />
    </>
  );
}

export default DashboardInner;
