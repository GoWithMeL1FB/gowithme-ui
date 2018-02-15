import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Events from '../../global/Events/Events.jsx';

import { DropTarget, DragDropContainer } from 'react-drag-drop-container';
import { Row, Col, Icon, Button, Card } from 'react-materialize';
import url from '../../../../config';

import './DropBox.css';

class DropBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dateCourse: [],
      dateCourseID: ''
    };
    this.saveDateCourseEntry = this.saveDateCourseEntry.bind(this);
    this.addEventToDataCourse = this.addEventToDataCourse.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  saveDateCourseEntry = () => {
    let payload = {
      title: this.props.dateCourseInfo.title,
      description: this.props.dateCourseInfo.description,
      image: null,
      owner: 'David'
    }
    
    
      // console.log('payload for making dateCourse,' payload);
    axios.post(`${url.eventServer}/api/itinerary/createItinerary`, payload)
      .then((data) => {
        let dataCourseID = data;
        // console.log('dataCourse', dataCourseID)
        this.setState({
          dateCourseID: dateCourseID.data._id
        })
      })
      .catch ((err) => {
       console.log('err:', err);
      })

    this.state.dateCourse.forEach(event => {
      // console.log('dataId:', this.state.dateCourseID, 'event:', event.dragData.venue.id)
      this.addEventToDataCourse(this.state.dateCourseID, event.dragData.venue.id)
    })
  }

  addEventToDataCourse = async (eID, itiID) => {
    let payload = {
      eventId: eID,
      itineraryId: itiID
    }

    axios.post(`${url.eventServer}/api/itinerary/addEventToItinerary`, payload)
      .then(res => {
        console.log("events added to the dataCourse", res);
      })
      .catch(err => {
        console.log("events NOT added to the datacourse", err);
    })
  }

  handleDrop = (e) => {
    this.state.dateCourse.push(e);
    // console.log('state from handle drop', this.state)
    this.setState({dateCourse: this.state.dateCourse});
  }

  render () {
    return(
      <div id="fixedElement">
      <Card className="grey lighten-3">
      <Row className="container">
        <Col s={12}>
        <div id="scroll">
        {
        this.state.dateCourse.map((v) => {
          // console.log(v);
          let venue = v.dragData.venue;
          let pObj = v.dragData.venue;

          return (
          <div key={venue.id}>
          <DragDropContainer
            item={venue}
            returnToBase={true}
            dragData={{
              venue: venue
            }}
            >
            <Events
              id={venue.id}
              name={venue.name}
              address={venue.location}
              category={venue.description}
              prefix={venue.prefix}
              suffix={venue.suffix}
            />
          </DragDropContainer>
          </div>
          )
        })
        }
        </div>
        <center>
        <DropTarget
          dropData={{
            venue: this.props.venue
          }}
          onHit={this.handleDrop}
          >
          <Icon large>add_to_photos</Icon>
        </DropTarget>
        </center>

        </Col>
        <Col s={12}>
          <Button onClick={this.saveDateCourseEntry}>
            Save
          </Button>
        </Col>
      </Row>
    </Card>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dateCourseInfo: state.dateCourseInfo
  }
}

export default connect(mapStateToProps)(DropBox);