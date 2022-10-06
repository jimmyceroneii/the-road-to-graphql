export const ADD_STAR_TO_REPOSITORY = `
	mutation ($repositoryId: ID!) {
		addStar(input: {starrableId: $repositoryId}) {
			starrable {
				viewerHasStarred
			}
		}
	}
`;
