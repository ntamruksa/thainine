import React from 'react'
import { Form } from 'react-bootstrap'
import InfoMessageModal from '../modal/InfoMessageModal'
class AddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.widget = null
    this.state = {
      cannotDelivery: false,
      validSuburb: ['CASTLECRAG', 'MIDDLE COVE', 'CASTLE COVE', 'NORTHBRIDGE', 'WILLOUGHBY', 'ROSEVILLE CHASE']
    }
    this.loadWidget = this.loadWidget.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
  }

  componentDidMount() {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://api.addressfinder.io/assets/v3/widget.js'
    script.async = true
    script.onload = this.loadWidget
    document.body.appendChild(script)
  }

  componentWillUnmount() {
    if (this.widget) {
      this.widget.destroy()
      this.widget = null
    }
  }

  handleClose() {
    this.setState({cannotDelivery: false})
  }
  handleShow() {
    this.setState({cannotDelivery: true})
  }

  loadWidget() {
    this.widget = new AddressFinder.Widget(
      document.getElementById('address_full'),
      process.env.NEXT_PUBLIC_ADDRESSFINDER_KEY,
      'AU',
      {
        address_params: {
          paf: '1',
        },
      }
    )

    this.widget.on('result:select', (fullAddress, metaData) => {
      // You will need to update these ids to match those in your form
      // this.props.binding.onChange(fullAddress)
      console.log(metaData, fullAddress)
      let e = {}
      if (this.state.validSuburb.includes(metaData.locality_name) && metaData.state_territory === 'NSW'){
        e = {target: {id: 'address_full'}, fullAddress, metaData}
      } else {
        e = {target: {id: 'address_full'}, fullAddress: '', metaData: undefined}
        this.handleShow()
      }
      this.props.onChange(e)

      // if (this.props.metaDataBinding) {
      //   this.props.metaDataBinding.onChange(metaData)
      // }
    })
  }

  render() {
    return (
      <>
      <InfoMessageModal message={'We cannot delivery to your address, please select pickup option instead.'} show={this.state.cannotDelivery} onHide={this.handleClose}/>
      <Form.Group controlId='formPickupName' className='u-margin-bottom-med'>
        <Form.Label>Delivery Address</Form.Label>
        <Form.Control
          id='address_full'
          className='paragraph-secondary'
          type='text'
          placeholder='Search address here...'
          value={this.props.address}
          onChange={this.props.onChange}
        />
      </Form.Group>
      </>
    )
  }
}

export default AddressForm
