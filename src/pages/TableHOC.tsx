import {
	AiOutlineSortAscending,
	AiOutlineSortDescending,
} from "react-icons/ai";

import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, TableOptions } from "@tanstack/react-table";

function TableHOC<T extends object>(
	columns: ColumnDef<T>[],
	data: T[],
	containerClassname: string,
	heading: string,
	showPagination: boolean = false,
) {
	return function HOC() {
		const options: TableOptions<T> = {
			columns,
			data,
			initialState: {
				pagination: { pageSize: 6 },
			},
			getCoreRowModel: getCoreRowModel(),
			getSortedRowModel: getSortedRowModel(),
			getPaginationRowModel: getPaginationRowModel(),
		};

		const table = useReactTable(options);

		return (
			<div className={containerClassname}>
				<h2 className="heading">{heading}</h2>

				<table className="table">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const sorted = header.column.getIsSorted(); // false | "asc" | "desc"

									return (
										<th
											key={header.id}
											onClick={header.column.getToggleSortingHandler()}
											style={{
												cursor: header.column.getCanSort()
													? "pointer"
													: "default",
											}}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
											{sorted && (
												<span>
													{" "}
													{sorted === "desc" ? (
														<AiOutlineSortDescending />
													) : (
														<AiOutlineSortAscending />
													)}
												</span>
											)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>

					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>

				{showPagination && (
					<div className="table-pagination">
						<button
							disabled={!table.getCanPreviousPage()}
							onClick={() => table.previousPage()}
						>
							Prev
						</button>
						<span>{`${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}</span>
						<button
							disabled={!table.getCanNextPage()}
							onClick={() => table.nextPage()}
						>
							Next
						</button>
					</div>
				)}
			</div>
		);
	};
}

export default TableHOC;
