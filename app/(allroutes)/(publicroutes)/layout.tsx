import Footer from "@/components/footer"


interface PublicLayoutProps {

    children: React.ReactNode
}


const PublicRoutesLayout = ({children}: PublicLayoutProps)=>{
   

    return (
        <div>
         {children}
        </div>
    )
}

export default PublicRoutesLayout