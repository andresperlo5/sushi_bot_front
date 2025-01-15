import '../css/CarouselC.css'

const ImageC = ({ imageUrl, txtAlt, width, heigth }) => {
  return (
    <div className='container-image'>
      <img src={imageUrl} alt={txtAlt} />
    </div>
  )
}

export default ImageC
