import React, { Component } from "react";
import Nav from "../../components/Nav";
import { Input, FormBtn } from "../../components/Form";
import NYT_API from "../../utils/NYT_API";
import { ListItem } from "../../components/List";
const moment = require("moment");

class Home extends Component {
  state = {
    topic: "",
    startYear: "",
    endYear: "",
    results: []
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
      .then(res => this.setState({ results: res.data.response.docs.slice(0,5) }))
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
                  Article Search
                </div>
                <div className="card-body">
                  <form>
                    <Input
                      value={this.state.topic}
                      onChange={this.handleInputChange}
                      displayName="Topic"
                      name="topic"
                      placeholder="Enter a search topic"
                    />
                    <Input
                      value={this.state.startYear}
                      onChange={this.handleInputChange}
                      displayName="Start Year"
                      name="startYear"
                      placeholder="Enter a start year for your search"
                    />
                    <Input
                      value={this.state.endYear}
                      onChange={this.handleInputChange}
                      displayName="End Year"
                      name="endYear"
                      placeholder="Enter an end year for your search"
                    />
                    <FormBtn
                      onClick={this.handleFormSubmit}
                    >Search</FormBtn>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  Results
                </div>
                <ul className="list-group list-group-flush">
                  {this.state.results.map(result => (
                    <ListItem
                      key={result._id}
                      id={result._id}
                      title={result.headline.main}
                      url={result.web_url}
                      date={moment(result.pub_date).format("MMMM D, YYYY")}
                    />
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

export default Home;
