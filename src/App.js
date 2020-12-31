import React, { Component } from "react";
import "./App.css";

import AddBookmark from "./addBookmark/addBookmark";
import BookmarkApp from "./bookmarkApp/bookmarkApp";

const apiKey = "$2a$10$9jxklLKaI0gDMnrXche6S.MHejBqPY95bHx7tgBi3MY9pDPShaism";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false,
    };
  }

  setShowAddForm(show) {
    this.setState({
      showAddForm: show,
    });
  }

  addBookmark(bookmark) {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
      showAddForm: false,
    });
  }

  componentDidMount() {
    const url = "https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks";
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          bookmarks: data,
          error: null,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  render() {
    const page = this.state.showAddForm ? (
      <AddBookmark
        showForm={(show) => this.setShowAddForm(show)}
        handleAdd={(bookmark) => this.addBookmark(bookmark)}
      />
    ) : (
      <BookmarkApp
        bookmarks={this.state.bookmarks}
        showForm={(show) => this.setShowAddForm(show)}
      />
    );
    return <div className="App">{page}</div>;
  }
}

export default App;
