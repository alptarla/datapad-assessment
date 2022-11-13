import { useEffect, useState } from "react";

function useKPIGrid(list = [], cols) {
  const [currentBreakpoint, setCurrentBreakPoint] = useState("lg");
  const [layouts, setLayouts] = useState({});

  useEffect(() => {
    if (Object.keys(layouts).length > 0) return;

    setLayouts((prevState) => {
      if (list.length <= 0) return prevState;
      Object.entries(cols).forEach(([key, value]) => {
        prevState[key] = list.map((item, index) => ({
          i: index.toString(),
          x: index % (value as number),
          y: 0,
          w: 1,
          h: 1,
        }));
      });

      return { ...prevState };
    });
  }, [list, cols]);

  const handleDrop = (newLayouts) => {
    setLayouts((prevState) => {
      return { ...prevState, ...{ [currentBreakpoint]: newLayouts } };
    });
  };

  const handleBreakpointChange = (breakpoint) => {
    setCurrentBreakPoint(breakpoint);
  };

  return {
    layouts,
    onDrop: handleDrop,
    onBreakpointChange: handleBreakpointChange,
  };
}

export default useKPIGrid;
