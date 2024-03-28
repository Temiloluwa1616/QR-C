import Navbar from "./Navbar";

function Sharednav({children}){
    return(
        <div>
            <Navbar/>
            {children}
        </div>
    )
}

export default Sharednav