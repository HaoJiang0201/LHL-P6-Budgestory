import React, { Component } from 'react';
import Category from './Category';
import axios from 'axios';
import '../App/styles/categoryNavbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import { /*OverlayTrigger, Tooltip,*/ Modal, Button, Form } from 'react-bootstrap';
import '../App/styles/categoriesPage.css'
import Back from '../App/picture/back.jpg'
import NavBar from './Navbar.js'



class ModalCreateRecord extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
     this.currentDate = new Date();
  }

  createRecord = (event) => {
    event.preventDefault();
    const newRec = {
      notes: event.target.notes.value,
      category_id: this.props.parentCategory,
      value: Math.round((event.target.value.value*100) * 100) / 100,
      date: event.target.date.value
    }
    axios.post('/newRecord', {newRec}).then((response) => {
      console.log('record Posted')
      this.props.update();
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
     let currentDateString = this.currentDate.toISOString().split('T')[0]
    return (

      <div className='createRecordBtn'>
        <Button id="newBtn" variant="success" /*style={{backgroundColor: '#45c6a0'}}*/ onClick={this.handleShow}>
          New Record
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Record In {this.props.name} </Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form id="record" onSubmit={this.createRecord}>
              <Form.Group controlId="formGroupPassword">
                  <Form.Label>Amount:</Form.Label>
                  <Form.Control type="number" placeholder='$' step='0.01' name='value' />
                </Form.Group>
                <Form.Group controlId="recordDate">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="text" placeholder={currentDateString} name='date' />
            </Form.Group>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Notes:</Form.Label>
                  <Form.Control type="text" placeholder="Where and why did I spend this money?" name='notes' />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" form="record">
                Submit
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
        notes: "",
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
    <div className='createCategoryBtn'>
      <Button id="newBtn" variant="success" /*style={{backgroundColor: '#45c6a0', color: 'black'}}*/ onClick={this.handleShow}>
        New Category
      </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Category In {this.props.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="record" onSubmit={this.createCategory}>
            <Form.Group controlId="formGroupEmail">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter category name" name='name' />
            </Form.Group>
            {/* <Form.Group controlId="formGroupEmail">
            <Form.Label>Category Notes:</Form.Label>
            <Form.Control type="text" placeholder="Enter category notes" name='notes' />
            </Form.Group> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" form="record">
              Submit
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
    this.parentName = "Balance";
    if(props.id >= 0) {
      this.parentName = props.name;
    }
  }

  onItemClick(event) {
    const newGen = event.currentTarget.id
    this.props.updateCurrentGen(newGen);
  }

  render() {

    console.log("render: this.props.id = ", this.props.id);
    let backButton;
    if (this.props.name != "Balance") {
      backButton = (<Button id="backBtn" variant="success" onClick={this.onItemClick}>
        {'<< Back'}
      </Button>);
    } else {
      backButton = (<div className="spaceBtn"> </div>);
    }

    return (
      <div className='currentCategory' id={this.props.id} onClick={this.onItemClick}>
        {/* <div id="currentName">
          <span> {this.props.name} </span>
          <div id="back">
            {"<< Back"}
          </div>
        </div> */}
        {/* <Button id="backBtn" variant="success" onClick={this.onItemClick}>
          {'<< Back'}
        </Button> */}
        {backButton}
        <div className="currentName">
          {/* {this.props.name} */}
          {this.parentName}
        </div>
      </div>
    )
  }
}


class Categories extends Component {

   constructor(props) {
        super(props);
        this.updateCurrentGen = this.updateCurrentGen.bind(this);
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
          records: data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
        })
      );
    }

   render() {
      console.log("Categories >>> render: this.state.parentId = ", this.state.parentId);
      const filteredList = this.findLineage(this.state.parentId);
      console.log("Categories >>> render: filteredList = ",filteredList);
      let categoryList;
      if(filteredList.length === 0) {
        categoryList = <Helper key={-1} id={this.state.parentId} name={"Balance"}  />
      } else {
        categoryList = filteredList.map((category, index) => (
          <Helper onClick={this.onItemClick} updateCurrentGen={this.updateCurrentGen} key={category.parent_id} id={category.parent_id} name={category.name}  />
        ));
      }

    return (
    <div className="categoryPage">
    <NavBar />
      <div className='mostOuterContainer'>
        <div className='topDiv'>
          <div>
            <span> {categoryList} </span>
          </div>
          <div className="click">
            <ModalCreateCategory name={this.state.parentName} parentCategory={this.state.parentId} update={this.refreshAsync.bind(this)}  />
            <ModalCreateRecord name={this.state.parentName} parentCategory={this.state.parentId} update={this.refreshAsync.bind(this)}  />
          </div>
        </div>
        <Category editShow={this.state.showCategoryOptions} toggleCategory={this.toggleCategory.bind(this)} updateCurrentGen={this.updateCurrentGen} state={this.state} update={this.refreshAsync.bind(this)} />
      </div>
    </div>
    );
  }
}

export default Categories;