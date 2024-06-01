import React from 'react';
import ImageSlider from './ImageSlider';

const images = [
  'https://th.bing.com/th/id/OIG1.CAgyGaCu1gIJLDkjl0M_?w=270&h=270&c=6&r=0&o=5&dpr=1.5&pid=ImgGn',
  'https://th.bing.com/th/id/OIG4.5bIZF.r1b.kgQ5Beu9fG?w=270&h=270&c=6&r=0&o=5&dpr=1.5&pid=ImgGn',
  'https://th.bing.com/th/id/OIG3.a7XmYl0qZtD.sq0whIjR?w=270&h=270&c=6&r=0&o=5&dpr=1.5&pid=ImgGn',
];

const Mainpage = () => (
  <div>
    
    <ImageSlider images={images} />
  </div>
);

export default Mainpage;
