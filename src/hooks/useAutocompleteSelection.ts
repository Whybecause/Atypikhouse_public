import { useEffect, useState } from "react";
import { useKeyPress } from "./useKeyPress";

const useAutocompleteSelection = (results) => {

  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");

  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  const [selectedResult, setSelectedResult] = useState(undefined);

  useEffect(() => {
    if (results.length && downPress) {
      setCursor(prevState =>
        prevState < results.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);

  useEffect(() => {
    if (results.length && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  useEffect(() => {
    if (results.length && enterPress) {
      setSelectedResult(results[cursor]);
    }
  }, [cursor, enterPress]);

  useEffect(() => {
    if (results.length && hovered) {
      setCursor(results.indexOf(hovered));
    }
  }, [hovered]);

  return { selectedResult, cursor, setSelectedResult, setHovered };

};

export default useAutocompleteSelection;
