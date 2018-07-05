import React, { Component } from "react";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import { ListItem, ListBtn } from "../../components/List";
const moment = require("moment");

class Saved extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    API.getArticles()
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.log(err));
  }

  deleteArticle = idToDelete => {
    API.deleteArticle( idToDelete )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  Saved Articles
                </div>
                <ul className="list-group list-group-flush">
                  {this.state.articles.map(article => (
                    <ListItem
                      key={article._id}
                      title={article.title}
                      url={article.url}
                      date={moment(article.date).format("MMMM D, YYYY")}
                    >
                      <ListBtn
                        onClick={() => this.deleteArticle(article._id)}
                        text="Delete"
                      />
                    </ListItem>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Saved;
