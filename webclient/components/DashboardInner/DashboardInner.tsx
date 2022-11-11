import Title from "@webclient/components/UI/Title/Title";
import Button from "@webclient/components/UI/Button/Button";
import { PlusIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";
import MetricChart from "@webclient/components/Dashboards/MetricChart";
import useDashboardFetch from "@core/hooks/data/use-dashboard-fetch";
import SideMenu from "@webclient/components/SideMenu/SideMenu";
import { useEffect, useMemo, useState } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const COLS = { lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 };

function DashboardInner(props) {
  const [kpiList, setKpiList] = useState([]);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const { workspaceid, dashboardid } = props;

  const { isError, error, isSuccess, status, data } = useDashboardFetch(
    workspaceid as string,
    dashboardid as string
  );

  useEffect(() => {
    if (data !== undefined) {
      setKpiList([...data.metrics, ...data.metrics]);
    }
  }, [data]);

  const layouts = useMemo(() => {
    return {
      lg: kpiList.map((_, index) => ({
        x: index % COLS[currentBreakpoint],
        i: index.toString(),
        y: 0,
        w: 1,
        h: 1,
      })),
    };
  }, [kpiList, currentBreakpoint]);

  const handleBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint);
  };

  const handleSideBarShown = (isOpen: boolean) => {
    return () => setIsSideMenuOpen(isOpen);
  };

  const handleAddKpiToDashboard = (kpi: any) => {
    setKpiList((prevState) => [...prevState, kpi]);
    setIsSideMenuOpen(false);
  };

  if (isError) {
    return <>error: {JSON.stringify(error)}</>;
  }

  if (!isSuccess || data === undefined) {
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
          className="text-purple-900 bg-white border rounded-md hover:shadow"
          onClick={handleSideBarShown(true)}
        />
      </div>

      <ResponsiveGridLayout
        layouts={layouts}
        breakpoints={BREAKPOINTS}
        cols={COLS}
        rowHeight={400}
        onBreakpointChange={handleBreakpointChange}
        draggableHandle=".drag-handle"
        resizeHandle={
          <div className="react-resizable-handle-icon">
            <ChevronDoubleRightIcon />
          </div>
        }
      >
        {Object.entries(kpiList).map(([metricId, metric], index) => {
          return (
            <div key={index} className="overflow-hidden">
              <MetricChart draggableClassName="drag-handle" metric={metric} />
            </div>
          );
        })}
      </ResponsiveGridLayout>

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
