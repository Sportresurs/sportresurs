import { useCallback, useMemo } from "react";
import { SequentialRoundRobin } from "round-robin-js";
import {
  colorAccentPurple,
  colorAccentBlue,
  colorAccentGreen,
  colorAccentOrange,
  colorAccentYellow,
  colorAccentRed,
} from "../../styles/exportColorVars.module.scss";

export default function useColorLoop() {
  const colors = useMemo(
    () =>
      new SequentialRoundRobin([
        colorAccentPurple,
        colorAccentBlue,
        colorAccentGreen,
        colorAccentOrange,
        colorAccentYellow,
        colorAccentRed,
      ]),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(() => colors.next().value, []);
}
