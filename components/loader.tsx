import Image from 'next/image'

export const Loader = ()=>{
return (
    <div className="h-full text-center flex flex-col flex-1 gap-y-4 
    items-center justify-center">
        <div className='w-5 h-5 relative animate-spin '>
            <Image
            alt= 'Loading' 
            fill
            src='/logo.png'
            />
        </div>
        <p className='text-sm text-muted-foreground'>
            Waiting for response...
        </p>
    </div>
)
}