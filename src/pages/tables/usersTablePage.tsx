import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import HomeLayout from '../../app/layouts/home/homeLayout'
import IUser from '../../models/interfaces/user'
import SortableTable from '../../components/table/sortableTable'
import { Checkbox } from '@radix-ui/react-checkbox'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Payment } from '../someRandomCode'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../app/api/axios'
import UsersTable from '../../components/table/usersTable'

export default function SortableTablePage() {

    // component output
    let content:JSX.Element = <></>

    const api = useAxios('http://localhost:3500/')
    //const api = apiRef.current

    ////// REACT-QUERY //////
    // GET ALL USERS
    const getAllUsersQuery = useQuery(['get-all-users'], 
        async () => await api.get('users').then((res:any) => res.data),
        {refetchOnWindowFocus:false})
    
    let data: IUser[] = [
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
        
    const columns: ColumnDef<IUser>[] = [
        {
          accessorKey: "_id",
          header: "Id",
        },
        {
          accessorKey: "username",
          header: "Username",
        },
        {
          accessorKey: "active",
          header: "Active",
        },        
    ]

    // const columns: ColumnDef<IUser>[] = [
    //     {
    //       id: "select",
    //       header: ({ table }) => (
    //         <Checkbox
    //           checked={table.getIsAllPageRowsSelected()}
    //           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //           aria-label="Select all"
    //         />
    //       ),
    //       cell: ({ row }) => (
    //         <Checkbox
    //           checked={row.getIsSelected()}
    //           onCheckedChange={(value) => row.toggleSelected(!!value)}
    //           aria-label="Select row"
    //         />
    //       ),
    //       enableSorting: false,
    //       enableHiding: false,
    //     },
    //     {
    //       accessorKey: "_id",
    //     //   header: "Id",
    //       header: ({ column }) => {
    //         return (<a href="#" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
    //                     <span className="flex uppercase text-xs">Id<ArrowUpDown className="ml-2 h-4 w-4" /></span>
    //                 </a>)
    //       },
    //       cell: ({ row }) => <div className="">{row.getValue("_id")}</div>,
    //     },
    //     {
    //       accessorKey: "username",
    //       header: ({ column }) => {
    //         return (<a href="#" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
    //                     <span className="flex uppercase text-xs">Username<ArrowUpDown className="ml-2 h-4 w-4" /></span>
    //                 </a>)
    //       },
    //       cell: ({ row }) => <div className="lowercase">{row.getValue("username")}</div>,
    //     },        
    //     {
    //       accessorKey: "active",
    //       // header: "Active",
    //       header: ({ column }) => {
    //         return (<a href="#" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
    //                     <span className="flex uppercase text-xs">Active<ArrowUpDown className="ml-2 h-4 w-4" /></span>
    //                 </a>)
    //       },
    //       cell: ({ row }) => <div className="uppercase">{(row.getValue("active") as string).toString()}</div>,
    //     },
    //     {
    //       id: "actions",
    //       enableHiding: false,
    //       cell: ({ row }) => {
    //         const payment = row.original
      
    //         return (
    //           <DropdownMenu>
    //             <DropdownMenuTrigger asChild>
    //               <Button variant="ghost" className="h-8 w-8 p-0">
    //                 <span className="sr-only">Open menu</span>
    //                 <MoreHorizontal className="h-4 w-4" />
    //               </Button>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent align="end">
    //               <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //               <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id ? payment.id : "")}>
    //                 Copy payment ID
    //               </DropdownMenuItem>
    //               <DropdownMenuSeparator />
    //               <DropdownMenuItem>View customer</DropdownMenuItem>
    //               <DropdownMenuItem>View payment details</DropdownMenuItem>
    //             </DropdownMenuContent>
    //           </DropdownMenu>
    //         )
    //       },
    //     },
    // ]
    
    // const columnHelper = createColumnHelper<IUser>()
    // console.log(columnHelper)

    if (getAllUsersQuery.isLoading || getAllUsersQuery.isFetching ) {
        content = <p>Loading...</p>
    }

    if (getAllUsersQuery.isError) {
        content = <p className="errmsg">whatev</p>
    }

    if (getAllUsersQuery.isSuccess) {
        data = getAllUsersQuery.data
        content = <>
        {/* <HomeLayout pageTitle="Sortable Table Example"> */}
            {/* <UsersTable<IUser, string> data={data} columns={columns}></UsersTable>             */}
            <UsersTable<IUser, string> data={data} columns={columns}/>            
        {/* </HomeLayout> */}
        </>
    }

    return content

}




















