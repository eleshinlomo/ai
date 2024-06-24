import Footer from "@/components/footer"
import HomeNavBar from "@/components/homenavbar"


interface PublicLayoutProps {

    children: React.ReactNode
}


const PublicRoutesLayout = ({children}: PublicLayoutProps)=>{
   

    return (
        <div>
        <HomeNavBar />
         {children}
         <Footer />
        </div>
    )
}

export default PublicRoutesLayout