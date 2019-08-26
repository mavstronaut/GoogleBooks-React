import React, { Component } from "react";
import SearchCard from "../components/SearchCard";
import SearchResult from "../components/SearchResult";
import SaveCard from "../components/SaveResult";
import BookItemCard from "../components/BookItemCard";
import API from "../utils/API";

class Books extends Component {
    state = {
        results: [],
        savedBooks: [],
        bookSearch: ""
    };

    componentDidMount() {
        API.getSavedBooks().then(res => {
            this.setState({
                savedBooks: res.data
            })
        }).catch(() =>
        this.setState({
            savedBooks: [],
            // message: "No New Books Found, Try a Different Query"
        })
        );
    }

    handleSearch = event => {
        event.preventDefault();

        if (this.state.bookSearch) {
            API.searchBooks(this.state.bookSearch).then(res =>
                this.setState({
                    results: res.data.items
                })    
            ).catch(err => console.log(err));
        };
    };

    handleInputChange = event => {
        const value = event.target.value;

        this.setState({
            bookSearch: value
        });
    };

    // handleBookSave = id => {
    //     const book = this.state.books.find(book => book.id === id);
    
    //     API.saveBook({
    //       key: book.id,
    //       title: book.volumeInfo.title,
    //       subtitle: book.volumeInfo.subtitle,
    //       link: book.volumeInfo.infoLink,
    //       authors: book.volumeInfo.authors,
    //       description: book.volumeInfo.description,
    //       image: book.volumeInfo.imageLinks.thumbnail
    //     }).then(() => this.getSavedBooks());
    //   };

    // getSavedBooks = () => {
    // API.getSavedBooks(this.state.q)
    //     .then(res =>
    //     this.setState({
    //         saveBook: res.data
    //     })
    //     )
    //     .catch(() =>
    //     this.setState({
    //         books: [],
    //         message: "No New Books Found, Try a Different Query"
    //     })
    //     );
    // };

    handleSave = event => {
        const bookIndex = event.target.attributes.getNamedItem("data-index").value;
        const saveBook = this.state.results[bookIndex];
        console.log(saveBook);

        const bookData = {
            title: saveBook.volumeInfo.title,
            link: saveBook.volumeInfo.previewLink,
            thumbnail: saveBook.volumeInfo.imageLinks.thumbnail,
            author: saveBook.volumeInfo.authors[0],
            description: saveBook.volumeInfo.description,
            key: saveBook.id
        };

        // async function newBook(bookData) {
        //     const a = await API.saveBook(bookData);
        //     return a;
        // }

        // async function setNewBook(bookData) {
        //     const c = await this.setState({ savedBooks: bookData.data});
        //     return c;
        // }
        // newBook(bookData).then(setNewBook(bookData)).catch(err => {console.log(err)});
                
        
        // API.saveBook(bookData)
        //         .then(API.getSavedBooks()
        //             .then(res => {
        //                 this.setState({
        //                     savedBooks: res.data
        //                 })
        //                 console.log("State", this.state.savedBooks);
        //                 console.log("Length", this.state.savedBooks.length);
        //             })
        //         )

        API.saveBook(bookData.key, bookData)
            .then(API.getSavedBooks()
                .then(res => {
                    this.setState({
                        savedBooks: res.data
                    })
                    console.log("State", this.state.savedBooks);
                    console.log("Length", this.state.savedBooks.length);
                })
            )
    };


    handleDelete = event => {
        const bookIndex = event.target.attributes.getNamedItem("data-index").value;
        const deleteBook = this.state.savedBooks[bookIndex];
        console.log(deleteBook._id);

        API.deleteBook(deleteBook._id)
            .then(window.location.reload())
    };


    render() {
        return (
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
                            ) : (<h3>No Saved Books</h3>)}
                        </SaveCard>
                }
            </div>
        )
    }
}

export default Books;