import React, { Component } from "react";
import Nav from "../../components/Nav";
import Card from "../../components/Card";
import API from "../../utils/API";
import { ListItem, ListBtn } from "../../components/List";
import { Container, Row, Col } from "../../components/Grid";
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
    API.deleteArticle(idToDelete)
      .then(res => this.getArticles())
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Nav />
        <Container>
          <Row>
            <Col size="12">
              <Card header="Saved Articles">
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
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Saved;
