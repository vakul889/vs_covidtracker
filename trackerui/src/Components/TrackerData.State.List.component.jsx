import React, { Component } from 'react';
import { Grid, Segment, Label, Table, Container } from 'semantic-ui-react';
import { connect } from "react-redux";
import {fetchTrackerStateData} from '../Actions/trackerActions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const MAX_RECORDS = 7;

class TrackerDataState extends Component {
    state = {
        column: null,
        data: [],
        direction: null
    }
    
    handleSort = (clickedColumn) => () => {
        if(this.props.fromHome) return;
        const { column, direction } = this.state
        var sortDir = "",x,y;
        var sortedData = [];
        if (column !== clickedColumn) {
            sortDir = 'ascending';
            sortedData = this.props.trackerstatedata.sort((a,b) => {
                if(clickedColumn ==="state"){
                    x = a.state.toLowerCase();
                    y = b.state.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                } else {
                    return a[clickedColumn] - b[clickedColumn]
                }
            })
        } else {
            sortDir = (direction === 'ascending') ? 'descending' : 'ascending'
            sortedData = this.props.trackerstatedata.sort((a,b) => {
                if(sortDir === 'ascending') {
                    if(clickedColumn ==="state"){
                        x = a.state.toLowerCase();
                        y = b.state.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    } else {
                        return a[clickedColumn] - b[clickedColumn]
                    }
                }else{
                    if(clickedColumn ==="state"){
                        x = a.state.toLowerCase();
                        y = b.state.toLowerCase();
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
    }

    render(){
        const { trackerstatedata, fromHome } = this.props;
        const { column, data, direction } = this.state;
        let maindata;
        if(data.length === 0){
            maindata = trackerstatedata;
        } else {
            maindata = data;
        }
        if(fromHome){
            maindata = maindata.filter((value, index, array)=>{
                return index < MAX_RECORDS;
            })
        }
        return(
            <>
            <Grid style={{padding: '0 20px'}}>
                <Grid.Row stretched>
                <Grid.Column width={fromHome?16:12}>
                    <Segment>
                        <Label as='a' color='blue' ribbon>State Wise Data</Label>
                        <Table sortable={!fromHome} celled fixed compact>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                sorted={column === 'state' ? direction : null}
                                onClick={this.handleSort('state')}
                                >
                                State
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
                            {_.map(maindata, ({id,state,confirmed,active,recovered,deaths }) => (
                                <Table.Row key={id}>
                                    <Table.Cell>{state}</Table.Cell>
                                    <Table.Cell>{confirmed}</Table.Cell>
                                    <Table.Cell>{active}</Table.Cell>
                                    <Table.Cell>{recovered}</Table.Cell>
                                    <Table.Cell>{deaths}</Table.Cell>
                                </Table.Row>
                            ))}
                            </Table.Body>
                        </Table>
                        {fromHome && <Container textAlign="center">
                            <Link to="/CovidTracker/ByState"><Label attached="bottom">Show More</Label></Link>
                            </Container>}
                    </Segment>
                </Grid.Column>
                { !fromHome &&
                <Grid.Column width={4}>
                    <Segment>Search State Data</Segment>
                </Grid.Column>
                }
                </Grid.Row>
            </Grid>
            </>
        )
    }  
}

const mapStateToProps = state => ({
    trackerstatedata: state.trackerData.trackerStateData
})

export default connect(mapStateToProps, {fetchTrackerStateData})(TrackerDataState);