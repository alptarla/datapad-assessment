import { useEffect, useState } from "react";

const LAYOUT_STORAGE_KEY = "grid-layout";

function useKPIGrid(list = [], cols) {
  const [layouts, setLayouts] = useState({});

  useEffect(() => {
    if (list.length <= 0) return;

    const savedLayouts = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (savedLayouts) {
      setLayouts(JSON.parse(savedLayouts));
      return;
    }

    setLayouts((prevState) => {
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

  const handleLayoutChange = (_, layouts) => {
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layouts));
  };

  return {
    layouts,
    onLayoutChange: handleLayoutChange,
  };
}

export default useKPIGrid;
