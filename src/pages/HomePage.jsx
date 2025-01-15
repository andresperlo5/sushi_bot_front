import CarouselC from "../components/CarouselC"
import { useChangeTitlePage } from "../helpers/changeTitlePage"

const HomePage = () => {
  useChangeTitlePage('home')
  return (
    <>
      <CarouselC />
    </>
  )
}

export default HomePage
