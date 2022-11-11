import { FC, useEffect } from "react";
import { XIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import useMetricsAllFetch from "@core/hooks/data/use-metrics-all-fetch";
import MetricChart from "@webclient/components/Dashboards/MetricChart";

type SideMenuProps = {
  isOpen?: boolean;
  onCloseSideMenu: VoidFunction;
  workspaceid: string;
  onKpiAdd: (kpi: any) => void;
};

const SideMenu: FC<SideMenuProps> = ({
  isOpen = false,
  onCloseSideMenu,
  workspaceid,
  onKpiAdd,
}) => {
  const { isError, error, data, isSuccess, doFetch } = useMetricsAllFetch(
    workspaceid,
    false
  );

  useEffect(() => {
    if (isOpen) {
      doFetch();
    }
  }, [isOpen]);

  // stop window scrolling when component mounted.
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.setProperty("overflow", "hidden");
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  if (isError) {
    return <>error: {JSON.stringify(error)}</>;
  }

  const handleAddKpi = (kpi: any) => {
    return () => {
      onKpiAdd(kpi);
    };
  };

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transform top-0 border right-0 max-w-md w-full bg-white shadow-xl absolute h-full overflow-auto ease-in-out transition-all duration-300 z-30`}
    >
      <div className="px-7 py-8">
        {/* header */}
        <div className="flex flex-row items-start justify-between">
          <div>
            <h1 className="text-[#29244A] mb-1">Add KPI to Dashboard</h1>
            <div className="text-[#797779] flex flex-row items-center gap-1">
              <ArrowLeftIcon className="w-4 h-4" />
              <small>Drag any item to your dashboard</small>
            </div>
          </div>
          <XIcon className="h-6 w-6 cursor-pointer" onClick={onCloseSideMenu} />
        </div>

        {/*  content */}
        <div className="mt-10 flex flex-col gap-10">
          {isSuccess &&
            Object.entries(data).map(([metricId, metric]) => {
              return (
                <div
                  role="button"
                  key={metricId}
                  onClick={handleAddKpi(data[metricId])}
                >
                  <MetricChart metric={metric} />
                </div>
              );
            })}
        </div>
      </div>
    </aside>
  );
};

export default SideMenu;
