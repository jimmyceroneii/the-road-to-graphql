import React, { Component } from 'react';
import axios from 'axios';
import { GET_ORGANIZATION } from './graphql/GetOrganization';
import { Organization } from './Components/Organization';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

const TITLE = 'React GraphQL GitHub Client';

class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
    organization: null,
    errors: null,
  };

  componentDidMount() {
    this.onFetchFromGitHub();
  }

  onChange = (event) => {
    this.setState({ path: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
  };

  onFetchFromGitHub = () => {
    axiosGitHubGraphQL.post('', { query: GET_ORGANIZATION }).then((result) => {
      this.setState({
        organization: result.data.data.organization,
        errors: result.data.errors,
      });
    });
  };

  render() {
    const { path, organization } = this.state;

    return (
      <div>
        <h1>{TITLE}</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor='url'>Show open issues for https://github.com</label>
          <input
            id='url'
            type='text'
            value={path}
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
          <button type='submit'>Submit</button>
        </form>

        <hr />

        {organization ? (
          <Organization organization={organization} />
        ) : (
          <p>No information yet...</p>
        )}
      </div>
    );
  }
}

export default App;
