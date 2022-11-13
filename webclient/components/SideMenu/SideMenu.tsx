import { FC, useEffect, useState } from "react";
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
  const [isOverlayShown, setIsOverlayShown] = useState(isOpen);

  const { isError, error, data, isSuccess, doFetch } = useMetricsAllFetch(
    workspaceid,
    false
  );

  useEffect(() => {
    setIsOverlayShown(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      doFetch();
    }
  }, [isOpen]);

  // stop window scrolling when component mounted.
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.setProperty("overflow", "hidden");
    document.body.style.top = `-${window.scrollY}px`;
    return () => {
      document.body.style.removeProperty("overflow");
      document.body.style.top = "";
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
    <>
      {isOverlayShown && (
        <div className="absolute top-0 left-0 z-20 w-screen h-screen bg-gray-500 bg-opacity-75 transition-opacity"></div>
      )}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transform absolute top-0 right-0 border max-w-md w-full h-screen bg-white shadow-xl overflow-auto ease-in-out transition-all duration-300 z-30`}
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
            <XIcon
              className="h-6 w-6 cursor-pointer"
              onClick={onCloseSideMenu}
            />
          </div>

          {/*  content */}
          <div className="my-10 flex flex-col gap-10">
            {isSuccess &&
              Object.entries(data).map(([metricId, metric]) => {
                return (
                  <div
                    role="button"
                    key={metricId}
                    onClick={handleAddKpi(data[metricId])}
                    className="droppable-element"
                    draggable={true}
                    unselectable="on"
                    // this is a hack for firefox
                    // Firefox requires some kind of initialization
                    // which we can do by adding this attribute
                    // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                    onDragStart={(e) => {
                      setIsOverlayShown(false);
                      return e.dataTransfer.setData(
                        "text/plain",
                        JSON.stringify(data[metricId])
                      );
                    }}
                  >
                    <MetricChart metric={metric} />
                  </div>
                );
              })}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideMenu;
