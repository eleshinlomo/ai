import Footer from "@/components/footer"
import NavBarPage from "@/components/NavBar/NavBarPage/page"

interface AllRoutesProps {
    children: React.ReactNode
}

const AllRoutesLayout = ({children}: AllRoutesProps)=>{

    return (
        <div className="bg-black text-white">
            <NavBarPage />
            {children}
            <Footer />
        </div>
    )
}

export default AllRoutesLayout