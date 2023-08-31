import { ColumnDef } from '@tanstack/react-table'
import IUser from '../../models/interfaces/user'
import BasicTable from '../../components/table/basicTable'
import HomeLayout from '../../app/layouts/home/homeLayout'

export default function BasicTablePage() {
    
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
        
    const columns: ColumnDef<IUser>[] = [
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
    

    return ( <>
        {/* <HomeLayout pageTitle="Basic Table Example"> */}
            <BasicTable data={data} columns={columns}></BasicTable>
        {/* </HomeLayout> */}
    </> )
}
