import { useSort } from "@/state/zustand";
import { MenuItem, Select } from "@mui/material";

const SelectUI = () => {
  const { setSort, sort } = useSort((state: any) => state);
  const sortHandler = (e: any) => {
    setSort(e.target.value);
  };

  return (
    <Select value={sort} onChange={sortHandler}>
      <MenuItem value="default">Default</MenuItem>
      <MenuItem value="lowest">Price: Low to High</MenuItem>
      <MenuItem value="highest">Price: High to Low</MenuItem>
    </Select>
  );
};

export default SelectUI;
