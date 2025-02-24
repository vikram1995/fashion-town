import Image from 'next/image'
import { Button } from "@/components/ui/button"


function Landing() {
  return (
    <div className='mt-20'>
      <section className='relative'>
        <Image
          src="/images/fashion-town-hero.jpg"
          width={900}
          height={900}
          alt="Picture of the author"
          className='w-full h-[500px] object-cover'
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className='absolute top-[20%] left-[10%] flex flex-col gap-20'>
          <div className='text-white text-5xl'>ITS TIME TO STAND<br /> OUT FROM THE <br />CROWED</div>
          <Button variant="outline" className="rounded-3xl w-fit">SHOP NOW</Button>
        </div>
      </section>
      <section className='flex flex-col md:flex-row p-2 gap-2'>

        <div className='w-full md:w-2/3 relative'>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
          <Image
            src="/images/mens-fashion.jpg"
            width={900}
            height={900}
            alt="Picture of the author"
            className='w-full h-[500px] object-cover'
          />
          <div className='absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Button variant="outline" className="rounded-3xl w-fit ">MEN</Button>
          </div>

        </div>
        <div className='w-full md:w-1/3 relative'>
          <Image
            src="/images/women-fashion.jpg"
            width={900}
            height={900}
            alt="Picture of the author"
            className='w-full h-[500px] object-cover'
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
          <div className='absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Button variant="outline" className="rounded-3xl w-fit ">WOMEN</Button>
          </div>
        </div>
      </section>
      <section className='pl-2 pr-2 relative'>
        <Image
          src="/images/accessories.jpg"
          width={900}
          height={900}
          alt="Picture of the author"
          className='w-full h-[500px] object-cover'
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className='absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Button variant="outline" className="rounded-3xl w-fit ">ACCESSORIES</Button>
        </div>
      </section>
    </div>
  )
}

export default Landing