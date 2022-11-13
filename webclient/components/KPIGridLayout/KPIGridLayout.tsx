import React from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
import MetricChart from "@webclient/components/Dashboards/MetricChart";
import { Responsive, WidthProvider } from "react-grid-layout";
import useKPIGrid from "@webclient/hooks/useKPIGrid";

const ResponsiveGridLayout = WidthProvider(Responsive);

const BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const COLS = { lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 };

const KpiGridLayout = ({ list, onItemAdd, onItemRemove }) => {
  const { layouts, onBreakpointChange, onDrop } = useKPIGrid(list, COLS);

  const handleDrop = (layouts, layout, event) => {
    const data = event.dataTransfer.getData("text");
    if (!data) return;
    onItemAdd(JSON.parse(data));

    onDrop(layouts);
  };

  if (list.length <= 0 || Object.keys(layouts).length <= 0) {
    return null;
  }

  return (
    <ResponsiveGridLayout
      layouts={layouts}
      breakpoints={BREAKPOINTS}
      onBreakpointChange={onBreakpointChange}
      onDrop={handleDrop}
      isDroppable
      droppingItem={{ i: list.length.toString(), w: 1, h: 1 }}
      cols={COLS}
      rowHeight={300}
      margin={[50, 50]}
      draggableHandle=".drag-handle"
      resizeHandle={
        <div className="react-resizable-handle-icon">
          <ChevronDoubleRightIcon />
        </div>
      }
    >
      {Object.entries(list).map(([metricId, metric], index) => {
        return (
          <div key={index}>
            <MetricChart
              draggableClassName="drag-handle"
              metric={metric}
              metricId={metricId}
              onRemove={onItemRemove}
            />
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};

export default KpiGridLayout;
