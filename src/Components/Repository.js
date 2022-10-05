import React from 'react';
import { Issue } from './Issue';

export const Repository = ({ repository }) => (
  <div>
    <p>
      <strong>In repository: </strong>
      <a href={repository.url}>{repository.name}</a>
    </p>

    <ul>
      {repository.issues.edges.map((issue) => (
        <Issue key={issue.node.id} issue={issue} />
      ))}
    </ul>
  </div>
);
