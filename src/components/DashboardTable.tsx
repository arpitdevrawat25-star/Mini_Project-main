import TableHOC from "../pages/TableHOC";
import type { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<DataType>[] = [
	{
		header: "Carrer",
		accessorKey: "id",
	},
	{
		header: "Match",
		accessorKey: "quantity",
	},
];

interface DataType {
	id: string;
	amount: number;
	quantity: number;
	discount: number;
	status: string;
}

const EMPTY_DATA: DataType[] = [];

const DashboardTable = ({ data = EMPTY_DATA }: { data?: DataType[] }) => {
	return TableHOC<DataType>(
		columns,
		data,
		"transactionBox",
		"Top Transactions",
	)();
};

export default DashboardTable;
