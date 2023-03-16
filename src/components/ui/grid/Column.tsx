import { FC, PropsWithChildren } from "react";
interface IColumn {
  size: number;
  className?: string;
}

const Column: FC<PropsWithChildren<IColumn>> = ({
  size,
  children,
  className,
}) => {
  return (
    <div
      style={{ gridColumn: `span ${size} / span ${size}` }}
      className={className}
    >
      {children}
    </div>
  );
};
export default Column;
