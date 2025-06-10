import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import kerala_logo from '../../assets/kerala-logo.png';
import ksmart_logo from '../../assets/ksmartLogo.svg';

import slide1 from '../../assets/slide1.png';
import slide2 from '../../assets/slide2.png';
import slide3 from '../../assets/slide3.png';

function LeftPanel() {
  return (
    <div className="w-1/2 flex flex-col justify-center items-center p-10">
      <img
        src={kerala_logo}
        alt="Kerala Emblem"
        className="w-25 h-20 mb-4"
      />
      <h1 className="text-xl font-medium text-blue-700">Welcome to</h1> 
      <img
        src={ksmart_logo}
        alt="Kerala Emblem"
        className="w-25 h-15 mb-4"
      />

      {/* Carousel Component */}
<Carousel
  showArrows={true}
  autoPlay={true}
  interval={5000}
  infiniteLoop={true}
  showThumbs={false}
  showStatus={false}
className="w-3/4 rounded-lg shadow-lg mt-6 max-h-[600px]"
>
  <div>
    <img src={slide1} alt="Slide 1" className="object-contain max-h-48 mx-auto" />
  </div>
  <div>
    <img src={slide2} alt="Slide 2" className="object-contain max-h-48 mx-auto" />
  </div>
  <div>
    <img src={slide3} alt="Slide 3" className="object-contain max-h-48 mx-auto" />
  </div>
</Carousel>


      <p className="mt-10 text-gray-600 text-center text-lg">
        One integrated platform for all the services you need
      </p>
    </div>
  );
}

export default LeftPanel;
