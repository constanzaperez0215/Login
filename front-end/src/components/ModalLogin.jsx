import { useEffect, useRef, useState } from 'react'
import Pills from './Pill'
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit'

const ModalLogin = () => {
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <MDBBtn style={{ zIndex: 20 }} onClick={() => setOpen(!open)}>Login</MDBBtn>
      <MDBModal open={open} setOpen={setOpen} tabIndex={-1}>
        <MDBModalDialog>
          <MDBModalContent>

            <MDBModalBody>
              <Pills />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn type='button' onClick={() => setOpen(!open)}>
                Cerrar
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}

export default ModalLogin
