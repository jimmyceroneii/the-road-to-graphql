export const REMOVE_STAR_FROM_REPOSITORY = `
	mutation ($repositoryId: ID!) {
		removeStar(input: {starrableId: $repositoryId}) {
			starrable {
				viewerHasStarred
			}
		}
	}
`;
