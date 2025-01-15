import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormC from './FormC';

const ModalC = ({ idModalPage }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="-" onClick={handleShow} className='p-0'>
        {idModalPage === 'login' ? 'Iniciar Sesion' : 'Registrarse'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{idModalPage === 'login' ? 'Ingresa a tu cuenta' : 'Usuario Nuevo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormC idPage={idModalPage === 'login' ? 'login' : 'register'} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalC
