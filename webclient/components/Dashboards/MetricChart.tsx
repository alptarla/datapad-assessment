import { ArrowsExpandIcon, DotsHorizontalIcon } from "@heroicons/react/solid";
import { classNames } from "@core/react/class-names";
import { Conditional } from "@core/react/conditional";
import { dateFormatter } from "@core/standards/date-formatter";
import { MetricPieChart } from "./MetricPieChart";
import { MetricLineChart } from "./MetricLineChart";
import { MetricBarChart } from "./MetricBarChart";
import { MetricTableChart } from "./MetricTableChart";
import { MetricSingleValueChart } from "./MetricSingleValueChart";
import { useState } from "react";
import { XIcon } from "@heroicons/react/outline";

function GetParametersByChartType(chartType) {
  if (chartType === "BAR_CHART") {
    return {
      component: MetricBarChart,
      showGoal: true,
      showDate: false,
    };
  }

  if (chartType === "PIE_CHART") {
    return {
      component: MetricPieChart,
      showGoal: true,
      showDate: false,
    };
  }

  if (chartType === "LINE_CHART") {
    return {
      component: MetricLineChart,
      showGoal: true,
      showDate: false,
    };
  }

  if (chartType === "TABLE_CHART") {
    return {
      component: MetricTableChart,
      showGoal: false,
      showDate: false,
    };
  }

  if (chartType === undefined) {
    return {
      component: MetricSingleValueChart,
      showGoal: true,
      showDate: true,
    };
  }

  throw new Error(`invalid chart type: {chartType}`);
}

function MetricChart(props) {
  const [isShowRemoveButton, setIsShowRemoveButton] = useState(false);

  const { metric, onRemove, metricId, isShownIcons = true } = props;
  const params = GetParametersByChartType(metric.chart_type);

  const toggleRemoveButtonVisibility = () => {
    setIsShowRemoveButton((prevState) => !prevState);
  };

  const handleRemove = () => {
    onRemove(metricId);
    setIsShowRemoveButton(false);
  };

  return (
    <div
      className={
        "flex flex-col h-full shadow-sm dark:bg-slate-800 bg-white rounded-lg px-4 py-7 group relative"
      }
    >
      {isShownIcons && (
        <div
          role="button"
          onClick={toggleRemoveButtonVisibility}
          className={
            "absolute top-0 right-0 h-4 w-4 text-slate-400 hidden group-hover:block m-3"
          }
        >
          <DotsHorizontalIcon />
        </div>
      )}

      {isShowRemoveButton && (
        <div
          role="button"
          onClick={handleRemove}
          className="absolute top-0 right-0 -mr-10 mt-10 bg-white shadow-md rounded-md p-3 flex items-center justify-center gap-2"
        >
          <XIcon className="h-4 w-4 text-red-600" />
          <span>Remove</span>
        </div>
      )}

      {isShownIcons && (
        <div
          role="button"
          id="grab-icon"
          className={`${props.draggableClassName} cursor-grab absolute top-0 left-0 h-4 w-4 text-slate-400 hidden group-hover:block m-3`}
        >
          <ArrowsExpandIcon />
        </div>
      )}

      <div>
        <Conditional if={params.showGoal}>
          <h3 className="text-lg">{props.metric.goal}</h3>
        </Conditional>
        <h3
          className={classNames([
            "mt-2 grow-0 text-base",
            `text-{color.hardClass}`,
          ])}
        >
          {props.metric.icon} {props.metric.title}
        </h3>
        <Conditional if={params.showDate}>
          <h3 className="mt-2 text-base text-gray-400">
            {dateFormatter(
              props.metric.sys.updated_at ?? props.metric.sys.created_at
            )}
          </h3>
        </Conditional>
      </div>

      <div className="grow flex flex-col justify-center">
        <div>
          <params.component metric={props.metric} />
        </div>
      </div>
    </div>
  );
}

export { MetricChart, MetricChart as default };
