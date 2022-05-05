import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from 'sweetalert2';
import { Button, Container, FormGroup } from "reactstrap";

const data = [{ 
  id: 1, content: "The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary.", image: "accespoint-6jgphxd4zccwqoo867aqw3qorr3unuse1a-s3alias" },
{ id: 2, content: "The languages only differ in their grammar, their pronunciation and their most common words.", image: "accespoint-6jgphxd4zccwqoo867aqw3qorr3unuse1a-s3alias" },
{ id: 3, content: "Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words.", image: "accespoint-6jgphxd4zccwqoo867aqw3qorr3unuse1a-s3alias" },
{ id: 4, content: "If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages.", image: "accespoint-6jgphxd4zccwqoo867aqw3qorr3unuse1a-s3alias"},
{ id: 5, content: "The new common language will be more simple and regular than the existing European languages.", image: "accespoint-6jgphxd4zccwqoo867aqw3qorr3unuse1a-s3alias" },];
const fileTypes = ["JPG", "PNG", "GIF"];
window.Swal = swal;

class Create extends React.Component {
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
      showConfirmButton: true,
      confirmButtonText: 'Confirm!'
    }).then((result) => {
      if (result.isConfirmed) {
    window.location.href = "/Notes";
      }
  })
};

  cancelB(){
    window.location.href = "/";
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
           <div><h3>Create Note</h3></div>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data[this.state.data.length-1].id+1}
                
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Content: 
              </label>
              <textarea
                className="form-control"
                name="content"
                type="text"
                onChange={this.handleChange}
                required/>
            </FormGroup>
            <div>
          <form>
            <table>
              <tr>
                <td>Select File :</td>
              </tr>
              <tr>
              <input onChange={this.onFileChange} type="file" formNoValidate/>
              </tr>
            </table>
            <hr></hr>
          </form>
        </div>
            <Button color="primary" onClick={() => this.insertar()}>Submit</Button>{" "}
            <Button className="btn btn-danger" onClick={() => this.cancelB()}>Cancel</Button>
            </Container>
      </>

      
    );
  }
}

export default Create;
