import { useState, useCallback, useMemo } from "react";

export const useUserInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = useCallback((e) => setValue(e.target.value), []);
  const onClick = (e) => setValue(e);
  return { value, onChange, onClick };
};

export const useSearchable = (value, input, searchProps) => {
  return useMemo(() => {
    const regex = new RegExp(input, "i");
    if (value === null || value === undefined) {
      return null;
    }

    return value.filter((item) =>
      searchProps(item).some((sp) => regex.test(sp))
    );

  }, [value, input, searchProps]);
};
