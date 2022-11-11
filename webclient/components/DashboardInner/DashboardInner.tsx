import Title from "@webclient/components/UI/Title/Title";
import Button from "@webclient/components/UI/Button/Button";
import { PlusIcon } from "@heroicons/react/outline";
import MetricChart from "@webclient/components/Dashboards/MetricChart";
import useDashboardFetch from "@core/hooks/data/use-dashboard-fetch";

function DashboardInner(props) {
  const { workspaceid, dashboardid } = props;

  const { isError, error, isSuccess, status, data } = useDashboardFetch(
    workspaceid as string,
    dashboardid as string
  );

  if (isError) {
    return <>error: {JSON.stringify(error)}</>;
  }

  if (!isSuccess || data === undefined) {
    return <>status: {status}...</>;
  }

  const handleAddNewKPIClick = () => {};

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
          onClick={handleAddNewKPIClick}
        />
      </div>

      <div className="grid grid-flow-row-dense grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {Object.entries(data.metrics).map(([metricId, metric]) => {
          return <MetricChart key={metricId} metric={metric} />;
        })}
      </div>
    </>
  );
}

export default DashboardInner;
