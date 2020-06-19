import React from 'react'
import TrackerDataState from '../Components/TrackerData.State.List.component'
import Globalpage from './Global.page'
import TrackerDataCity from '../Components/TrackerData.City.List.component'
import TrackerDataAll from '../Components/TrackerData.All.List.component'
import { Route, useRouteMatch } from 'react-router-dom'

export default function Homepage(){
    let { path } = useRouteMatch();
    return (
      <Globalpage>
              <Route exact path={path}>
                <TrackerDataAll/>
                <TrackerDataState fromHome='true'/>
                <TrackerDataCity fromHome='true'/>
              </Route>
              <Route exact path={path+"/ByState"}>
                <TrackerDataState/>
              </Route>
              <Route exact path={path+"/ByCity"}>
                <TrackerDataCity/>
              </Route>
      </Globalpage>
    )
}
