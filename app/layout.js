
// import Navbar from "../app/Header/page";
// import SideMenu from "../app/Home/page";

// import { Inter as FontSans } from "next/font/google"
// import './globals.css'

// // import { AntdRegistry } from '@ant-design/nextjs-registry';
// // import { cn } from "../lib/utils"
// import { Suspense } from "react";
// // import Loading from "./loading ";

// export const metadata = {
//   title: 'CNE',
//   description: 'Generated by Next.js',
// }

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })



// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" >


//       <body style={{ display: "flex", margin: 0 }}>
//         <aside >
//           <div style={{ width: "100%" }}>
//             <Navbar />
//             {/* <SideMenu /> */}
//           </div>
//         </aside>
//         <aside>
//           <SideMenu />

//           {/* <Navbar /> */}
//         </aside>
//       </body>






//     </html>
//   )
// }


import Navbar from "../app/Header/page";
import SideMenu from "../app/Home/page";

import { Inter as FontSans } from "next/font/google"
import './globals.css'

// import { AntdRegistry } from '@ant-design/nextjs-registry';
// import { cn } from "../lib/utils"
import { Suspense } from "react";
// import Loading from "./loading ";

export const metadata = {
  title: 'CNE',
  description: 'Generated by Next.js',
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: "flex", margin: 0, height: "100vh" }}>
        <aside style={{ borderRight: "1px solid #ddd" }}>
          <SideMenu />
        </aside>
        <main style={{ width: "80%", marginRight: "43vh" }}>
          <Navbar />
          <div style={{ padding: "16px" }}>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
