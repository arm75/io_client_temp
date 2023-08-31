import { Link, Outlet } from 'react-router-dom';
import HomeLayout from '../app/layouts/home/homeLayout';

export default function TablesPage() {
    return ( <>
        <HomeLayout pageTitle="Table Examples">            
            <div className="flex p-10 justify-start gap-10 border">
                <Link to="basic" className="m-6 text-2xl text-emerald-500">Basic Table Example</Link>
                <Link to="sortable" className="m-6 text-2xl text-emerald-500">Sortable Table Example</Link>
                <Link to="users" className="m-6 text-2xl text-emerald-500">Users Table Example</Link>
                <Link to="other" className="m-6 text-2xl text-emerald-500">Other Table Example</Link>
            </div>
            <Outlet />
        </HomeLayout>
    </>
    )
}
