// client/components/tabs/yearTabsRouter.js

/* returns a Link that renders the App component
   (using the route we created earlier) with year
   sent in as a prop in search. Whenever this link will be clicked,
   App will be rendered and the expenses of the year sent in search will be loaded
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class YearTabsRouter extends React.Component {
    constructor() {
        super();
        this.state = {
            style : { 'fontSize' : '16px'}
        }
    }

    render() {
        return (
            <Link to= {{ pathname : '/', search : '?month=All&year='+ this.props.year }}>
                <p style={this.state.style}>{this.props.year}</p>
            </Link>
        )
    }
}

export default YearTabsRouter;