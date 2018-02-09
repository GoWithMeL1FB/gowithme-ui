import React, { Component } from 'react';
import { Card, Col, CardTitle } from 'react-materialize';

class otherDateCourse extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const url = `https://i.imgur.com/2KoKbtz.gif`;
    return (
      <Col s={6}>
        <Card className='small'
          header={<CardTitle image={url}>{this.props.itinerary.title}</CardTitle>}
          actions={[<a href="#">More Info</a>, <a href="#">Like</a>]}>
          {this.props.itinerary.owner}
        </Card>
      </Col>
    )
  }
}

export default otherDateCourse;