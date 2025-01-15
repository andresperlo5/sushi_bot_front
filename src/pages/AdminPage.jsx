import { useChangeTitlePage } from "../helpers/changeTitlePage"

const AdminPage = () => {
  useChangeTitlePage('admin')
  return (
    <div>AdminPage</div>
  )
}

export default AdminPage
