import React from "react";
import { throttle, debounce } from "throttle-debounce";

export default class AutoCompleteInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            suggestions: [],
            text: ''
        };
        this.autocompleteSearchDebounced = debounce(3000, this.autocompleteSearch);
        this.autocompleteSearchThrottled = throttle(3000, this.autocompleteSearch);
    }

    onTextChange = event => {
        this.setState({ text: event.target.value }, () => {
        const value = this.state.text;
        if(value < 5 || value.endsWith(' ')){
            this.autocompleteSearchThrottled(this.state.text);
        }else{
            this.autocompleteSearchDebounced(this.state.text);
        }
        });
    };

    autocompleteSearch = (value) => {
        let suggestions = [];
        
        if(value.length > 0){
            fetch('https://localhost:44315/api/Cities/' + value)
            .then(response => 
                    response.json()
                ).then(data => {
                    if(data.length > 0)
                    {
                        for (let i = 0; i < data.length; i++) {
                            suggestions.push(data[i]["name"] + ', ' + data[i]["subCountry"] + ', ' + data[i]["country"]);
                        } 
                        this.setState(() => ({suggestions}));    
                    }else{
                        this.suggestionSelected(value);
                    }   
                });
        }
        else{
            this.suggestionSelected(value);
        }
    }

    suggestionSelected(value){
        this.setState(() => ({
            suggestions: [],
            text: value
        }))
    }

    renderSuggestion(){
        const { suggestions } = this.state;

        if(suggestions.length === 0){
            return null;
        }

        return(
            <div id="result">
                <ul>
                    {suggestions.map((item => <li onClick={() => this.suggestionSelected(item)}>{item}</li>))}
                </ul> 
            </div>
        );
    }
    
    render() {
        const {text} = this.state;
        
        return (
            <div>
                <input type="text" value={text} onChange={this.onTextChange}/>
                {this.renderSuggestion()}           
            </div>           
        )
    }
}

//cache - also in memory
//cache - allow user to clean cache
//loader - when waiting for data
//login
//authentication
//exception handeling
//typos - Though “iphone” is misspelled, the results flexibly assume what the user meant
//category - For some terms, the user can drill down by category for a more specific search
//unit tests