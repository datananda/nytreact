import React, { Component } from "react";
import Nav from "../../components/Nav";
import Card from "../../components/Card";
import { Input, FormBtn } from "../../components/Form";
import NYT_API from "../../utils/NYT_API";
import API from "../../utils/API";
import { ListItem, ListBtn } from "../../components/List";
import { Container, Row, Col } from "../../components/Grid";
const moment = require("moment");

class Home extends Component {
  state = {
    topic: "",
    startYear: "",
    endYear: "",
    results: []
  }

  saveArticle = idToSave => {
    const { id, ...articleData } = this.state.results.filter(article => article.id === idToSave)[0];
    API.saveArticle(articleData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    let query = this.state.topic;
    if (this.state.startYear) { query += `&begin_date=${this.state.startYear}0101` };
    if (this.state.endYear) { query += `&end_date=${this.state.endYear}1231` };
    NYT_API.search(query)
      .then(res => {
        const results = res.data.response.docs.slice(0, 5).map(result => {
          const slimResult = {
            id: result._id,
            title: result.headline.main,
            url: result.web_url,
            date: result.pub_date
          }
          return slimResult;
        });
        this.setState({ results });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Nav />
        <Container>
          <Row>
            <Col size="lg-4">
              <Card header="Article Search" cardBody="True">
                <form>
                  <Input
                    value={this.state.topic}
                    onChange={this.handleInputChange}
                    displayName="Topic"
                    name="topic"
                    placeholder="Article topic"
                  />
                  <Input
                    value={this.state.startYear}
                    onChange={this.handleInputChange}
                    displayName="Start Year"
                    name="startYear"
                    placeholder="1990"
                  />
                  <Input
                    value={this.state.endYear}
                    onChange={this.handleInputChange}
                    displayName="End Year"
                    name="endYear"
                    placeholder="2000"
                  />
                  <FormBtn
                    onClick={this.handleFormSubmit}
                  >Search</FormBtn>
                </form>
              </Card>
            </Col>
            <Col size="lg-8">
              {this.state.results.length > 0 &&
                <Card header="Results">
                  <ul className="list-group list-group-flush">
                    {this.state.results.map(article => (
                      <ListItem
                        key={article.id}
                        title={article.title}
                        url={article.url}
                        date={moment(article.date).format("MMMM D, YYYY")}
                      >
                        <ListBtn
                          onClick={() => this.saveArticle(article.id)}
                          text="Save"
                        />
                      </ListItem>
                    ))}
                  </ul>
                </Card>
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
