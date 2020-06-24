import React, { Component } from 'react'
import _ from 'lodash';
import { Search, Button } from 'semantic-ui-react';

const initialState = { isLoading: false, results: [], value: '' }

export default class SearchState extends Component {
    state = initialState;
    
    handleResultSelect = (e, { result }) => {
        this.props.handleSearch(result.title)
        this.setState({ value: result.title })
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
        var source = this.props.statedata;
        source = source.map((value) => {
            return {title: value.name}
        })
        setTimeout(() => {
          if (this.state.value.length < 1) return this.setState(initialState)
    
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = (result) => re.test(result.title)
    
          this.setState({
            isLoading: false,
            results: _.filter(source, isMatch),
          })
        }, 300)
    }

    render() {
        const { isLoading, value, results } = this.state
        return (
        <>
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true,
                })}
                results={results}
                value={value}
                {...this.props}
            />
            <br/>
            <Button color="green" size="small" onClick={(e)=> this.props.handleSearch(null)}>Reset</Button>
        </>
        )
    }
}
