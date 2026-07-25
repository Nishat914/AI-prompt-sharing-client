import Navbar from "@/component/Navbar";
import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);



const Layout = ({children}) =>{
    return(
        <>
             <Navbar></Navbar>
             {children}
             
        </>
    )
}
export default Layout