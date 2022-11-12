import useDashboardFetch from "@core/hooks/data/use-dashboard-fetch";
import { useEffect, useState } from "react";

function useKPI(workspaceid: string, dashboardid: string) {
  const [kpiList, setKpiList] = useState([]);

  const { data, ...res } = useDashboardFetch(
    workspaceid as string,
    dashboardid as string
  );

  useEffect(() => {
    if (data !== undefined) {
      setKpiList(data.metrics);
    }
  }, [data]);

  return {
    ...res,
    data: kpiList,
    setData: setKpiList,
  };
}

export default useKPI;
