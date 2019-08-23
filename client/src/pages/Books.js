import React, { Component } from "react";
import SearchCard from "../components/SearchCard";
import SearchResult from "../components/SearchResult";
import SaveCard from "../components/SaveResult";
import BookItemCard from "../components/BookItemCard";
import API from ""../utils/API";

class Books extends Component {
    state = {
        results: [],
        savedBooks: [],
        bookSearch: ""
    };

    componentDidMount () {
        API.getSavedBooks().then(res => {
            this.setState({
                savedBooks: res.data
            });
        });
    }

    
}