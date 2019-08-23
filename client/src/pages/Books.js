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

    handleSearch = event => {
        event.preventDefault();

        if (this.state.bookSearch) {
            API.searchBooks(this.state.bookSearch).then(res =>
                this.setState({
                    results: res.data.items
                })
                console.log("response", res.data.items)
            ).catch(err => console.log(err));
        };
    };

    handleInputChange = event => {
        const value = event.target.value;

        this.setState({
            bookSearch: value
        });
    };

    handleSave = event => {
        const bookIndex = event.target.attributes.getNamedItem("data-index").value;
        const saveBook = this.state.results[bookIndex];
        console.log(saveBook);

        const bookData = {
            title: saveBook.volumeInfo.title,
            link: saveBook.volumeInfo.previewLink,
            thumbnail: saveBook.volumeInfo.imageLinks.thumbnail,
            author: saveBook.volumeInfo.imageLinks.thumbnail,
            author: saveBook.volumeInfo.authors[0],
            description: saveBook.volumeInfo.description,
            key: saveBook.id
        };

        API.saveBook(bookData.key, bookData)
            .then(API.getSavedBooks())
                .then(res => {
                    this.setState({
                        savedBooks: res.data
                    })
                    console.log("State", this.state.savedBooks);
                    console.log("Length", this.state.savedBooks.length);
                });
    };

    handleDelete = event => {
        const bookIndex = event.target.attributes.getNamedItem("data-index").value;
        const deleteBook = this.state.savedBooks[bookIndex];
        console.log(deleteBook._id);

        API.deleteBook(deleteBook._id)
            .then(window.location.reload())
    };
}