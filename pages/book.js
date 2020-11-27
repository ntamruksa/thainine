import { Form, Button, Container, FormControl, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DayPicker, { DateUtils } from 'react-day-picker'
import moment from 'moment'
import api from '../services/API'

export default function Book() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [optIn, setOptIn] = useState(false)
  const [party, setParty] = useState(2)
  const [showTime, setShowTime] = useState(false)
  const [note, setNote] = useState(undefined)
  const [isValid, setIsValid] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [blockedTimeList, setBlockedTimeList] = useState({blockedTime: [], isDateBlocked: false})
  const [errorMessage, setErrorMessage] = useState(null)
  const timeList = [
    { id: 530, label: '5:30 pm' },
    { id: 545, label: '5:45 pm' },
    { id: 600, label: '6:00 pm' },
    { id: 615, label: '6:15 pm' },
    { id: 630, label: '6:30 pm' },
    { id: 645, label: '6:45 pm' },
    { id: 700, label: '7:00 pm' },
    { id: 715, label: '7:15 pm' },
    { id: 730, label: '7:30 pm' },
    { id: 745, label: '7:45 pm' },
    { id: 800, label: '8:00 pm' },
    { id: 815, label: '8:15 pm' },
    { id: 830, label: '8:30 pm' },
    { id: 845, label: '8:45 pm' },
    { id: 900, label: '9:00 pm' },
    { id: 915, label: '9:15 pm' },
    { id: 930, label: '9:30 pm' }
  ]
  useEffect(() => {
    const validPhoneNumber = (n) =>
      n.toString().length === 10 && n.toString().substring(0, 2) === '04'
    if (date === null) {
      setIsValid(false)
      setErrorMessage('Please select date')
    } else if (time === null) {
      setIsValid(false)
      setErrorMessage('Please select time')
    } else if (!firstName) {
      setIsValid(false)
      setErrorMessage('First Name is required')
    } else if (!phone || !validPhoneNumber(phone)) {
      setIsValid(false)
      setErrorMessage('Valid Phone Number is Required')
    } else {
      setIsValid(true)
      setErrorMessage('')
    }
  }, [phone, date, time, firstName])

  useEffect(() => {
    async function fetchData() {
      const {blockedTime, isDateBlocked} = await api.getBookingSetup(moment(date).format('DD-MM-yyyy'))
      setBlockedTimeList({blockedTime, isDateBlocked})
    }
    fetchData()

  }, [date])

  const handleInputChange = (e) => {
    const value = e.target.value
    if (e.target.id === 'formBasicEmail') {
      setEmail(value)
    } else if (e.target.id === 'formFirstName') {
      setFirstName(value)
    } else if (e.target.id === 'formLastName') {
      setLastName(value)
    } else if (e.target.id === 'formPhone') {
      setPhone(value)
    } else if (e.target.id === 'formBasicOptIn') {
      setOptIn(e.target.checked)
    } else if (e.target.id === 'formParty') {
      setParty(value)
    } else if (e.target.id === 'formNote') {
      setNote(value)
    }
  }
  const handleTimeChange = (e) => {
    setTime(e.target.value)
  }

  const handleDateChange = (e, { disabled }) => {
    setDate(e)
    setTime(null)
    disabled ? setShowTime(false) : setShowTime(true)
  }
  const handleSubmitForm = (e) => {
    e.preventDefault()
    setIsValid(false)
    setIsLoading(true)
    const reservation = {
      email,
      firstName,
      lastName,
      phone,
      optIn,
      party,
      date: moment(date).format('ddd DD MMM YYYY'),
      time,
      note
    }
    const text = `${party} persons on ${moment(date).format(
      'ddd DD MMM YYYY'
    )} ${time} Name: ${firstName} ${lastName} Phone: <tel:${phone}> ${
      note ? ', Special request: ' + note : ''
    }`
    const payload = {
      text,
      channel: 'thainine-reservation'
    }
    fetch(process.env.NEXT_PUBLIC_SLACK_HOOK_URL, {
      method: 'post',
      body: JSON.stringify(payload)
    })
      .then((res) => {
        api
          .addBooking(reservation)
          .then((bookingRes) => {
            setIsValid(true)
            setIsLoading(false)
            router.push({
              pathname: '/thankyou-booking',
              query: { bookingId: bookingRes.insertedId }
            })
          })
          .catch((err) => {
            console.error(err)
            setErrorMessage(err.message)
            setIsLoading(false)
            setIsValid(true)
          })
      })
      .catch((err) => {
        console.error(err)
        setErrorMessage(err.message)
        setIsLoading(false)
        setIsValid(true)
      })
  }
  const monday = {
    daysOfWeek: [1]
  }
  const past = {
    before: new Date()
  }

  return (
    <Container>
      <section className='section-book'>
        <div className='u-center-text u-margin-bottom-small'>
          <h2 className='heading-secondary'>
            Book a table
          </h2>
        </div>
        <div className='section-covid__form form-container u-margin-bottom-big'>
          <Form className='form'>
            <Form.Group controlId='formParty' className='u-margin-bottom-med'>
              <Form.Label>Party Size</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='number'
                defaultValue='2'
                onChange={handleInputChange}
                value={party}
                as='select'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              controlId='formDate'
              className='u-margin-bottom-med text-center'>
              {/* <Form.Label>Select Date</Form.Label> */}
              <DayPicker
                selected={date}
                onDayClick={handleDateChange}
                value={date}
                disabledDays={[monday, past]}
              />
            </Form.Group>
            {/* {showTime && (
              <Form.Group>
                <Form.Label>
                  Select time for {moment(date).format('DD MMM YYYY')}
                </Form.Label>
                <TimePicker
                  className='form-control'
                  showSecond={false}
                  onChange={setTime}
                  format='HH:mm'
                  inputReadOnly
                  value={time}
                  allowEmpty={false}
                  disabledHours={disabledHours}
                  disabledMinutes={disabledMinutes}
                  minuteStep={15}
                />
              </Form.Group>
            )} */}
            {showTime && (
              <Form.Group>
                <Form.Label>
                  Select time for {moment(date).format('DD MMM YYYY')}
                </Form.Label>
                <ToggleButtonGroup size="lg" className="m-2 flex-wrap" name="time" >
                  {timeList.map(t => {
                    if (blockedTimeList.isDateBlocked)
                    {
                      return (<ToggleButton name="time" variant='outline-success' className="btn m-2 flex-grow-0" disabled value={t.label} key={t.label}>{t.label}</ToggleButton>)
                    } else if (blockedTimeList.blockedTime && blockedTimeList.blockedTime.includes(t.id)) {
                      return (<ToggleButton name="time" variant='outline-success' className="btn m-2 flex-grow-0" disabled value={t.label} key={t.label}>{t.label}</ToggleButton>)
                    } else {
                      return (
                        <ToggleButton name="time" variant='outline-success' className="btn m-2 flex-grow-0" onClick={handleTimeChange} value={t.label} key={t.label}>{t.label}</ToggleButton>
                      )
                    }

                  })}
                </ToggleButtonGroup>
              </Form.Group>
            )}
            <Form.Group
              controlId='formFirstName'
              className='u-margin-bottom-med'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='text'
                onChange={handleInputChange}
                value={firstName}
                required
              />
            </Form.Group>
            <Form.Group
              controlId='formLastName'
              className='u-margin-bottom-med'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='text'
                onChange={handleInputChange}
                value={lastName}
              />
            </Form.Group>
            <Form.Group controlId='formPhone' className='u-margin-bottom-med'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='number'
                onChange={handleInputChange}
                value={phone}
                required
              />
            </Form.Group>
            <Form.Group
              controlId='formBasicEmail'
              className='u-margin-bottom-med'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='email'
                onChange={handleInputChange}
                value={email}
              />
            </Form.Group>
            <Form.Group controlId='formNote' className='u-margin-bottom-med'>
              <Form.Label>Special Request</Form.Label>
              <Form.Control
                className='paragraph-secondary'
                type='text'
                onChange={handleInputChange}
                value={note}
              />
            </Form.Group>
            <Form.Group
              controlId='formBasicOptIn'
              className='u-margin-bottom-med'>
              <Form.Check
                className='form-checkbox paragraph'
                type='checkbox'
                label={`I'd like to receive marketing communications from this venue`}
                onClick={handleInputChange}
              />
            </Form.Group>
            {errorMessage && (
              <div className='mt-4 alert alert-danger' role='alert'>
                {errorMessage}
              </div>
            )}
            <Button
              className='btn-lg'
              variant='outline-secondary'
              onClick={handleSubmitForm}
              disabled={!isValid}>
              Submit
            </Button>
          </Form>
        </div>
      </section>
    </Container>
  )
}
