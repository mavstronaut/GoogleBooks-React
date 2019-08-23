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


    render() {
        return {
            <div>
                {window.location.pathname === "/" ?
                    <div>
                            <SearchCard
                                value={this.state.bookSearch}
                                onChange={this.handleInputChange}
                                onClick={this.handleSearch}
                            />

                            <SearchResult>
                                    {this.state.results.length ? (
                                        this.state.results.map( (book, i) => {
                                            return (
                                                <BookItemCard
                                                    key={book.id}
                                                    title={book.volumeInfo.title}
                                                    author={(book.volumeInfo.authors) ? (book.volumeInfo.authors[0]) : ("Anonymous")}
                                                    href={book.volumeInfo.previewLink}
                                                    thumbnail={(book.volumeInfo.imageLinks) ? (book.volumeInfo.imageLinks.thumbnail) : ("https://iconutopia.com/wp-content/uploads/2016/06/rocket-book.png")}
                                                    description={book.volumeInfo.description}
                                                    save={this.handleSave}
                                                    index={i}
                                                />
                                            )
                                        })
                                    ) : (<h3>No Results Found.</h3>)}
                            </SearchResult>
                    </div>
                    :
                    <SaveCard>
                        {this.state.savedBooks.length ? (
                            this.state.savedBooks.map((book, i) => {
                                return (
                                    <BookItemCard
                                        key={book._id}
                                        title={book.title}
                                        author={book.author}
                                        href={book.link}
                                        thumbnail={(book.thumbnail) ? (book.thumbnail) : ("https://iconutopia.com/wp-content/uploads/2016/06/rocket-book.png")}
                                        description = {book.description}
                                        delete={this.handleDelete}
                                        index={i}
                                    />
                                )
                            })
                        )}
                    </SaveCard>
                    }
        }
    }
}