import React from 'react';
import { Reaction } from './Reaction';

export const Issue = ({ issue, onFetchMoreIssues }) => (
  <li key={issue.node.id}>
    <a href={issue.node.url}>
      {issue.node.title} - {issue.node.state}
    </a>
    {issue.node.reactions.edges.map((reaction) => (
      <Reaction key={reaction.node.id} reaction={reaction} />
    ))}
  </li>
);
