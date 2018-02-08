import React, { Component } from 'react';
import { Card, Col } from 'react-materialize';

import Featured from './featuredDateCourse/featuredDateCourse.jsx'
import OtherDateCourse from './otherDateCourse/otherDateCourse.jsx';

class HomeView extends Component {
  constructor() {
    super();
    this.state = {
      events: [{title:'Event 1\'s Title', desc:'Descprition of event 1'},{title:'Event 2\'s Title', desc:'Desccription of event 2'}]
    }
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    // get all events
  }

  // onClick for getting more event information
  onClickHandler() {
    // do something...like show info? or re-router?
  }

  render() {
    constructor() {
      super()
      this.state = {
        events: [{title: 'first event', description: 'asldkgj'}];
      }
    }
    return (
      <div>
        <Featured />
        {
          this.state.events.map((event, index) => (
            <OtherDateCourse
              event={event}
              key={index}
              onClick={this.onClickHandler}
            />
          ))
        }
      </div>
    )
  }
}

export default HomeView;