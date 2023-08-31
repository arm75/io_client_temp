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
            <div className="bg-slate-100 col-span-9 h-screen overflow-auto pt-0 px-8">
                <HomeLayoutContent pageTitle={pageTitle}>{children}</HomeLayoutContent>
                {/* <div className="text-white bg-indigo-100 border border-indigo-500 text-center my-10 p-10">
                    <a className="text-indigo-500 hover:text-white" href="/layout">Layout Page</a>
                </div>
                <div className="text-white bg-indigo-500 border border-indigo-900 text-center p-4 mb-2">TEXT</div>                
                <div className="text-white bg-indigo-500 border border-indigo-900 text-center p-4 mb-2">TEXT</div>                
                <div className="text-white bg-indigo-500 border border-indigo-900 text-center p-4 mb-2">TEXT</div>                
                <div className="text-white bg-indigo-500 border border-indigo-900 text-center p-4 mb-2">TEXT</div>                
                <div className="text-white bg-indigo-500 border border-indigo-900 text-center p-4 mb-2">TEXT</div>                
                <div className="text-white bg-indigo-500 border border-indigo-900 text-center p-4 mb-2">TEXT</div>                
                <div className="text-white bg-indigo-500 border border-indigo-900 text-center p-4 mb-2">TEXT</div>                
                <div className="text-white bg-indigo-500 border border-indigo-900 text-center p-4 mb-2">TEXT</div> 
                <div className="text-white bg-indigo-500 border border-indigo-900 text-center p-4 mb-2">TEXT</div> 
                <div className="text-white bg-indigo-500 border border-indigo-900 text-center p-4 mb-2">TEXT</div> */}
                {/* <HomeLayoutHeader/> */}
            </div>
            <div className="bg-slate-700 col-span-3 p-8 h-screen overflow-auto">
                <HomeLayoutSidebar/>                
                <div className="text-white bg-red-500 border border-red-900 text-center p-4 mb-2">TEXT</div>
                <div className="text-white bg-red-500 border border-red-900 text-center p-4 mb-2">TEXT</div>
                <div className="text-white bg-red-500 border border-red-900 text-center p-4 mb-2">TEXT</div>
            </div>
        </div>        
    </>
    )    
}
