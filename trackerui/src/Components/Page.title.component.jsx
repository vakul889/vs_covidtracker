import React from 'react';
import { Label, Container } from 'semantic-ui-react';
export default function Pagetitle() {
  var date = (new Date()).toDateString();
  return (
      <Container style={{padding: 20}} textAlign="center">
          <Label color="grey">
            This Tracker provides daily COVID-19 status updates for India. The Information can be viewed for individual States as well as Cities.
            <Label.Detail>Last Updated at : {date}</Label.Detail>
          </Label>
      </Container>
  );
}
