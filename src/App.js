import React, { Component } from 'react';
import axios from 'axios';
import { Organization } from './Components/Organization';
import { GET_ISSUES_OF_REPOSITORY } from './graphql/GetIssuesOfRepository';
import { ADD_STAR_TO_REPOSITORY } from './graphql/AddStarToRepository';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

const TITLE = 'React GraphQL GitHub Client';

const addStarToRepository = (repositoryId) => {
  return axiosGitHubGraphQL.post('', {
    query: ADD_STAR_TO_REPOSITORY,
    variables: {
      repositoryId,
    },
  });
};

const resolveAddStarMutation = (mutationResult) => (state) => {
  const { viewerHasStarred } = mutationResult.data.data.addStar.starrable;

  return {
    ...state,
    organization: {
      ...state.organization,
      repository: {
        ...state.organization.repository,
        viewerHasStarred,
      },
    },
  };
};

const getIssuesOfRepository = (path, cursor) => {
  const [organization, repository] = path.split('/');

  return axiosGitHubGraphQL.post('', {
    query: GET_ISSUES_OF_REPOSITORY,
    variables: { organization, repository, cursor },
  });
};

const resolveIssuesQuery = (queryResult, cursor) => (state) => {
  const { data, errors } = queryResult.data;

  if (!cursor) {
    return {
      organization: data.organization,
      errors,
    };
  }

  const { edges: oldIssues } = state.organization.repository.issues;
  const { edges: newIssues } = data.organization.repository.issues;

  const updatedIssues = [...oldIssues, ...newIssues];

  return {
    organization: {
      ...data.organization,
      repository: {
        ...data.organization.repository,
        issues: {
          ...data.organization.repository.issues,
          edges: updatedIssues,
        },
      },
    },
    errors,
  };
};

class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
    organization: null,
    errors: null,
  };

  componentDidMount() {
    this.onFetchFromGitHub(this.state.path);
  }

  onChange = (event) => {
    this.setState({ path: event.target.value });
  };

  onSubmit = (event) => {
    this.onFetchFromGitHub(this.state.path);

    event.preventDefault();
  };

  onFetchFromGitHub = (path, cursor) => {
    getIssuesOfRepository(path, cursor).then((result) => {
      this.setState(resolveIssuesQuery(result));
    });
  };

  onFetchMoreIssues = () => {
    const { endCursor } = this.state.organization.repository.issues.pageInfo;

    this.onFetchFromGitHub(this.state.path, endCursor);
  };

  /**
   * @param {string} repositoryId
   * @param {boolean} viewerHasStarred
   */
  onStarRepository = (repositoryId, viewerHasStarred) => {
    addStarToRepository(repositoryId).then((result) =>
      this.setState(resolveAddStarMutation(result))
    );
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
          <Organization
            organization={organization}
            onFetchMoreIssues={this.onFetchMoreIssues}
            onStarRepository={this.onStarRepository}
          />
        ) : (
          <p>No information yet...</p>
        )}
      </div>
    );
  }
}

export default App;
