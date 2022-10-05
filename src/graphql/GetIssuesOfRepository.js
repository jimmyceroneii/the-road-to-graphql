export const GET_ISSUES_OF_REPOSITORY = `
	query ($organization: String!, $repository: String!) {
		organization(login: $organization) {
			name
			url
			repository(name: $repository) {
				name
				url
				issues(last: 5, states: [OPEN]) {
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
