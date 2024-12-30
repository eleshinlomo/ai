'use client'
import Slider from 'react-infinite-logo-slider'
import {brandsData} from './brandsData'






const ImageSlider = () => {
    
    return (
        <Slider
            width="250px"
            duration={40}
            pauseOnHover={true}
            blurBorders={false}
            blurBorderColor={'#fff'}
        >
            {brandsData.map((item, key)=>
                <div key={key}>
                <Slider.Slide>
                <a  target='_blank' className='flex'>
                {/* <div className='relative h-16 w-16'>
                <img src={item.image} alt="any"  />
                </div> */}
                <p className='gradient-title font-extrabold text-xl md:text-2xl lg:text-3xl tracking-tighter md:px-6 text-center py-8 animate-pulse'>
                    {item.name}
                </p>
                </a>
            </Slider.Slide>
            </div>
            )}
            
        </Slider>
    )
}              
                     
export default ImageSlider