export const GET_ISSUES_OF_REPOSITORY = `
	query ($organization: String!, $repository: String!, $cursor: String) {
		organization(login: $organization) {
			name
			url
			repository(name: $repository) {
				name
				url
				issues(first: 5, after: $cursor, states: [OPEN]) {
					totalCount
					pageInfo {
						endCursor
						hasNextPage
					}
					edges {
						node {
							id
							title
							url
							state
							reactions(last: 3) {
								edges {
									node {
										id
										content
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;
