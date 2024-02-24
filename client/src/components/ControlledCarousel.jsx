import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';


function ControlledCarousel({ images }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel  activeIndex={index} onSelect={handleSelect}>
     {
        images.map((img,index)=>(
         <Carousel.Item>
        <img className='max-h-[490px] w-[100%] object-cover ' src={img} alt="" />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
     ))
     }

      {/* <Carousel.Item>
        <img className='max-h-[490px] w-[100%] object-cover ' src={images[1]} alt="" />
        <Carousel.Caption>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='max-h-[490px] w-[100%] object-cover ' src={images[2]} alt="" />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}

export default ControlledCarousel;