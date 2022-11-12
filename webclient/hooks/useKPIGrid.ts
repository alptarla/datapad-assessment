const LAYOUT_STORAGE_KEY = "grid-layout";

function useKPIGrid(list = [], cols) {
  const getLayouts = () => {
    const savedLayouts = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (savedLayouts) return JSON.parse(savedLayouts);

    const layouts = {};

    Object.entries(cols).forEach(([field, value]) => {
      layouts[field] = list.map((item, index) => ({
        i: index.toString(),
        x: index % (value as number),
        y: 0,
        w: 1,
        h: 1,
      }));
    });

    return layouts;
  };

  const handleLayoutChange = (layout, layouts) => {
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layouts));
  };

  return {
    layouts: getLayouts(),
    onLayoutChange: handleLayoutChange,
  };
}

export default useKPIGrid;
