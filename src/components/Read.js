import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from 'sweetalert2';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
{ id: 1, content: "The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary.", image: "accespoint-6jgphxd4zccwqoo867aqw3qorr3unuse1a-s3alias" },
{ id: 2, content: "The languages only differ in their grammar, their pronunciation and their most common words.", image: "accespoint-6jgphxd4zccwqoo867aqw3qorr3unuse1a-s3alias" },
{ id: 3, content: "Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words.", image: "accespoint-6jgphxd4zccwqoo867aqw3qorr3unuse1a-s3alias" },
{ id: 4, content: "If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages.", image: "accespoint-6jgphxd4zccwqoo867aqw3qorr3unuse1a-s3alias"},
{ id: 5, content: "The new common language will be more simple and regular than the existing European languages.", image: "accespoint-6jgphxd4zccwqoo867aqw3qorr3unuse1a-s3alias" },];
const fileTypes = ["JPG", "PNG", "GIF"];
window.Swal = swal;

class Read extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    modalDetalles: false,
    form: {
      id: "",
      content: "",
      image: "",
    },
  };
  onFileChange(e) {
    const file = e.target.files[0];
    console.log(file.name);
    console.log(file.size);
    console.log(file.type);
  }
  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    console.log(this.state.form);
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarModalDetalles = (dato) => {
    console.log(this.state.form);
    this.setState({
      form: dato,
      modalDetalles: true,
      
    });
    console.log("segundo",this.state.form);
  };

  cerrarModalDetalles = () => {
    this.setState({ modalDetalles: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].content = dato.content;
        arreglo[contador].image = dato.image;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
          if (dato.id === registro.id) {
            arreglo.splice(contador, 1);
          }
          contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
        swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data[this.state.data.length-1].id+1;
    var lista= this.state.data;
    console.log(valorNuevo)
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
    swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

  

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
            <h1>Notes: </h1>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Content</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.content}</td>
                  <td>{dato.image}</td>
                  <td>
                    <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)}>Editar</Button>{"  "}
                    <hr></hr>
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>{"  "}
                    <hr></hr>
                    <Button color="info" onClick={() => this.mostrarModalDetalles(dato)}>Detalles</Button>{"  "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Personaje: 
              </label>
              <input
                className="form-control"
                name="content"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.content}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Image: 
              </label>
              <input
                className="form-control"
                name="image"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.image}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalDetalles}>
          <ModalHeader>
           <div><h3>Detalles de Personaje</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Personaje: 
              </label>
              <input
                className="form-control"
                readOnly
                name="content"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.content}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Image: 
              </label>
              <input
                className="form-control"
                readOnly
                name="image"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.image}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalDetalles()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>

      
    );
  }
}

export default Read;
