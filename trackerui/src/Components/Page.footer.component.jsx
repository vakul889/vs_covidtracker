import React from 'react';
import { Segment, List } from 'semantic-ui-react';
export default function Pagefooter() {

  return (
      <Segment textAlign="center" inverted color="grey">
        <div style={{padding: 20}}>
          <List>
            <List.Item>Created By : Vakul Saxena</List.Item>
            <List.Item>Email Address : vakulsaxena2007@gmail.com</List.Item>
            <List.Item>Covid Data Source : (covidindiatracker.com)</List.Item>
          </List>
        </div>
      </Segment>
  );
}
