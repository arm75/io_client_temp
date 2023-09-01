import HomeLayoutSidebar from './homeLayoutSidebar';
import HomeLayoutHeader from './homeLayoutHeader';
import HomeLayoutContent from './homeLayoutContent';

export default function HomeLayout(props:any) {
    
    const {children, pageTitle} = props

    // const queryClient = useQueryClient()
    // const authMeQueryData:IUser|undefined = queryClient.getQueryData(["auth-me"])    

    return(
    <>
        <div className="min-h-screen grid grid-cols-12">
            <div className="bg-slate-100 col-span-8 h-screen overflow-auto p-4">
                <HomeLayoutContent pageTitle={pageTitle}>{children}</HomeLayoutContent>
            
            </div>
            <div className="bg-slate-700 col-span-4 p-8 h-screen overflow-auto">
                <HomeLayoutSidebar/>
            </div>
        </div>        
    </>
    )    
}
