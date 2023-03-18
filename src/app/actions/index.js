export const addPersontoList = (person) => {
	return {
		type: "SET_PERSONS_LIST",
		payload: person,
	};
};

export const updatePersontoList = (person) => {
	return {
		type: "UPDATE_PERSONS_LIST",
		payload: person,
	};
};

export const deletePerson = (id) => {
	return {
		type: "DELETE_PERSON",
		payload: id,
	};
};
