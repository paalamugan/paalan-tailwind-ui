export interface DataTableLabelOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface TableFacetFilterColumn {
  accessorKey: string;
  title: string;
  options: DataTableLabelOption[];
}

export interface TableActionItem extends DataTableLabelOption {
  label: string;
  value: string;
  onClick?: (value: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  subLabels?: DataTableLabelOption[];
}

export interface TablePaginationOption {
  enabled: boolean;
  currentPage?: number;
  pageSize?: number;
  sizes?: number[];
}

export interface TableSearchFilterColumn {
  accessorKey: string;
  placeholder?: string;
}
