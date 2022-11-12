import React from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
import MetricChart from "@webclient/components/Dashboards/MetricChart";
import { Responsive, WidthProvider } from "react-grid-layout";
import useKPIGrid from "@webclient/hooks/useKPIGrid";

const ResponsiveGridLayout = WidthProvider(Responsive);

const BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const COLS = { lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 };

const KpiGridLayout = ({ list }) => {
  const { layouts, onLayoutChange } = useKPIGrid(list, COLS);

  if (list.length <= 0 || layouts.length <= 0) {
    return null;
  }

  return (
    <ResponsiveGridLayout
      layouts={layouts}
      breakpoints={BREAKPOINTS}
      onLayoutChange={onLayoutChange}
      cols={COLS}
      rowHeight={300}
      draggableHandle=".drag-handle"
      resizeHandle={
        <div className="react-resizable-handle-icon">
          <ChevronDoubleRightIcon />
        </div>
      }
    >
      {Object.entries(list).map(([metricId, metric], index) => {
        return (
          <div key={index} className="overflow-hidden">
            <MetricChart draggableClassName="drag-handle" metric={metric} />
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};

export default KpiGridLayout;
