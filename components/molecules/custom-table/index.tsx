import React from "react";
import { mapModifiers } from "helpers/libs/utils";
import Icon from "@/components/atoms/icon";

export interface TableProps {
  modifiers?: "header-col-span";
  children?: React.ReactNode;
  caption?: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({
  modifiers,
  children,
  caption,
}) => (
  <div className="m-table">
    {caption && <div className="m-table__caption">{caption}</div>}
    <div className="m-table__table-container">
      <table className={mapModifiers("m-table__table", modifiers)}>
        {children}
      </table>
    </div>
    <div className="m-table__scrollable-icon">
      {/* <Icon name="scrollable" /> */}
    </div>
  </div>
);

interface TableHeadProps
  extends Omit<React.HTMLAttributes<HTMLTableSectionElement>, "className"> {
  children?: React.ReactNode;
}

export const TableHead: React.FC<TableHeadProps> = ({ children, ...props }) => (
  <thead className="m-table__table-head" {...props}>
    {children}
  </thead>
);

interface TableHeaderProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "className"> {
  children?: React.ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ children }) => (
  <th className="m-table__table-header">{children}</th>
);

interface TableBodyProps
  extends Omit<React.HTMLAttributes<HTMLTableSectionElement>, "className"> {
  children?: React.ReactNode;
}
export const TableBody: React.FC<TableBodyProps> = ({ children }) => (
  <tbody className="m-table__table-body">{children}</tbody>
);

interface TableRowProps
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, "className"> {
  children?: React.ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({ children, ...props }) => (
  <tr className="m-table__table-row">{children}</tr>
);

interface TableDataProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "className"> {
  children?: React.ReactNode;
}

export const TableData: React.FC<TableDataProps> = ({ children, ...props }) => (
  <td {...props} className="m-table__table-data">
    {children}
  </td>
);

interface TableColGroupProps
  extends Omit<
    React.ColgroupHTMLAttributes<HTMLTableColElement>,
    "className" | "span"
  > {
  children?: React.ReactNode;
}

export const TableColGroup: React.FC<TableColGroupProps> = ({ children }) => (
  <colgroup className="m-table__table-col-group">{children}</colgroup>
);

interface TableColProps
  extends Omit<
    React.ColgroupHTMLAttributes<HTMLTableColElement>,
    "className" | "span" | "colspan"
  > {
  colSpan?: number;
}

export const TableCol: React.FC<TableColProps> = ({ colSpan, ...props }) => (
  <col className="m-table__table-col" {...props} span={colSpan} />
);
