import Image from 'next/image'
import pageUnderConstructionImage from '@/public/images/page-under-construction.gif'

const PageUnderConstruction = ()=>{

    return (

        <div className='flex flex-col justify-center items-center pt-32'>
          <p>This page is under construction</p>

          <div className='relative h-72 w-72'>

           <Image src={pageUnderConstructionImage} alt='Page under construction' fill />
          </div>
        </div>
    )
}

export default PageUnderConstruction