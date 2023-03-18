export const VALIDATION = {
	name: {
		required: "This field is required",
		maxLength: {
			value: 15,
			message: "Name should be only 15 characters long",
		},
		pattern: {
			value: /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/,
			message: "Only alphabets are allowed",
		},
	},
	address: {
		required: "This field is required",
		maxLength: {
			value: 500,
			message: "Address should be only 500 characters long",
		},
	},
	email: {
		required: "This field is required",
		pattern: {
			value: /^\S+@\S+\.\S+$/,
			message: "Please enter a valid email address",
		},
	},
	password: {
		required: "This field is required",
		pattern: {
			value: /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9]).+$/,
			message: "Password must have one special character and digit",
		},
	},
	image: {
		required: "This field is required",
	},
};
