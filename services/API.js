import axios from 'axios'
import { useQuery } from 'react-query'

export const client = axios.create({
  baseURL: '',
  timeout: 30000
})

//  ****** no auths needed  *******//

const getMenuItems = () => {
  return client.get(`/api/menuitems`).then((res) => res.data)
}

function menuItemQuery() {
  return useQuery('menuitems', () => getMenuItems())
}

const addBooking = (reservation) => {
  return client.post('/api/addBooking', { reservation }).then((res) => res.data)
}

const getBooking = (bookingId) => {
  return client
    .get(`/api/getBooking?bookingId=${bookingId}`)
    .then((res) => res.data)
}

const checkin = (checkin) => {
  return client.post('/api/checkin', { checkin }).then((res) => res.data)
}

const getBookingSetup = (date) => {
  return client.get(`/api/getBookingSetup?date=${date}`).then((res) => res.data)
}

const addOrder = (cart) => {
  return client.post('/api/addOrder', { cart }).then((res) => res.data)
}

const getOrder = (orderId) => {
  return client
    .get(`/api/getOrder?orderId=${orderId}`)
    .then((res) => res.data)
}

const sendOrderEmail = (orderId) => {
  return client
    .get(`/api/sendOrderEmail?orderId=${orderId}`)
    .then((res) => res.data)
}

const getBusinessHours = () => {
  return client.get(`/api/businessHours`).then((res) => res.data)
}

function businessHours() {
  return useQuery('businessHours', () => getBusinessHours())
}

const getDateConfig = (date) => {
  return client.get(`/api/getDateConfig?date=${date}`).then((res) => res.data)
}

function dateConfig(date) {
  return useQuery(['dateConfig', date], () => getDateConfig(date))
}

export default {
  getMenuItems,
  addBooking,
  checkin,
  getBooking,
  getBookingSetup,
  addOrder,
  getOrder,
  sendOrderEmail,
  menuItemQuery,
  businessHours,
  dateConfig
}
