/* eslint-disable no-case-declarations */
const initialState = {
	persons: [
		{
			id: 1576996323453,
			name: "Nikunj",
			email: "nikunj.thesiya@yudiz.com",
			password: "Nikunj@8055",
			date: "2023-03-18",
			city: {
				id: "1",
				label: "Ahmedabad",
				value: "ahmedabad",
			},
			state: {
				id: "1",
				label: "Gujarat",
				value: "gujarat",
			},
			age: "21",
			isActive: true,
			favColor: "#000000",
			address: "Opera Royal",
		},
	],
};

const personListReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_PERSONS_LIST":
			return {
				persons: [...state.persons, action.payload],
			};
		case "UPDATE_PERSONS_LIST":
			const updatedPersons = state.persons?.map((person) => {
				return person.id == action.payload?.id ? action.payload : person;
			});
			state = updatedPersons;
			return { persons: state };
		case "DELETE_PERSON":
			return {
				persons: state.persons?.filter(
					(person) => person?.id !== action.payload
				),
			};
		default:
			return state;
	}
};

export default personListReducer;
