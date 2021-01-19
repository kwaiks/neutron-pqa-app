import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as mqtt from "mqtt";
// layouts

import Home from "./views/Home";
import Logging from "./views/Logging";
import LoggingHistory from "./views/LoggingHistory";
import Meter from "./views/Meter";
import Power from "./views/Power";
import Report from "./views/Report";
import Settings from "./views/Settings";
import { ADD_DATA } from "./store/constants/actionTypes";
import Layout from "./layouts/AppLayout";

const mapDispatchToProps = (dispatch:any) => ({
    addData: (payload:any) =>
        dispatch({ type: ADD_DATA, payload })
});

const options = {
  host: process.env.BASE_URL,
  port: 9001,
  clientId: 'mqttjs01', //random id
  username: '',
  password: '',
  clean: true,
  rejectUnauthorized: false,
}

const client = mqtt.connect(`ws://${process.env.BASE_URL}`, options);

const App = (props:any) => {
    // ComponentDidMount
    useEffect(()=>{
      client.subscribe('meter/#', (err:any) => {
          if(err){
              client.end()
          }
      });
      client.on('message', (_topic:string, message:any) => {
            props.addData(message.toString());
      });
      return function cleanup() {
        client.end()
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[client])

    return (
        <Switch>
            <Layout>
                <Switch>
                    <Route path="/dashboard" exact component={Home} />
                    <Route path="/logging" exact component={Logging} />
                    <Route path="/logging-history/:id" exact component={LoggingHistory} />
                    <Route path="/meter" exact component={Meter} />
                    <Route path="/power" exact component={Power} />
                    <Route path="/settings" exact component={Settings} />
                    <Redirect from="*" to="/dashboard" />
                </Switch>
            </Layout> 
        </Switch>
    )
}

export default connect(()=>{}, mapDispatchToProps)(App);