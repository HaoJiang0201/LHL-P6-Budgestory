import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Highchart from './Highchart'
import Date from './datepicker.js'
import '../App/styles/home.css'



class Home extends Component {

      constructor(props) {
        super(props);
        this.state = {
          options: {
            chart: {
              type: 'pie'
            },
            credits: {
              enabled: false
            },
            title: {
              text: 'My Expenses'
            },
            series: [
              { data: [1, 2, 3] }
            ]
          }
        }
      }

    retrieveValues(records){
      let outputArray = [];
      let outputObject = {};
      outputObject.data = records.map(x => x.value);
      outputArray.push(outputObject);
      return outputArray;
    }

    getList = () => {
      fetch('/api/getRecords')
      .then(res => res.json())
      .then(
        ({data}) =>
        this.setState({
          options: {
            series: this.retrieveValues(data)
          }
        })
      );
    }

    componentDidMount() {
      this.getList();
    }



  render() {
    const newExpenses = evt => {
      evt.preventDefault();
      alert("New Expenses!");
    };
    const newIncomes = evt => {
      evt.preventDefault();
      alert("New Incomes!")
    };
    const updateChart = evt => {
      evt.preventDefault();
      alert("Update based on date selected!")
    };
    return (
      <div className="App">
        <div id="logo">
          <h1>Budgestory</h1>
        </div>
        <div className="container">
          <div className="add_new_btns">
            <form onSubmit={newExpenses}>
              <button className="add-expenses-btn" id='expense' type="submit">+ New Expenses</button>
            </form>
            <form onSubmit={newIncomes}>
              <button className="add-incomes-btn" id='income' type="submit">+ New Incomes</button>
            </form>
            <div className='date update_area'>
              <Date />
              <form onSubmit={updateChart}>
                <button className="update-btn" id='update' type="submit">Update</button>
              </form>
            </div>
          </div>
            <Highchart type={"pie"}/>
          </div>
      </div>
    );
  }
}
export default Home;