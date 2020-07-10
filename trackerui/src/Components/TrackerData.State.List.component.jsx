import React, { Component } from 'react';
import { Grid, Segment, Label, Table, Container, Statistic } from 'semantic-ui-react';
import { connect } from "react-redux";
import {fetchTrackerStateData} from '../Actions/trackerActions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchState from './Search.state.component';

const MAX_RECORDS = 7;

class TrackerDataState extends Component {
    state = {
        column: null,
        data: [],
        direction: null,
        filter: null
    }

    handleSearch(value){
        console.log(value)
        this.setState({
            filter : value
        })
    }
    
    handleRates(change,total){
        var rate = (change/total)*100;
        return (Math.round((rate + Number.EPSILON) * 100) / 100) + " %"
    }
    handleSort = (clickedColumn) => () => {
        if(this.props.fromHome) return;
        const { column, direction } = this.state
        var sortDir = "",x,y;
        var sortedData = [];
        if (column !== clickedColumn) {
            sortDir = 'ascending';
            sortedData = this.props.trackerstatedata.sort((a,b) => {
                if(clickedColumn ==="name"){
                    x = a.name.toLowerCase();
                    y = b.name.toLowerCase();
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
                        x = a.name.toLowerCase();
                        y = b.name.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    } else {
                        return a[clickedColumn] - b[clickedColumn]
                    }
                }else{
                    if(clickedColumn ==="state"){
                        x = a.name.toLowerCase();
                        y = b.name.toLowerCase();
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
        const { column, data, direction,filter } = this.state;
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
        if(filter !== null){
            maindata = maindata.filter((value)=> {
                return value.name === filter
            })
        }
        return(
            <>
            <Grid style={{padding: '0 20px'}} stackable>
            { !fromHome &&
                <Grid.Row>
                <Grid.Column>
                    <Segment compact>
                        <Label as='a' color='green' ribbon>Search State</Label>
                        <Segment textAlign="center" basic>
                            <SearchState statedata={maindata} handleSearch={this.handleSearch.bind(this)}/>
                        </Segment>
                    </Segment>
                </Grid.Column>
                </Grid.Row>
                }
                <Grid.Row stretched={filter!==null?true:false}>
                <Grid.Column>
                    <Segment>
                        <Label as='a' color='blue' ribbon>State Wise Data</Label>
                        <Table sortable={!fromHome} celled fixed compact>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                sorted={column === 'name' ? direction : null}
                                onClick={this.handleSort('name')}
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
                            {_.map(maindata, ({statecode,name,confirmed,active,recovered,deaths }) => (
                                <Table.Row key={statecode}>
                                    <Table.Cell>{name}</Table.Cell>
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
                        {filter!==null && 
                        <Segment>
                            <Label as='a' color='orange' ribbon>Percentages</Label>
                            <Segment textAlign="center" basic>
                                <Statistic color="green" size="tiny">
                                        <Statistic.Value>{this.handleRates(maindata[0].recovered,maindata[0].confirmed)}</Statistic.Value>
                                        <Label color='green' horizontal>RECOVERY RATE</Label>
                                </Statistic><br/>
                                <Statistic color="red" size="mini">
                                        <Statistic.Value>{this.handleRates(maindata[0].deaths,maindata[0].confirmed)}</Statistic.Value>
                                        <Label size="mini" color='red' horizontal>DEATH RATE</Label>
                                </Statistic>
                            </Segment>
                        </Segment>}
                    </Segment>
                </Grid.Column>
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