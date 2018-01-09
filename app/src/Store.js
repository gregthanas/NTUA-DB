import React, { Component } from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Vehicle from './Vehicle';
import axios from 'axios';
import DatePicker from 'material-ui/DatePicker';

class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataReady: false,
            details: null,
            start_date: null,
            end_date: null,
        };
    }

    componentWillMount() {
        const {storeId} = this.props.match.params;

        axios.get('http://localhost:3001/stores/' + storeId).then(response => {
            this.setState({details: response.data[0], dataReady: true});
        });
    }

    handleDateChange(type, event, date) {
        this.setState(state => state[type] = date);
    }

    render() {
        if (!this.state.dataReady) {
            return 'Loading..';
        }

        const store = this.state.details;
        let store_address = `${store.street_name} ${store.street_number}, ${store.postal_code} ${store.city}, ${store.country}`;
        let store_phone = '6983317150';
        let store_email = 'Kaisariani@rental.com';

        let vehicles = [], vehicleItems = [];
        if (!this.state.start_date || !this.state.end_date) {
            vehicleItems = 'Please choose start and end date to show the available vehicles.';
        } else {
            vehicles = [1];

            if (vehicles.length) {
                vehicleItems = vehicles.map((id, index) => (<Vehicle id={id} key={index} />));
            }
        }

        return (
            <Card className='store'>
				<CardText style={{paddingTop: 0}}>
                    <div className='store-data'>
                        <div className='store-img'>
                            <img src='/stores/store.png' alt='store' />
                        </div>
                        <List className='store-details'>
                            <ListItem disabled={true}
                                primaryText={store.store_name}
                                style={{padding: '8px 0', fontSize: '18px'}} />

                            <ListItem
                                disabled={true}
                                primaryText='Address'
                                style={{padding: '8px 0'}}
                                secondaryText={store_address}>
                                <a className='list-right' target='_blank' href={'https://www.google.gr/maps/search/' + encodeURIComponent(store_address)}>Map</a>
                            </ListItem>

                            <ListItem
                                disabled={true}
                                primaryText='Telephone'
                                style={{padding: '8px 0'}}
                                secondaryText={store_phone}/>

                            <ListItem
                                disabled={true}
                                primaryText='Email'
                                style={{padding: '8px 0'}}
                                secondaryText={store_email}/>
                        </List>
                        <div className='clear' />
                    </div>

                    <Subheader style={{marginTop: '20px'}}>Vehicles</Subheader>
                    <Divider />
					<DatePicker
						floatingLabelText='Start Date'
						minDate={new Date()}
                        style={{float: 'left', marginRight: '20px'}}
                        onChange={this.handleDateChange.bind(this, 'start_date')}
					/>
					<DatePicker
						floatingLabelText='End Date'
                        onChange={this.handleDateChange.bind(this, 'end_date')}
						minDate={this.state.start_date || new Date()}
					/>
                    <div className='clear' />
                    {vehicleItems.length ? vehicleItems : ''}
                    <div className='clear' />
				</CardText>
            </Card>
        );
    }
}

export default Store;