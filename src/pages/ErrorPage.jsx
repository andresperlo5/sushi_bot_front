import { useChangeTitlePage } from "../helpers/changeTitlePage"

const ErrorPage = () => {
  useChangeTitlePage('error')
  return (
    <img src="https://res.cloudinary.com/codefusiontech/image/upload/v1582791158/general/404Hero.png" alt="" className="img-fluid" />
  )
}

export default ErrorPage
