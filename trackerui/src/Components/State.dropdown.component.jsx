import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export default function StateDropdown({...props}) {
    const options = props.states.sort((a,b)=>{
            var x = a.state.toLowerCase();
            var y = b.state.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        }).map((state) => ({
        key: state.id,
        text: state.state,
        value: state.state,
    }))
  return (
    <>
        <Dropdown placeholder='Select State' 
            search 
            selection 
            options={options} 
            onChange={props.handleStateChange}
            value={props.value}
        />
    </>
  );
}