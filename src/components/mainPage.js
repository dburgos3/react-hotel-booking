import React from 'react'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

class mainPage extends React.Component {
  state = {
    rooms: [],
    checkIn: '',
    checkOut: ''
  }

  setDay = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  showAviability = event => {
    let roomType = event.target.id
    axios
      .get('/api/room/availability', {
        params: {
          type: roomType,
          checkin: this.state.checkIn,
          checkout: this.state.checkOut
        }
      })

      .then(response => {
        this.setState({
          rooms: response.data
        })
      })

      .catch(error => {
        console.log(error)
      })
  }

  makeReserv = event => {
    axios.post('/api/room/reservation', {
      params: {
        id: event.target.name,
        checkin: this.state.checkIn,

        checkout: this.state.checkOut
      }
    })
  }

  updateReserv = event => {
    axios.put('/api/room/reservation', {
      params: {
        id: event.target.name,
        checkin: this.state.checkIn,
        checkout: this.state.checkOut
      }
    })
  }

  DaleteReserv = event => {
    axios.delete('/api/room/reservation', {
      params: {
        id: event.target.name
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Container className='globalContainer'>
          <Row className='marginsContainer'>
            <Col xl={12}>
              <h1>CHotel Booking System</h1>
            </Col>
          </Row>

          <Row className='marginsContainer'>
            <Col>
              <h3>Chekin</h3>
              <input
                type='date'
                value={this.state.checkIn}
                name=''
                id='checkIn'
                onChange={this.setDay}
              />
            </Col>
            <Col>
              <h3>Chekout</h3>
              <input
                type='date'
                value={this.state.checkOut}
                name=''
                id='checkOut'
                onChange={this.setDay}
              />
            </Col>
          </Row>

          <Row className='marginsContainer'>
            <Col xl={12}>
              <Dropdown>
                <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                  Room Type
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href='#/action-1' id='1' value='1' onClick={this.showAviability}>
                    Type 1: Familiar
                  </Dropdown.Item>
                  <Dropdown.Item href='#/action-2' id='2' onClick={this.showAviability}>
                    Type 2: Doubles
                  </Dropdown.Item>
                  <Dropdown.Item href='#/action-3' id='3' onClick={this.showAviability}>
                    Type 3: Singles
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <Row className='marginsContainer'>
            <Col xl>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>Reserved Rooms</h4>
                </ListGroup.Item>
                {this.state.rooms.map(
                  (room, index) =>
                    !room.availability && (
                      <ListGroup.Item key={'un-' + room.id + index}>
                        Room {room.id}{' '}
                        <Button name={room.id} variant='primary' onClick={this.updateReserv}>
                          Edit Reservation
                        </Button>{' '}
                        <Button variant='danger'>Delete Reserv</Button>
                      </ListGroup.Item>
                    )
                )}
              </ListGroup>
            </Col>

            <Col xl>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>Available Rooms</h4>
                </ListGroup.Item>
                {this.state.rooms.map(
                  (room, index) =>
                    room.availability && (
                      <ListGroup.Item key={'av-' + room.id + index}>
                        Room {room.id}
                        <Button
                          variant='success'
                          id='available'
                          name={room.id}
                          onClick={this.makeReserv}>
                          Make Reservation
                        </Button>
                      </ListGroup.Item>
                    )
                )}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default mainPage
