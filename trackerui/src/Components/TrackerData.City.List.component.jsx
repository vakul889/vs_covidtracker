import React, { Component } from 'react';
import { Grid, Segment, Label, Table, Container } from 'semantic-ui-react';
import { connect } from "react-redux";
import {fetchTrackerStateData, fetchTrackerStateCityData} from '../Actions/trackerActions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import StateDropdown from './State.dropdown.component';

const MAX_RECORDS = 7;

class TrackerDataCity extends Component {
    state = {
        column: null,
        data: [],
        direction: null,
        selectedState: "Uttar Pradesh"
    }
    handleStateChange = (e, { value }) => this.setState({ selectedState: value })

    handleSort = (clickedColumn) => () => {
        if(this.props.fromHome) return;
        const { column, direction } = this.state
        var sortDir = "", x, y;
        var sortedData = [];
        if (column !== clickedColumn) {
            sortDir = 'ascending';
            sortedData = this.props.trackerstatecitydata.filter((value)=>{
                return value.state === this.state.selectedState
                });
            sortedData = sortedData[0].districtData.sort((a,b) => {
                if(clickedColumn ==="id"){
                    x = a.id.toLowerCase();
                    y = b.id.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                } else {
                    return a[clickedColumn] - b[clickedColumn]
                }
            })
        } else {
            sortDir = (direction === 'ascending') ? 'descending' : 'ascending'
            sortedData = this.props.trackerstatecitydata.filter((value)=>{
                return value.state === this.state.selectedState
                }); 
            sortedData = sortedData[0].districtData.sort((a,b) => {
                if(sortDir === 'ascending') {
                    if(clickedColumn ==="id"){
                        x = a.id.toLowerCase();
                        y = b.id.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    } else {
                        return a[clickedColumn] - b[clickedColumn]
                    }
                }else{
                    if(clickedColumn ==="id"){
                        x = a.id.toLowerCase();
                        y = b.id.toLowerCase();
                        if (x > y) {return -1;}
                        if (x < y) {return 1;}
                        return 0;
                    } else {
                        return b[clickedColumn] - a[clickedColumn]
                    }
                }
            })
        }
        this.setState({
            column: clickedColumn,
            data: sortedData,
            direction: sortDir
        })
    }
    componentDidMount(){
        this.props.fetchTrackerStateData()
        this.props.fetchTrackerStateCityData()
    }

    render(){
        const { trackerstatedata,trackerstatecitydata, fromHome } = this.props;
        const { column, data, direction } = this.state;
        var states = trackerstatedata.filter((value)=> {
            return {id: value.id, state: value.state}
        })
        let maindata, citydata;
        if(data.length === 0){
            maindata = trackerstatecitydata.filter((value)=>{
                return value.state === this.state.selectedState
            });
        } else {
            citydata = data
        }
        if(citydata===undefined && maindata[0]!== undefined){
            citydata = maindata[0].districtData
            if(fromHome){
                citydata = citydata.filter((value,index)=>{
                    return index < MAX_RECORDS;
                })
            }
        }
        return(
            <Grid style={{padding: '0 20px'}}>
                <Grid.Row stretched>
                <Grid.Column width={fromHome?16:12}>
                    <Segment>
                        <Label as='a' color='blue' ribbon>City Wise Data</Label>
                        <StateDropdown 
                            states={states} 
                            value={this.state.selectedState}
                            handleStateChange={this.handleStateChange.bind(this)}
                        />
                        <Table sortable={!fromHome} celled fixed compact>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                sorted={column === 'id' ? direction : null}
                                onClick={this.handleSort('id')}
                                >
                                City
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                sorted={column === 'confirmed' ? direction : null}
                                onClick={this.handleSort('confirmed')}
                                >
                                Confirmed Cases
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                sorted={column === 'active' ? direction : null}
                                onClick={this.handleSort('active')}
                                >
                                Active Cases
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                sorted={column === 'recovered' ? direction : null}
                                onClick={this.handleSort('recovered')}
                                >
                                Recovered Cases
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                sorted={column === 'deaths' ? direction : null}
                                onClick={this.handleSort('deaths')}
                                >
                                Fatal Cases
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {_.map(citydata, ({id,confirmed,active,recovered,deaths }) => (
                                <Table.Row key={id}>
                                    <Table.Cell>{id}</Table.Cell>
                                    <Table.Cell>{confirmed!=null?confirmed: "Data Not Available"}</Table.Cell>
                                    <Table.Cell>{active!=null ? active:"Data Not Available"}</Table.Cell>
                                    <Table.Cell>{recovered!=null ? recovered:"Data Not Available"}</Table.Cell>
                                    <Table.Cell>{deaths!=null? deaths:"Data Not Available" }</Table.Cell>
                                </Table.Row>
                            ))}
                            </Table.Body>
                        </Table>
                        {fromHome && <Container textAlign="center">
                            <Link to="/CovidTracker/ByCity"><Label attached="bottom">Show More</Label></Link>
                            </Container>}
                    </Segment>
                </Grid.Column>
                { !fromHome &&
                <Grid.Column width={4}>
                    <Segment>Search City</Segment>
                </Grid.Column>
                }
                </Grid.Row>
            </Grid>
        )
    }  
}

const mapStateToProps = state => ({
    trackerstatedata: state.trackerData.trackerStateData,
    trackerstatecitydata: state.trackerData.trackerStateCityData
})

export default connect(mapStateToProps, {fetchTrackerStateData,fetchTrackerStateCityData})(TrackerDataCity);