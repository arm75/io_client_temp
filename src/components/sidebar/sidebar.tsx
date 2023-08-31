import { useEffect, useState } from 'react';


function Sidebar() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const [isMouseOver, setIsMouseOver] = useState(false)

    const handleMouseEnter = () => {
        setIsMouseOver(true)
    }

    const handleMouseLeave = () => {
        setIsMouseOver(false)
        setIsSidebarOpen(false)
    }

    useEffect(() => {
        
        const handleMouseMove = (event:any) => {
          const mouseX = event.pageX;
          const isMouseOnLeftEdge = mouseX == 0; // Adjust the value as needed
          if (isMouseOnLeftEdge) {
            // Mouse is on the left edge of the screen
            // Perform your desired action here
            console.log('left side touched')
            setIsSidebarOpen(true);                
          }
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
        };
      }, []);


    return(
    <>  
        {/* <div className="w-screen h-screen overflow-hidden bg-transparent fixed top-0 bottom-0 left-0 right-0 no-scrollbar">       */}
          <div className={`flex flex-col overflow-hidden no-scrollbar overflow-y-scroll box-content pr-5 
          overflow-x-hidden justify-start items-start bg-slate-800 w-64 h-screen transform transition-transform 
          p-4 duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} 
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className=" text-slate-600   text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
            <div className=" text-slate-600 text-lg uppercase">Navigation</div>
          </div>
        {/* </div> */}
    </>
    )

}

export default Sidebar