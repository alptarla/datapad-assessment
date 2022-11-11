import Title from "@webclient/components/UI/Title/Title";
import Button from "@webclient/components/UI/Button/Button";
import { PlusIcon } from "@heroicons/react/outline";
import MetricChart from "@webclient/components/Dashboards/MetricChart";
import useDashboardFetch from "@core/hooks/data/use-dashboard-fetch";
import SideMenu from "@webclient/components/SideMenu/SideMenu";
import { useEffect, useState } from "react";

function DashboardInner(props) {
  const [kpiList, setKpiList] = useState([]);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const { workspaceid, dashboardid } = props;

  const { isError, error, isSuccess, status, data } = useDashboardFetch(
    workspaceid as string,
    dashboardid as string
  );

  useEffect(() => {
    if (data !== undefined) {
      setKpiList(data.metrics);
    }
  }, [data]);

  if (isError) {
    return <>error: {JSON.stringify(error)}</>;
  }

  if (!isSuccess || data === undefined) {
    return <>status: {status}...</>;
  }

  const handleSideBarShown = (isOpen: boolean) => {
    return () => setIsSideMenuOpen(isOpen);
  };

  const handleAddKpiToDashboard = (kpi: any) => {
    setKpiList((prevState) => [...prevState, kpi]);
    setIsSideMenuOpen(false);
  };

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
          className="text-purple-900 bg-white border rounded-md hover:shadow"
          onClick={handleSideBarShown(true)}
        />
      </div>

      <div className="grid grid-flow-row-dense grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {Object.entries(kpiList).map(([metricId, metric]) => {
          return <MetricChart key={metricId} metric={metric} />;
        })}
      </div>

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
