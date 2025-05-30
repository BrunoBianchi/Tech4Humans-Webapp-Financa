import { useState, useMemo } from "react";

type FilterFn<T> = (item: T, filterKey: string, extra?: any) => boolean;

export function useDynamicFilter<T>(
  list: T[],
  filters: Record<string, FilterFn<T>>,
  initialFilter = "all",
  sortAccessor: (item: T) => string | number = (item: any) => item.id ?? "",
) {
  const [activeFilter, setFilter] = useState(initialFilter);
  const [extra, setExtra] = useState<any>({});
  const [activeSort, setSort] = useState<"az" | "za" | null>(null);

  const data = useMemo(() => {
    let arr =
      activeFilter === "all" || !filters[activeFilter]
        ? list
        : list.filter((item) =>
            filters[activeFilter](item, activeFilter, extra),
          );

    if (activeSort) {
      const accessor = sortAccessor;
      if (activeSort === "az") {
        arr = [...arr].sort((a, b) =>
          String(accessor(a)).localeCompare(String(accessor(b))),
        );
      } else if (activeSort === "za") {
        arr = [...arr].sort((a, b) =>
          String(accessor(b)).localeCompare(String(accessor(a))),
        );
      }
    }
    return arr;
  }, [list, activeFilter, extra, activeSort, filters, sortAccessor]);

  return {
    data,
    setFilter,
    filter: activeFilter,
    setExtra,
    extra,
    setSort,
    sort: activeSort,
  };
}
