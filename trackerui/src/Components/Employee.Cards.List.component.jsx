import React, { Component } from 'react'
import {  Card } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import {fetchTrackerData} from '../Actions/userActions'

class TrackerDataList extends Component {
    componentDidMount(){
        this.props.fetchTrackerData()
    }

    render(){
        return(
            <React.Fragment>
                <Card.Group style={{marginTop: '50px'}}>
                    {/* {this.props.trackerData.map(data => 
                        <div>{data}</div>    
                    )} */}
                </Card.Group>
            </React.Fragment>
        )
    }  
}

const mapStateToProps = state => ({
    trackerdata: state.trackerData.trackerData
})

export default connect(mapStateToProps, {fetchTrackerData})(TrackerDataList);