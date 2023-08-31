import { useQueryClient } from '@tanstack/react-query'
import { Navigate, useLocation } from 'react-router-dom'
import IUser from '../../models/interfaces/user'

export default function AuthGuard({ children }: { children: JSX.Element }) {       

    const location = useLocation()

    const queryClient = useQueryClient()

    const authMeQueryData:IUser|undefined = queryClient.getQueryData(["auth-me"])
  
    if (!authMeQueryData) {
        return <Navigate to="/login" state={{ from: location }} replace />
    } else {
        return children
    }
}
