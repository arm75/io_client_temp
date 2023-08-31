import { columns } from "./columns"
import { DataTable } from "./dataTable"
import { useQuery } from '@tanstack/react-query'
import useAxios from '../app/api/axios'

export default function DemoTablePage() {

    let content:JSX.Element = <></>

    const api = useAxios('http://localhost:3500/')
  
    const getAllUsersQuery = useQuery(['get-all-users'], 
      async () => await api.get('users').then(res => res.data),
      {refetchOnWindowFocus:false})
  
    if (getAllUsersQuery.isLoading || getAllUsersQuery.isFetching ) {
      content = <p>Loading...</p>
    }

    if (getAllUsersQuery.isError) {
      content = <p className="errmsg">whatev</p>
    }

    if (getAllUsersQuery.isSuccess) {
      const data = getAllUsersQuery.data
      content = <DataTable columns={columns} data={data}/>
    }

    return content
}
