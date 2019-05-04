import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal, Button, Form } from 'react-bootstrap';

class NewRecord extends React.Component{

  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
    };
    this.currentDate = new Date();
  }

  getPastDate(newDate) {
    let pastDate = new Date();
    pastDate.setDate(newDate.getDate()-30)
    return pastDate;
  }

  createRecord = (event) => {
    event.preventDefault();
    // console.log("event target = ", event.target);
    // console.log("event amount = ", event.target.amount.value);
    // console.log("event date = ", event.target.date.value);
    // console.log("event date = ", event.target.date.placeholder);
    // console.log("event category = ", this.props.category.id);
    // console.log("event notes = ", event.target.notes.value);
    // let date = new Date();
    const newRec = {
      notes: event.target.notes.value,
      category_id: this.props.category.id,
      value: event.target.amount.value*100,
      date: event.target.date.value//date.toISOString().split('T')[0]
    };
    let newRecordDate = new Date(newRec.date);
    let pastDate = this.getPastDate(newRecordDate);
    pastDate.setDate(newRecordDate.getDate()-30);
    console.log("createRecord >>> past = " + pastDate.toISOString().split('T')[0] + ", new = " + newRecordDate.toISOString().split('T')[0]);
    axios.post('/newRecord', {newRec}).then((response) => {
      this.props.update(true, pastDate, newRecordDate);
      this.handleClose();
    })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    let currentDateString = this.currentDate.toISOString().split('T')[0]
    return (
      <div style={{flexDirection: 'row-reverse', padding: '0.4em'}}>
        <Button variant="success" onClick={this.handleShow}>New Record</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new Record in {this.props.category.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="record" onSubmit={this.createRecord}>
            <Form.Group controlId="recordAmount">
              <Form.Label>Amount:</Form.Label>
              <Form.Control type="number" placeholder="$" step='0.01' name='amount' />
            </Form.Group>
            <Form.Group controlId="recordDate">
              <Form.Label>Date:</Form.Label>          
              <Form.Control type="text" placeholder={currentDateString} name='date' />
            </Form.Group>
            <Form.Group controlId="recordNotes">
              <Form.Label>Notes:</Form.Label>
              <Form.Control type="text" placeholder="Where and why did I spent this money?" name='notes' />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" form="record">Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  }
}
export default NewRecord;