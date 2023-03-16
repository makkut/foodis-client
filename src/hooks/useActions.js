import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { cartSlice } from "@/state/statsCart";
import { menuSlice } from "@/state/statsMenu";
import { useMemo } from "react";

const rootAction = {
  ...cartSlice.actions,
  ...menuSlice.actions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
