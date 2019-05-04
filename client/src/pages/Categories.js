import React, { Component } from 'react';
import Category from './Category';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { OverlayTrigger, Tooltip, Modal, Button, Form } from 'react-bootstrap';
import '../App/styles/categoriesPage.css'

class ModalDeleteCategory extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

   deleteCategory = (event) => {

       const delCat = {
        id: this.props.currentCategory
       }

       axios.post('/api/deleteCategory', {delCat}).then((response) => {
        console.log('delete Category route works', response)
        this.props.update()
        this.props.closeCategoryWindow()
      })

    }

    render() {
    return (
      <div style={{marginLeft: 'auto', padding: '0.4em'}}>
        <Button variant="danger" onClick={this.handleShow}>
          Delete Category
        </Button>
         <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Warning:</Modal.Title>
          </Modal.Header>
            <Modal.Body>
            If you delete a category it will delete ALL records and categories nested within that category
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.props.deleteMethod}>
                Delete {this.props.name}
              </Button>
            </Modal.Footer>
        </Modal>
      </div>
  );
}



}


class ModalCreateRecord extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  createRecord = (event) => {
    event.preventDefault();
    const newRec = {
      notes: event.target.notes.value,
      category_id: this.props.parentCategory,
      value: event.target.value.value*100
    }
    axios.post('/newRecord', {newRec}).then((response) => {
      console.log('record Posted')
      this.props.update()
      this.handleClose();
    })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    let categoryID = parseInt(this.props.parentCategory, 10)
    if(categoryID !== 0 ) {
      this.setState({ show: true });
    }
    
  }

  render() {
    return (
      <div style={{flexDirection: 'row-reverse', padding: '0.4em'}}>
        <Button variant="success" onClick={this.handleShow}>
          Create Record
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Record</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form id="record" onSubmit={this.createRecord}>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Notes about record:</Form.Label>
                  <Form.Control type="text" placeholder="Notes..." name='notes' />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>Amount:</Form.Label>
                  <Form.Control type="number" step='0.01' name='value' />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" form="record">
                Create Record
              </Button>
            </Modal.Footer>
        </Modal>
      </div>
  );

}
}

class ModalCreateCategory extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  createCategory = (event) => {
    event.preventDefault();

       const newCat = {
        name: event.target.name.value,
        notes: event.target.notes.value,
        parent_id: this.props.parentCategory
       }

      axios.post('/newCategory', {newCat}).then((response) => {
      this.props.update()
      this.handleClose();
      })
   }



  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    let categoryID = parseInt(this.props.parentCategory, 10)
    if(categoryID !== 0){
      this.setState({ show: true });
    }
  }

render() {

  return (
    <div style={{marginLeft: 'auto', padding: '0.4em'}}>
      <Button variant="success" onClick={this.handleShow}>
        Create Category
      </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a sub category within {this.props.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="record" onSubmit={this.createCategory}>
            <Form.Group controlId="formGroupEmail">
            <Form.Label>Category Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter category name" name='name' />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
            <Form.Label>Category Notes:</Form.Label>
            <Form.Control type="text" placeholder="Enter category notes" name='notes' />
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" form="record">
              Create Category
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );

  }

}

class Helper extends Component {
  constructor(props) {
    super();
    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(event) {
    const newGen = event.currentTarget.id
    this.props.updateCurrentGen(newGen);
  }

  render() {
    return (

         <div id={this.props.id} onClick={this.onItemClick} style={{flexDirection: 'row', border:'3px #03A678 solid', padding: '0.5em', margin: '0.5em', borderRadius: '10px' }}>
           <span> Current Category: {this.props.name} </span>
           <br></br>
           <span> Click to go back </span>
          </div>
          )
  }
}


class Categories extends Component {

   constructor(props) {
        super(props);
        this.updateCurrentGen = this.updateCurrentGen.bind(this);
        // this.onItemClick = this.onItemClick.bind(this);
        this.findLineage = this.findLineage.bind(this);
        this.state = {
          showCategoryOptions: false,
          categories: [],
          records: [],
          parentId: 0,
          parentName: null,
          currentCategory: null,
          currentCatName: null
        }
    }

  toggleCategory = (x,y) => {

    this.setState({
      currentCategory: x,
      currentCatName: y,
      showCategoryOptions: !this.state.showCategoryOptions
    });

  }

    updateCurrentGen(setGen, setName){
      this.setState({
        parentId: setGen,
        parentName: setName
      })
      this.refreshAsync()

    }

    findLineage(currentGen){
      let lineage = []
      let check = currentGen;

      this.state.categories.forEach(category => {
        if(category.id === parseInt(check, 10)){
          check = category.parent_id
          lineage.push(category)
          return
        }
      })
      return lineage.reverse()
    }

    // event.currentTarget.name

    // onItemClick(event) {
    //   const newGen = event.currentTarget.id
    //     this.updateCurrentGen(newGen);

    // }

    refreshAsync(){
      this.getCategory();
      this.getRecords();
    }

    componentDidMount() {
      this.getCategory();
      this.getRecords();
    }

    getCategory = () => {
      fetch('/api/getCategories')
      .then(res => res.json())
      .then(
        ({data}) =>
        this.setState({
          categories: data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
        })
      );
    }

    getRecords = () => {
      fetch('/api/getRecords')
      .then(res => res.json())
      .then(
        ({data}) =>
        this.setState({
          records: data
        })
      );
    }

   render() {

      const filteredList = this.findLineage(this.state.parentId)
      const categoryList = filteredList.map((category, index) => (
        <Helper onClick={this.onItemClick} updateCurrentGen={this.updateCurrentGen} key={category.parent_id} id={category.parent_id} name={category.name}  />
      ))

    return (
    <div className="categoryPage">
      <h1>Your Categories</h1>

      <div style={{backgroundColor: '#dce1ea', margin: '0 auto', border: '4px #D99789 solid', width: '80%', borderRadius: '10px'}}>
        <div style={{backgroundColor: 'rgba(255,255,255,0.75)', display: 'flex', flexWrap: 'wrap', borderBottom: '5px #D99789 solid'}}>
                {categoryList}
                  <ModalCreateCategory name={this.state.parentName} parentCategory={this.state.parentId} update={this.refreshAsync.bind(this)} style={{marginLeft: 'auto'}} />
                  <ModalCreateRecord parentCategory={this.state.parentId} update={this.refreshAsync.bind(this)} style={{marginLeft: 'auto'}} />

        </div>
        <Category editShow={this.state.showCategoryOptions} toggleCategory={this.toggleCategory.bind(this)} updateCurrentGen={this.updateCurrentGen} state={this.state} update={this.refreshAsync.bind(this)} />
      </div>
    </div>
    );
  }
}

export default Categories;