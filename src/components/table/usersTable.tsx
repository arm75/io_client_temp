import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table"
import IUser from '../../models/interfaces/user'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../app/api/axios'


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export default function UsersTable<TData, TValue>({ data, columns }: DataTableProps<TData, TValue>) {
  // export default function UsersTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columnHelper = createColumnHelper<IUser>()

  // const keys = Object.keys(data[0] as string); // Get keys of the first item
  
  // const exampleObj:any = data[0]

  // function processKeys<T>(obj: T): void {
  //   for (const key in obj) {
  //     if (typeof obj[key] === 'string') {
  //       // Do something for string keys
  //       console.log(`String key ${key}: ${obj[key]}`);
  //     } else if (typeof obj[key] === 'number') {
  //       // Do something for number keys
  //       console.log(`Number key ${key}: ${obj[key]}`);
  //     } else if (typeof obj[key] === 'boolean') {
  //       // Do something for boolean keys
  //       console.log(`Boolean key ${key}: ${obj[key]}`);
  //     } else {
  //       // Handle other types if needed
  //       console.log(`Unknown type key ${key}: ${obj[key]}`);
  //     }
  //   }
  // }

  // Make some columns!
  const columns2 = [
    // Display Column
    columnHelper.display({
      id: 'actions',
      cell: props => props.row,
    }),
    // Accessor Column
    columnHelper.accessor('id', {
      cell: info => info.getValue(),
      footer: props => props.column.id,
    }),
    // Accessor Column
    columnHelper.accessor(row => row.username, {
      id: 'userName',
      cell: info => info.getValue(),
      header: () => <span>userName maybe</span>,
      footer: props => props.column.id,
    }),  
  ]

  const columns3: ColumnDef<IUser>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "firstname",
      header: "FirstName",
    },
    {
        accessorKey: "lastname",
        header: "LastName",
      },
]

  // const columns: ColumnDef<IUser, string>[] = [    
  //   {
  //     accessorKey: "_id",
  //     //   header: "Id",
  //     header: ({ column }) => {
  //       return (<a href="#" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //         <span className="flex uppercase text-xs">Id<ArrowUpDown className="ml-2 h-4 w-4" /></span>
  //       </a>)
  //     },
  //     cell: ({ row }) => <div className="">{row.getValue("_id")}</div>,
  //   },
  //   {
  //     accessorKey: "username",
  //     header: ({ column }) => {
  //       return (<a href="#" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //         <span className="flex uppercase text-xs">Username<ArrowUpDown className="ml-2 h-4 w-4" /></span>
  //       </a>)
  //     },
  //     cell: ({ row }) => <div className="lowercase">{row.getValue("username")}</div>,
  //   },
  //   {
  //     accessorKey: "active",
  //     // header: "Active",
  //     header: ({ column }) => {
  //       return (<a href="#" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //         <span className="flex uppercase text-xs">Active<ArrowUpDown className="ml-2 h-4 w-4" /></span>
  //       </a>)
  //     },
  //     cell: ({ row }) => <div className="uppercase">{(row.getValue("active") as string).toString()}</div>,
  //   },
  //   {
  //     id: "actions",
  //     enableHiding: false,
  //     cell: ({ row }) => {
  //       const payment = row.original

  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id ? payment.id : "")}>
  //               Copy payment ID
  //             </DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>View customer</DropdownMenuItem>
  //             <DropdownMenuItem>View payment details</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       )
  //     },
  //   },
  // ]




  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">

        {/* // FILTER EMAILS */}
        <Input placeholder="Filter emails..."
          value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) => table.getColumn("username")?.setFilterValue(event.target.value)}
          className="max-w-sm" />

        {/* // COLUMN SELECTOR */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => {
                return (
                  <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} 
                    onCheckedChange={(value: any) => column.toggleVisibility(!!value)}>
                      {column.id}
                  </DropdownMenuCheckboxItem>
            )})}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border-slate-200 border">
        {/* // ACTUAL TABLE */}
        <Table className="bg-white">

          {/* // TABLE HEADER */}
          <TableHeader className="bg-slate-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>{headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
              )})}
              </TableRow>
            ))}
          </TableHeader>

          {/* // TABLE BODY */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>{row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>))}
                </TableRow>))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">

        {/* // HOW MANY ROWS SELECTED TEXT */}
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        {/* // PREVIOUS/NEXT */}
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>



      </div>
      {/* <DataTablePagination table={table} /> */}


    </div>

  )
}

