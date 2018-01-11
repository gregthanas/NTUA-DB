import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios';
import moment from 'moment';
import TextField from 'material-ui/TextField';

class Vehicle extends Component {
    constructor(props) {
        super(props);

        const {data} = props;
        this.state = {
            vehicle_id: data.vehicle_id,
            details: data.vehicle,
			dialogOpen: false,
            bookingStatus: 'idle',
        };
    }

    handleInputChange = (event, value) => {
        event.persist();
        const state = this.state;
        state.details[event.target.name] = value;

        this.setState(state);
    }

    handleSubmit = (billingData) => {
        const data = Object.assign({}, this.state.details);
        data.last_service = moment(data.last_service).format("YYYY-MM-DD HH:mm:ss")
        data.next_service = moment(data.next_service).format("YYYY-MM-DD HH:mm:ss")
        data.insurance_expiration = moment(data.insurance_expiration).format("YYYY-MM-DD HH:mm:ss")
        data.buy_date = moment(data.buy_date).format("YYYY-MM-DD HH:mm:ss")
        data.kilometers = +data.kilometers;

        axios.put('http://localhost:3001/vehicles/' + this.state.vehicle_id, data)
            .then(res => {
                if (res.data.affectedRows) {
                    alert('Vehicle updated successfully.');
                }
            });
    }

    render() {
        const vehicle = this.state.details;

        const fields = [
            {name: 'type', label: 'Vehicle Type'},
            {name: 'brand', label: 'Brand'},
            {name: 'model', label: 'Model'},
            {name: 'cc', label: 'CC'},
            {name: 'horse_power', label: 'Horse Power'},
            {name: 'plate_number', label: 'Plate Number'},
            {name: 'buy_date', label: 'Buy Date'},
            {name: 'kilometers', label: 'Kilometers'},
            {name: 'last_service', label: 'Last Service'},
            {name: 'next_service', label: 'Next Service'},
            {name: 'insurance_expiration', label: 'Insurance Expire'},
            {name: 'price', label: 'Price $'},
        ];
        const vehicleDetails = fields.map((item, index) => (
        <TextField
                key={index}
                name={item.name}
                fullWidth
                onChange={this.handleInputChange}
                value={this.state.details[item.name]}
                floatingLabelText={item.label}
                floatingLabelFixed={true}
            />
        ));

        return (
            <Card className='vehicleItem'>
                <CardMedia className='cardMedia'>
                    <img src='/vehicles/tesla-model-3.png' alt='tesla' />
                </CardMedia>
				<CardTitle title={vehicle.brand + ' ' + vehicle.model} />
				<CardText style={{paddingTop: 0}}>
					<List>
                        {vehicleDetails}
                    </List>
				</CardText>
				<CardActions style={{textAlign: 'center'}}>
					<RaisedButton onClick={this.handleSubmit} label='Update' fullWidth={true} />
				</CardActions>
            </Card>
        );
    }
}

export default Vehicle;