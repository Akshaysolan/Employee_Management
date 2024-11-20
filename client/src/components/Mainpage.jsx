import React from 'react';
import ImageSlider from './ImageSlider';

const images = [
  'http://ts1.mm.bing.net/th?id=OIP.AL-tY-Ydu2oesBkkSjIR-QHaFt&pid=15.1',
  'http://ts2.mm.bing.net/th?id=OIP.adPqL96PupxMqOozcoYEzQHaE-&pid=15.1',
  'https://th.bing.com/th/id/OIP.mALkNXc0i1RVDO8cuR774AHaE8?w=278&h=186&c=7&r=0&o=5&dpr=1.5&pid=1.7',
];

const Mainpage = () => (
  <div>
    
    <ImageSlider images={images} />
  </div>
);

export default Mainpage;
