import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

export default function Pagetitle() {
  return (
    <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>Welcome to Manager Portal</Header.Content>
    </Header>
  );
}
