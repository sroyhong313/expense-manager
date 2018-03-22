// clients/components/App.js

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/App.css';
import {Tab, Tabs} from 'react-bootstrap';

import YearTabsRouter from './tabs/yearTabsRouter';
import MonthTabs from './tabs/monthTabs';

import Add from './Add';
import Update from './Update';
import Delete from './Delete';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMonth : 'All',
      selectedYear : 2016,
      data : [],
      activeTab : 2016
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this, 2016, 'All');
  }

  /*
   * we will need to render this component in the App component and fetch the data from the server
   * using the prop sent from YearTabsRouter. The new props will be received in the componentWillReceiveProps()
   * method. We will make a call to the server and reload the table using the year received as a prop
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.history.location.search) {
      var search = nextProps.history.location.search;
      search = search.substring(1);
      var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"')
                                 .replace(/&/g, '", "').replace(/=/g, '":"') + '"}');
      this.setState({ activeTab : parseInt(searchObj.year) })
      this.setState({ selectedYear : parseInt(searchObj.year) })
      this.setState({ selectedMonth : parseInt(searchObj.month) })
      this.getData(this, searchObj.year, searchObj.month);
    } else {
      this.getData(this, 2016, 'All');
    }
  }

  handleSelect(selectedTab) {
    this.setState({
      activeTab : selectedTab,
      selectedYear : selectedTab
    });
  }

  // get all expenses from database using /getAll
  getData(ev, year, month) {
    axios.get('/getAll?month=' + month + '&year=' + year)
      .then(function(resp) {
        ev.setState({ data : resp.data });
        ev.setState({ selectedYear : parseInt(year) });
        ev.setState({ selectedMonth : parseInt(month) });
      });
  }

  render() {
    return (
      <div>
        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
          <Tab eventKey={2016} title={<YearTabsRouter year='2016' />}>
            <MonthTabs year='2016' monthlyActiveTab={this.state.selectedMonth} />
          </Tab>
          <Tab eventKey={2017} title={<YearTabsRouter year='2017' />}>
            <MonthTabs year='2017' monthlyActiveTab={this.state.selectedMonth} />
          </Tab>
          <Tab eventKey={2018} title={<YearTabsRouter year='2018' />}>
            <MonthTabs year='2018' monthlyActiveTab={this.state.selectedMonth} />
          </Tab>
          <Tab eventKey={2019} title={<YearTabsRouter year='2019' />}>
            <MonthTabs year='2019' monthlyActiveTab={this.state.selectedMonth} />
          </Tab>
          <Tab eventKey={2020} title={<YearTabsRouter year='2020' />}>
            <MonthTabs year='2020' monthlyActiveTab={this.state.selectedMonth} />
          </Tab>
        </Tabs>
        <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
          <table>
            <thead>
              <tr>
                <th></th>
                <th className="desc-col">Description</th>
                <th className="button-col">Amount</th>
                <th className="button-col">Month</th>
                <th className='button-col'>Year</th>
                <th className="button-col">Update</th>
                <th className="button-col">Delete</th>
              </tr>
            </thead>
          <tbody>
            {
              this.state.data.map(function(exp) {
                return (
                  <tr>
                    <td className="counterCell"></td>
                    <td className='desc-col'>{exp.description}</td>
                    <td className='button-col'>{exp.amount}</td>
                    <td className='button-col'>{exp.month}</td>
                    <td className='button-col'>{exp.year}</td>
                    <td className="button-col">
                      <Update expense={exp} />
                    </td>
                    <td className="button-col">
                      <Delete id={exp._id} expense={exp} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;