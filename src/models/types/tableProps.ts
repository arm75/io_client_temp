import IUser from '../interfaces/user'
import { Column } from 'react-table'

export default interface ITableProps {
    data: Array<IUser>
    columns: Array<Column>
    enableSorting?: boolean
    hideHeaders?: boolean
}
