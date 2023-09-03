import HomeLayout from "../app/layouts/home/homeLayout"
import useAxios from "../app/api/axios"
import { useQuery } from "@tanstack/react-query"
import RenderBoard from "../components/game/board/renderBoard"
// import { ColumnDef } from "@tanstack/react-table"
// import DropDownMenuDemo from "../components/shadcn/dropDownMenu"
// import IUser from "../models/interfaces/user"
// import LoginPage from "./loginPage"
// import UsersPage from "./usersPage"
// import { Checkbox } from "@radix-ui/react-checkbox"
// import {
// 	DropdownMenu,
// 	DropdownMenuTrigger,
// 	DropdownMenuContent,
// 	DropdownMenuLabel,
// 	DropdownMenuItem,
// 	DropdownMenuSeparator,
// } from "@radix-ui/react-dropdown-menu"
// import { ArrowUpDown, MoreHorizontal } from "lucide-react"
// import { Button } from "../components/ui/button"
// import BasicTable from "../components/table/basicTable"
// import SortableTable from "../components/table/sortableTable"
// import { Link } from "react-router-dom"
// import DemoTablePage from "../payments/page"
// import { DialogDemo } from "../payments/dialog"
// import BoardConstruct from "../components/game/board/renderBoard"

// const data: IUser[] = [
//   {
//       id: "001",
//       username: "arm",
//       firstname: "Aaron",
//       lastname: "Smith",
//   },
//   {
//       id: "002",
//       username: "panda",
//       firstname: "Amanda",
//       lastname: "Fitzroy",
//   },
//   {
//       id: "003",
//       username: "alexander",
//       firstname: "Alexander",
//       lastname: "Madalay",
//   },
//   {
//       id: "004",
//       username: "bob",
//       firstname: "Robert",
//       lastname: "Marles",
//   },
//   {
//       id: "005",
//       username: "jeanluc",
//       firstname: "JeanLuc",
//       lastname: "Picard",
//   },
// ]

// export const columns: ColumnDef<IUser>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={table.getIsAllPageRowsSelected()}
//         onCheckedChange={(value:any) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value:any) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "id",
//     // header: "Id",
//     header: ({ column }) => {
//       return (
//         <Button variant="link" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
//           <span className="no-underline">Id</span><ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("id")}</div>
//     ),
//     enableSorting: true,
//     enableHiding: true,
//   },
//   {
//     accessorKey: "username",
//     header: ({ column }) => {
//       return (
//         <Button variant="link" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
//           Username <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => <div className="lowercase">{row.getValue("username")}</div>,
//   },
//   {
//     accessorKey: "amount",
//     header: () => <div className="">Amount</div>,
//     cell: ({ row }) => {
//       let amount = parseFloat(row.getValue("amount"))
//       amount = 12.50
//       // Format the amount as a dollar amount
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount)

//       return <div className="font-medium">{formatted}</div>
//     },
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
//           <DropdownMenuContent align="start" className="bg-white p-4">
//             <DropdownMenuLabel className="p-2">Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => (payment.id ? navigator.clipboard.writeText(payment.id) : "")} className="p-2"
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="p-2">View customer</DropdownMenuItem>
//             <DropdownMenuItem className="p-2">View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]

export default function HomePage() {
	// component output
	let content: JSX.Element = <></>

	const api = useAxios("http://localhost:3500/")
	//const api = apiRef.current

	////// REACT-QUERY //////
	// GET ALL USERS
	const getAllUsersQuery = useQuery(["get-all-users"], async () => await api.get("users").then((res) => res.data), {
		refetchOnWindowFocus: false,
	})

	if (getAllUsersQuery.isLoading || getAllUsersQuery.isFetching) {
		content = <p>Loading...</p>
	}

	if (getAllUsersQuery.isError) {
		content = <p className="errmsg">whatev</p>
	}

	if (getAllUsersQuery.isSuccess) {
		const usersData = []

		// transform data for table. needs to be extracted out to custom function...
		for (const objKey in getAllUsersQuery.data) {
			const obj: any = getAllUsersQuery.data[objKey]
			usersData.push({
				id: obj._id,
				username: obj.username,
				// password: obj.password,
				// roles: obj.roles.toString().replaceAll(',', ', '),
				// rolesArray: obj.roles
			})
		}

		content = (
			<>
				<HomeLayout pageTitle="Dashboard Page">
					<RenderBoard />
					{/* <TestBoard/>
        <DialogDemo/>
        <DemoTablePage></DemoTablePage> */}
				</HomeLayout>
			</>
		)
	}

	return content
}
