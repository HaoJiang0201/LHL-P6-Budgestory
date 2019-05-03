import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import Highchart from './Highchart'
import DateRange from './datepicker.js'
import '../App/styles/home.css'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        series: [],
        drilldown: {
          series: []
        }
      }
    }
  }

  refreshDate = (startDate, endDate) => {
    let startDateString = "2019-01-01";
    let endDateString = "2019-05-09";
    if(startDate){
      startDateString = startDate.toISOString().split('T')[0]
    }
    if(endDate){
      endDateString = endDate.toISOString().split('T')[0]
    }
    axios('/api/HomeChart', {
      params: {
        start: startDateString,
        end: endDateString
      }
    })
    .then(
      ({data}) => {
        this.setState({
          options: {
            series: data.series,
            drilldown: data.drilldown
          }
        });
      }
    ).catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
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

    return (
      <div>
        <nav className="navbar">
          <div id="logo">
            <img src={require("../App/picture/logo.png")} height="35px" />
            <a href="/" className="navbar-brand">BudgeStory</a>
          </div>
          <div className="contents">
            <div id="comparePage">
              <a href="/compare">Compare</a>
            </div>
            <div id="categoryPage">
              <a href="/categories">Category</a>
            </div>
            <div id="userInfo">
              Blah
            </div>
          </div>
        </nav>
      <div className="App">
        <div className="container">
          <div className="add_new_btns">
            <form onSubmit={newExpenses}>
              <button className="add-expenses-btn" id="expense" type="submit">+ New Expenses</button>
            </form>
            <form onSubmit={newIncomes}>
              <button className="add-incomes-btn" id="income" type="submit">+ New Incomes</button>
            </form>
            <div className='date update_area'>
              <DateRange refreshDate={this.refreshDate.bind(this)}/>

            </div>
          </div>
        <Highchart type={"pie"} options={this.state.options}/>
        </div>
      </div>
      </div>
    );
  }
}
export default Home;