import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ImageC from './ImageC';

const CarouselC = () => {
  const [carouselHeight, setCarouselHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const navbarHeight = document.querySelector('.bg-nular').offsetHeight;
      setCarouselHeight(window.innerHeight - navbarHeight - 0.5);
    };
    handleResize(); // Calcular al cargar
    window.addEventListener('resize', handleResize); // Recalcular al cambiar el tamaño
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (

    <Carousel fade className='carousel-container d-flex flex-column align-items-center justify-content-center' style={{ height: `${carouselHeight}px` }}>
      <Carousel.Item>
        <ImageC imageUrl='https://i.pinimg.com/originals/4f/1c/f0/4f1cf0a91fdee088f1d0ca9284181252.png' txtAlt='sushi' />
        <Carousel.Caption className='banner-carousel'>
          <h3>Pescado y el Marisco</h3>
          <p>Aunque normalmente se asocia el sushi con el pescado y el marisco</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ImageC imageUrl='https://pixelz.cc/wp-content/uploads/2018/12/sushi-uhd-4k-wallpaper.jpg' txtAlt='sushi' />
        <Carousel.Caption className='banner-carousel'>
          <h3>Tamaño bocado</h3>
          <p>El sushi se prepara generalmente en raciones pequeñas</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ImageC imageUrl='https://www.shutterstock.com/image-photo/sushi-platter-vibrant-fresh-restaurant-600nw-2497859733.jpg' txtAlt={'sushi'} />
        <Carousel.Caption className='banner-carousel'>
          <h3>Cocina japonesa</h3>
          <p>
            Sushi es un plato típico de origen japonés basado en arroz
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselC
