import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/homePage';
import { useQuery } from '@tanstack/react-query'
import useAxios from './app/api/axios';
import LayoutPage from './pages/layoutPage';
import LoginPage from './pages/loginPage';
import IUser from './models/interfaces/user';
import { redirect } from 'react-router-dom';
import AuthGuard from './app/auth/authGuard';
import PageNotFound from './pages/pageNotFound';
import BasicTablePage from './pages/tables/basicTablePage';
import SortableTablePage from './pages/tables/sortableTablePage';
import TablesPage from './pages/tablesPage';
import UsersTablePage from './pages/tables/usersTablePage';
import SomeOtherTableCode from './pages/tables/someOtherTableCode';

export default function App() {

  // component output
  let content:JSX.Element = <></>

  const api = useAxios('http://localhost:3500/')

  ////// REACT-QUERY //////
  // GET AuthMe
  const authMeQueryData = useQuery(["auth-me"], 
        async () => await api.get('auth/me').then((res:any) => res.data),
        {refetchOnWindowFocus:false})
  
  console.log(authMeQueryData)
  
  if (authMeQueryData.isLoading || authMeQueryData.isFetching ) {
    content = <p className="">Loading...</p>
  }

  if (authMeQueryData.isError) {
    content = <p className="errmsg">whatev</p>
  }

  if (authMeQueryData.isSuccess) {

    //console.log({authMeQueryData})

    //if(authMeQueryData.data === "") {
      content = <>    
        <Router>
          <Routes>
            <Route path="/" element={<AuthGuard><HomePage /></AuthGuard>} />
            <Route path="layout" element={<AuthGuard><LayoutPage /></AuthGuard>} />
            <Route path="basic" element={<AuthGuard><BasicTablePage /></AuthGuard>} />
            <Route path="sortable" element={<AuthGuard><SortableTablePage /></AuthGuard>} />
            <Route path="tables" element={<AuthGuard><TablesPage /></AuthGuard>}>
              <Route path="basic" element={<BasicTablePage />} />
              <Route path="sortable" element={<SortableTablePage />} />
              <Route path="users" element={<UsersTablePage />} />
              <Route path="other" element={<SomeOtherTableCode<IUser> data={[authMeQueryData.data]} />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </Router>         
      </>
  }

  return content
}

    // <AuthProvider>
    //   <Routes>
    //     <Route element={<Layout />}>
    //       <Route path="/" element={<PublicPage />} />
    //       <Route path="/login" element={<LoginPage />} />
    //       <Route path="/protected" element={ <RequireAuth><ProtectedPage /></RequireAuth> } />
    //     </Route>
    //   </Routes>
    // </AuthProvider>