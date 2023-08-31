import { useReactTable } from '@tanstack/react-table'
import { ColumnDef } from "@tanstack/react-table"
import { flexRender, getCoreRowModel } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../ui/table"
import IUser from '../../models/interfaces/user'

// export default interface IUser {
//     id?: string
//     username: string
//     password?: string
//     firstname?: string
//     lastname?: string
//     email?: string
//     roles?: Array<string>
//     rolesArray?: Array<string>
// }

// export type Payment = {
//     id: string
//     amount: number
//     status: "pending" | "processing" | "success" | "failed"
//     email: string
// }

// const data: IUser[] = [
//     {
//         id: "001",
//         username: "arm",
//         firstname: "Aaron",
//         lastname: "Smith",
//     },
//     {
//         id: "002",
//         username: "panda",
//         firstname: "Amanda",
//         lastname: "Fitzroy",
//     },
//     {
//         id: "003",
//         username: "alexander",
//         firstname: "Alexander",
//         lastname: "Madalay",
//     },
//     {
//         id: "004",
//         username: "bob",
//         firstname: "Robert",
//         lastname: "Marles",
//     },
//     {
//         id: "005",
//         username: "jeanluc",
//         firstname: "JeanLuc",
//         lastname: "Picard",
//     },
// ]


// const columns: ColumnDef<IUser>[] = [
//     {
//       accessorKey: "id",
//       header: "Id",
//     },
//     {
//       accessorKey: "username",
//       header: "Username",
//     },
//     {
//       accessorKey: "firstname",
//       header: "FirstName",
//     },
//     {
//         accessorKey: "lastname",
//         header: "LastName",
//       },
//   ]

  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

  export default function BasicTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })
   
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
