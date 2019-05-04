import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import '../App/styles/compare.css'
import isAfter from 'date-fns/isAfter'
import '../App/styles/home.css'
class DateRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.date.startDate,
      endDate: this.props.date.endDate
    };
  }

  getCalenderDate() {
    let startDate = new Date();
    startDate.setDate(startDate.getDate()-30)
    return startDate;
  }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;
    if (isAfter(startDate, endDate)) {
      endDate = startDate
    }
    this.setState({ startDate, endDate });
  };

  handleChangeStart = startDate => this.handleChange({ startDate });

  handleChangeEnd = endDate => this.handleChange({ endDate });

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps props >>> start: " + props.date.startDate.toISOString().split('T')[0] + ", end: " + props.date.endDate.toISOString().split('T')[0]);
    console.log("getDerivedStateFromProps state >>> start: " + state.startDate.toISOString().split('T')[0] + ", end: " + state.endDate.toISOString().split('T')[0]);

    if(props.date.init) {
      return {
        startDate: props.date.startDate,
        endDate: props.date.endDate,
      };
    } else {
      return {
        startDate: state.startDate,
        endDate: state.endDate,
      };
    }
  }

  passDateToHome = (start, end) => {
    let startCalender = start;
    let endCalender = end;
    startCalender.setDate(startCalender.getDate() - 1);
    endCalender.setDate(endCalender.getDate() - 1);
    console.log("passDateToHome >>> start: " +  startCalender.toISOString().split('T')[0] + ", end: " + endCalender.toISOString().split('T')[0]);
    this.props.refreshDate(false, startCalender, endCalender);
  }

  componentDidMount() {
    this.passDateToHome(this.state.startDate, this.state.endDate);
  }

  render() {

    const updateChart = evt => {
      evt.preventDefault();
      this.passDateToHome(this.state.startDate, this.state.endDate);
    };

    return (
      <div className = 'row'>
        <pre className = 'column example__code'>
          <code className = 'jsx'>
          </code>
        </pre>
        <div className = 'column calender-area'>
          Start:&ensp;
          <DatePicker
            // dateFormat="yyyy-MM-dd"
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}

          />&ensp;End:&ensp;

          <DatePicker
            // dateFormat="yyyy-MM-dd"
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
          />
        </div>
        <form onSubmit={updateChart}>
          <button className="update-btn" id="update" type="submit"></button>
        </form>
      </div>
    );
  }
}

export default DateRange