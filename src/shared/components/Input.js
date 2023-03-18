import React, { Component } from "react";

class Input extends Component {
	render() {
		const {
			label,
			type,
			name,
			age,
			placeholder,
			error,
			register,
			inputClass,
			onChange,
			validation,
			id,
			...restInputProps
		} = this.props;
		const setRegister = register(name, validation);
		return (
			<div className="input">
				<div className="label">
					{label && <label>{label}</label>}
					{age && <label>{age || 0} Years</label>}
				</div>
				<div className={type === "checkbox" ? "switch" : ""}>
					{type === "textarea" ? (
						<textarea
							name={name}
							placeholder={placeholder}
							className={inputClass}
							{...setRegister}
							onChange={(e) => {
								setRegister.onChange(e);
								onChange && onChange(e);
							}}
							{...restInputProps}
						/>
					) : (
						<input
							type={type}
							name={name}
							placeholder={placeholder}
							{...setRegister}
							{...restInputProps}
							onChange={(e) => {
								setRegister.onChange(e);
								onChange && onChange(e);
							}}
							className={inputClass}
							id={id}
						/>
					)}
					{type === "checkbox" && (
						<label htmlFor="isActive" className="slider round"></label>
					)}
					{error && error?.message && (
						<span className="input-error">{error?.message}</span>
					)}
				</div>
			</div>
		);
	}
}

export default Input;
