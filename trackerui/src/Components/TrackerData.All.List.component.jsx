import React, { Component } from 'react'
import {Grid, Segment, Statistic, Label, Icon, Table } from 'semantic-ui-react'
import { connect } from "react-redux";
import {fetchTrackerData, fetchTrackerStateData} from '../Actions/trackerActions'

class TrackerDataAll extends Component {
    componentDidMount(){
        this.props.fetchTrackerData()
        this.props.fetchTrackerStateData()
    }

    handleDataChanges(value){
        if(value > 0){
            return <Icon name="long arrow alternate up"/>
        } else if(value < 0){
            return <Icon name="long arrow alternate down"/>
        } else {
            return ""
        }
    }

    handleRates(change,total){
        var rate = (change/total)*100;
        return (Math.round((rate + Number.EPSILON) * 100) / 100) + " %"
    }

    getMostAffectedStates(){
        const {trackerstatedata} = this.props;
        var sorteddata = [];
        var sortedstatelist = [];
        console.log(trackerstatedata);
        if( trackerstatedata!== null && trackerstatedata  !== undefined) {
            sorteddata = trackerstatedata.sort((a,b)=>{
                return a.confirmed < b.confirmed
            })
            // for (var i = 0; i < 5; i++) {
            //     if(sorteddata[i] !== null && sorteddata[i] !== undefined){
            //         sortedstatelist[i] = sorteddata[i];
            //     }
            // }
            sortedstatelist = sorteddata.filter((value,index)=>{
                return index < 5
            })
        }
        console.log(sortedstatelist)
        return sortedstatelist;
    }

    render(){
        const { trackerdata } = this.props;
        if(trackerdata[0] !== undefined && trackerdata[0] !== null ){
        return(
            <Grid style={{padding: '0 20px'}}>
                <Grid.Row stretched>
                <Grid.Column width={8}>
                    <Segment>
                        <Label as='a' color='blue' ribbon>All India - Current Statistics</Label>
                        <Segment textAlign="center" basic>
                        <div>
                            <Statistic color="teal" size="tiny">
                                <Statistic.Value>{trackerdata[0].confirmed}</Statistic.Value>
                                <Statistic.Label>Confirmed</Statistic.Label><br/>
                                <Label color='teal'>{this.handleDataChanges(trackerdata[0].cChanges)}{trackerdata[0].cChanges}</Label>
                            </Statistic>
                            &nbsp;&nbsp;&nbsp;
                            <Statistic color="yellow" size="tiny">
                                <Statistic.Value>{trackerdata[0].active}</Statistic.Value>
                                <Statistic.Label>Active Cases</Statistic.Label><br/>
                                <Label color='yellow'>{this.handleDataChanges(trackerdata[0].aChanges)}{trackerdata[0].aChanges}</Label>
                            </Statistic>
                            &nbsp;&nbsp;&nbsp;
                            <Statistic color="green" size="small">
                                <Statistic.Value>{trackerdata[0].recovered}</Statistic.Value>
                                <Statistic.Label>Recovered</Statistic.Label><br/>
                                <Label color='green'>{this.handleDataChanges(trackerdata[0].rChanges)}{trackerdata[0].rChanges}</Label>
                            </Statistic>
                            &nbsp;&nbsp;&nbsp;
                            <Statistic color="red" size="mini">
                                <Statistic.Value>{trackerdata[0].deaths}</Statistic.Value>
                                <Statistic.Label>Deaths</Statistic.Label><br/>
                                <Label color='red'>{this.handleDataChanges(trackerdata[0].dChanges)}{trackerdata[0].dChanges}</Label>
                            </Statistic>
                        </div>
                        </Segment>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        <Label as='a' color='orange' ribbon>Percentages</Label>
                        <Segment textAlign="center" basic>
                            <Statistic color="green" size="tiny">
                                    <Statistic.Value>{this.handleRates(trackerdata[0].recovered,trackerdata[0].confirmed)}</Statistic.Value>
                                    <Label color='green' horizontal>RECOVERY RATE</Label>
                            </Statistic><br/>
                            <Statistic color="red" size="mini">
                                    <Statistic.Value>{this.handleRates(trackerdata[0].deaths,trackerdata[0].confirmed)}</Statistic.Value>
                                    <Label size="mini" color='red' horizontal>DEATH RATE</Label>
                            </Statistic>
                        </Segment>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        <Label as='a' color='red' ribbon>Most Affected States</Label>
                            <br/>
                            Top 5 most affected states 
                            <Table singleLine compact>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>State</Table.HeaderCell>
                                    <Table.HeaderCell>Confirmed Cases</Table.HeaderCell>    
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.getMostAffectedStates().map(state => 
                                    <Table.Row key={state.statecode}>
                                        <Table.Cell>{state.name}</Table.Cell>
                                        <Table.Cell>{state.confirmed}</Table.Cell>    
                                    </Table.Row>
                                )}
                            </Table.Body>
                            </Table>
                    </Segment>
                </Grid.Column>
                </Grid.Row>
            </Grid>
        )
        }else{
            return(
                <Segment loading="true">

                </Segment>
            )
        }
    }  
}

const mapStateToProps = state => ({
    trackerdata: state.trackerData.trackerData,
    trackerstatedata: state.trackerData.trackerStateData,
})

export default connect(mapStateToProps, {fetchTrackerData, fetchTrackerStateData})(TrackerDataAll);