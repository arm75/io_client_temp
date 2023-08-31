// import { useQueryClient } from 'react-query';
// import IUser from '../models/interfaces/user';

import { Outlet } from 'react-router-dom'
import HomeLayout from '../app/layouts/home/homeLayout'

export default function LayoutPage() {
    
    // const queryClient = useQueryClient()
    // const authMeQueryData:IUser|undefined = queryClient.getQueryData("auth-me")    

    interface IJPPhoneticGroup {
      hchar: string[],
      kchar: string[],
      phon: string[],
      color: string,
    }

    interface IJPCard {
      char: string[],
      phon: string[],
      color: string,
    }

    // a - i - u - e - o !!!
    // 'ah-ee-oo-ay-oh !!!
    const hiragana: { [key: string]: IJPPhoneticGroup } = {
      a: {
        hchar: ['3042', '3044', '3046', '3048', '304A'],
        kchar: ['30A2', '30A4', '30A6', '30A8', '30AA'],
        phon: ['a', 'i', 'u', 'e', 'o'],
        color: "bg-orange-600",
      },
      k: {
        hchar: ['304B', '304D', '304F', '3051', '3053'],
        kchar: ['30AB', '30AD', '30AF', '30B1', '30B3'],
        phon: ['ka', 'ki', 'ku', 'ke', 'ko'],
        color: "bg-emerald-600",
      },
      s: {
        hchar: ['3055', '3057', '3059', '305B', '305D'],
        kchar: ['30B5', '30B7', '30B9', '30BB', '30BD'],
        phon: ['sa', 'shi', 'su', 'se', 'so'],
        color: "bg-red-600",
      },
      t: {
        hchar: ['305F', '3061', '3064', '3066', '3068'],
        kchar: ['30BF', '30C1', '30C4', '30C6', '30C8'],
        phon: ['ta', 'chi', 'tsu', 'te', 'to'],
        color: "bg-sky-600",
      },
      n: {
        hchar: ['306A', '306B', '306C', '306D', '306E'],
        kchar: ['30CA', '30CB', '30CC', '30CD', '30CE'],
        phon: ['na', 'ni', 'nu', 'ne', 'no'],
        color: "bg-violet-600",
      },
      h: {
        hchar: ['306F', '3072', '3075', '3078', '307B'],
        kchar: ['30CF', '30D2', '30D5', '30D8', '30DB'],
        phon: ['ha', 'hi', 'fu', 'he', 'ho'],
        color: "bg-yellow-500",
      },
      m: {
        hchar: ['307E', '307F', '3080', '3081', '3082'],
        kchar: ['30DE', '30DF', '30E0', '30E1', '30E2'],
        phon: ['ma', 'mi', 'mu', 'me', 'mo'],
        color: "bg-pink-600",
      },
      y: {
        hchar: ['3084', '', '3086', '', '3088'],
        kchar: ['30E4', '', '30E6', '', '30E8'],
        phon: ['ya', '', 'yu', '', 'yo'],
        color: "bg-lime-600",
      },
      r: {
        hchar: ['3089', '308A', '308B', '308C', '308D'],
        kchar: ['30E9', '30EA', '30EB', '30EC', '30ED'],
        phon: ['ra', 'ri', 'ru', 're', 'ro'],
        color: "bg-blue-600",
      },
      w: {
        hchar: ['308F', '', '', '', '3092'],
        kchar: ['30EF', '', '', '', '30F2'],
        phon: ['wa', '', '', '', 'wo'],
        color: "bg-amber-950",
      },
      nn: {
        hchar: ['3093', '', '', '', ''],
        kchar: ['30F3', '', '', '', ''],
        phon: ['n', '', '', '', ''],
        color: "bg-fuchsia-400",
      },      
    }

    const createDeck = (IJPPhoneticGroup:IJPCard[]) => {
      const thisDeck:IJPCard[] = []
      Object.keys(hiragana).map((key, indexO) => (
        hiragana[key].hchar.map((item, indexI) => {
          console.log(item)
          // thisDeck.push({
          //   char: item.hchar,
          //   phon: item.phone,
          //   color: item.color
          // })
        })      
    ))}
    
    return(
    <>
      <HomeLayout pageTitle="Layout Page">
    
    <h1 className="text-6xl text-center mb-4">Hiragana</h1>
    <div className="grid grid-cols-5 gap-4 justify-center">
      {Object.keys(hiragana).map((key, indexO) => (
        
        hiragana[key].hchar.map((item, indexI) => {
          
          let cardContent:JSX.Element = <></>;

          if(item) {
            cardContent = <div className="w-full text-center p-6 text-sky-600 text-6xl bg-indigo-100 border-2 border-indigo-900">
                <div className="mb-6 text-center">
                  {String.fromCharCode(parseInt(hiragana[key].hchar[indexI], 16))}                  
                </div>
                <div className={`p-4 text-center text-4xl ${hiragana[key].color} border-2 border-slate-800 text-white`}>
                  {hiragana[key].phon[indexI]}
                </div>
              </div>                
            } else { cardContent = <div className="w-full text-center p-6 bg-slate-400 border-2 border-slate-700"></div> }
            return cardContent     
          })))}      
    </div>

    <h1 className="text-6xl text-center mb-4">Katakana</h1>
    <div className="grid grid-cols-5 gap-4 justify-center">
      {Object.keys(hiragana).map((key, indexO) => (
        
        hiragana[key].hchar.map((item, indexI) => {
          
          let cardContent:JSX.Element = <></>;

          if(item) {
            cardContent = <div className="w-full text-center p-6 text-sky-600 text-6xl bg-indigo-100 border-2 border-indigo-900">
                <div className="mb-6 text-center">
                  {String.fromCharCode(parseInt(hiragana[key].kchar[indexI], 16))}
                </div>
                <div className={`p-4 text-center text-4xl ${hiragana[key].color} border-2 border-slate-800 text-white`}>
                  {hiragana[key].phon[indexI]}
                </div>
              </div>                
            } else { cardContent = <div className="w-full text-center p-6 bg-slate-400 border-2 border-slate-700"></div> }
            return cardContent     
          })))}      
    </div>


        {/* // LEFT HERE FOR LATER REMINDER TO CHANGE THE LAYOUT SYSTEM */}
        {/* <Outlet />           */}            
      </HomeLayout>
    </>
    )    
}

// function Layout() {
//   return (
//     <div>
//       <AuthStatus />

//       <ul>
//         <li>
//           <Link to="/">Public Page</Link>
//         </li>
//         <li>
//           <Link to="/protected">Protected Page</Link>
//         </li>
//       </ul>

//       <Outlet />
//     </div>
//   );
// }