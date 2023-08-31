import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import HomeLayout from '../../app/layouts/home/homeLayout'
import IUser from '../../models/interfaces/user'
import SortableTable from '../../components/table/sortableTable'
import { Checkbox } from '@radix-ui/react-checkbox'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Payment } from '../someRandomCode'

export default function SortableTablePage() {
    
    const data: IUser[] = [
        {
            id: "001",
            username: "arm",
            firstname: "Aaron",
            lastname: "Smith",
        },
        {
            id: "002",
            username: "panda",
            firstname: "Amanda",
            lastname: "Fitzroy",
        },
        {
            id: "003",
            username: "alexander",
            firstname: "Alexander",
            lastname: "Madalay",
        },
        {
            id: "004",
            username: "bob",
            firstname: "Robert",
            lastname: "Marles",
        },
        {
            id: "005",
            username: "jeanluc",
            firstname: "JeanLuc",
            lastname: "Picard",
        },
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

    const columns: ColumnDef<IUser>[] = [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          ),
          enableSorting: false,
          enableHiding: false,
        },
        {
          accessorKey: "id",
          header: "Id",
          cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
          ),
        },
        {
          accessorKey: "username",
          header: ({ column }) => {
            return (
              <Button variant="link" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Email<ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("username")}</div>,
        },
        {
          accessorKey: "amount",
          header: () => <div className="text-right">Amount</div>,
          cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
      
            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(12.50) //'amount' was in those ()
      
            return <div className="text-right font-medium">{formatted}</div>
          },
        },
        {
          id: "actions",
          enableHiding: false,
          cell: ({ row }) => {
            const payment = row.original
      
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id ? payment.id : "")}>
                    Copy payment ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View customer</DropdownMenuItem>
                  <DropdownMenuItem>View payment details</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
        },
      ]
    
      const columnHelper = createColumnHelper<IUser>()
      console.log(columnHelper)

    return ( <>
        {/* <HomeLayout pageTitle="Sortable Table Example"> */}
            <SortableTable data={data} columns={columns}></SortableTable>            
        {/* </HomeLayout> */}
    </> )
}
