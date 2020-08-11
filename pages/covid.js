import { Form } from 'react-bootstrap'
import React, { useState } from 'react'
import { useRouter } from 'next/router'


// import styles from '../styles/Home.module.css'

export default function Covid() {
  const router = useRouter()
  const [email, setEmail] = useState(process.browser ? localStorage.getItem('covidEmail') :'')
  const [firstName, setFirstName] = useState(process.browser ? localStorage.getItem('covidFirstName') :'')
  const [lastName, setLastName] = useState(process.browser ? localStorage.getItem('covidLastName') :'')
  const [phone, setPhone] = useState(process.browser ? localStorage.getItem('covidPhone') :'')
  const [optIn, setOptIn] = useState(false)
  const [party, setParty] = useState(1)
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
    }
  }
  const handleSubmitForm = (e) => {
    e.preventDefault()
    const data ={email, firstName, lastName, phone, optIn, party, date: new Date()}
    const payload ={text: JSON.stringify(data), channel: 'thainine'}
    fetch(process.env.NEXT_PUBLIC_SLACK_HOOK_URL, {
      method: 'post',
      body: JSON.stringify(payload)
    }).then((res) => {
      localStorage.setItem('covidEmail', email);
      localStorage.setItem('covidFirstName', firstName);
      localStorage.setItem('covidLastName', lastName);
      localStorage.setItem('covidPhone', phone);
      router.push('/thankyou')
    })
  }
  return (
    <section className='section-covid'>
      <div className='u-center-text u-margin-bottom-med'>
        <h2 className='heading-secondary u-margin-bottom-small'>
          COVID-19 Sign In
        </h2>
        <p className='paragraph-secondary px-4'>
          For all customers we are obligated to take some of your details so the
          government can track any COVID-19 outbreaks in out community.
        </p>
        <p className='paragraph-secondary px-4'>
          Please enter your details below to help prevent the spreading of
          COVID-19
        </p>
      </div>
      <div className='section-covid__form form-container u-margin-bottom-big'>
        <Form className='form'>
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
          <Form.Group controlId='formFirstName' className='u-margin-bottom-med'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className='paragraph-secondary'
              type='text'
              onChange={handleInputChange}
              value={firstName}
            />
          </Form.Group>
          <Form.Group controlId='formLastName' className='u-margin-bottom-med'>
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
              type='text'
              onChange={handleInputChange}
              value={phone}
            />
          </Form.Group>
          <Form.Group controlId='formParty' className='u-margin-bottom-med'>
            <Form.Label>Number of people in the group</Form.Label>
            <Form.Control
              className='paragraph-secondary'
              type='number'
              defaultValue='1'
              onChange={handleInputChange}
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
          <button
            type='submit'
            className='btn btn--main btn--animated paragraph-secondary'
            onClick={handleSubmitForm}>
            Submit
          </button>
        </Form>
      </div>
    </section>
  )
}
