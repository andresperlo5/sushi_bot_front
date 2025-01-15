import { Col, Container, Row } from "react-bootstrap"
import CardC from "../components/CardC"
import { useEffect, useState } from "react"
import clientAxios, { configHeader } from "../helpers/clientAxios"
import ChatBot from "./ChatBot"
import Swal from "sweetalert2"

const UserMenuPage = () => {
  const [menu, setMenu] = useState([])

  const getMenu = async () => {
    try {
      const res = await clientAxios.get('/menus', configHeader)
      setMenu(res.data.menu)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Error al traer los items del menu",
      });
    }
  }

  useEffect(() => {
    getMenu()
  }, [])
  return (
    <>
      <Container>
        <Row>
          <h2 className="py-5">Rolls</h2>
          {
            menu.map((m) =>
              m.category === 'Rolls-Makis' &&
              < Col sm='12' md='6' lg='4' key={m._id}>
                <CardC idPage='menu' idProduct={m._id} image={m.imageUrl} title={m.name} description={m.description} price={m.price} />
              </Col>

            )
          }
        </Row>
        <Row>
          <h2 className="py-5">Entradas</h2>
          {
            menu.map((m) =>
              m.category === 'entradas' &&
              < Col sm='12' md='6' lg='4' key={m._id}>
                <CardC idPage='menu' idProduct={m._id} image={m.imageUrl} title={m.name} description={m.description} price={m.price} />
              </Col>

            )
          }
        </Row>
        <Row>
          <h2 className="py-5">Bebidas</h2>
          {
            menu.map((m) =>
              m.category === 'bebidas' &&
              < Col sm='12' md='6' lg='4' key={m._id}>
                <CardC idPage='menu' idProduct={m._id} image={m.imageUrl} title={m.name} description={m.description} price={m.price} />
              </Col>

            )
          }
        </Row>
      </Container >
      <ChatBot />
    </>
  )
}

export default UserMenuPage
