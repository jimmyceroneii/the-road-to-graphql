import React from 'react';
import { Issue } from './Issue';

export const Repository = ({
  repository,
  onFetchMoreIssues,
  onStarRepository,
}) => (
  <div>
    <p>
      <strong>In repository: </strong>
      <a href={repository.url}>{repository.name}</a>
    </p>

    <button
      type='button'
      onClick={() =>
        onStarRepository(repository.id, repository.viewerHasStarred)
      }
    >
      {repository.viewerHasStarred ? 'Unstar' : 'Star'}
    </button>

    <ul>
      {repository.issues.edges.map((issue) => (
        <Issue
          key={issue.node.id}
          issue={issue}
          onFetchMoreIssues={onFetchMoreIssues}
        />
      ))}
    </ul>

    <hr />

    {repository.issues.pageInfo.hasNextPage && (
      <button onClick={onFetchMoreIssues}>More</button>
    )}
  </div>
);
