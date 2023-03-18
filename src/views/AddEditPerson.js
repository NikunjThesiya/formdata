import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../shared/components/Input";
import Select from "react-select";
import { CITIES, STATES } from "../constants";
import { useDispatch } from "react-redux";
import { addPersontoList, updatePersontoList } from "../app/actions";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VALIDATION } from "../constants/validations";
import { BiArrowBack } from "react-icons/bi";

const AddEditPerson = () => {
	const { id } = useParams();
	const [age, setAge] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { persons } = useSelector((state) => state.persons);
	useEffect(() => {
		if (id) {
			const personData = persons?.filter((person) => {
				return person?.id?.toString() === id.toString();
			})?.[0];
			reset({
				name: personData?.name,
				email: personData?.email,
				password: personData?.password,
				city: personData?.city,
				state: personData?.state,
				address: personData?.address,
				age: personData?.age,
				date: personData?.date,
				profileImage: personData?.profileImage,
				favColor: personData?.favColor,
				isActive: personData?.isActive,
			});
			setAge(personData?.age);
		}
	}, [id]);

	const {
		register,
		control,
		handleSubmit,
		reset,
		getValues,
		setValue,
		setError,
		formState: { errors },
	} = useForm({
		mode: "all",
		defaultValues: {},
	});
	const values = getValues();

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.result.length > 2097152) {
				// 2MB in bytes
				setError("profileImage", {
					type: "maxSize",
					message: "Selected file is too large. Max size is 2MB.",
				});
				setValue("profileImage", null);
			}
		};
		reader.readAsDataURL(file);
	};

	const addInfo = (data) => {
		if (id) {
			dispatch(updatePersontoList({ ...data, id: id }));
			navigate("/");
		} else {
			dispatch(addPersontoList({ ...data, id: Date.now() }));
			navigate("/");
		}
	};
	return (
		<div className="addEditPerson">
			<form onSubmit={handleSubmit(addInfo)}>
				<div className="addEditPerson-heading">
					<Link to="/" className="btn-back">
						<BiArrowBack />
						<span>Back</span>
					</Link>
					<h1>{id ? "Edit" : "Add"} Person</h1>
				</div>
				<div className="form">
					<Input
						name="name"
						placeholder="Name"
						type="text"
						register={register}
						inputClass={errors?.name && "error-input"}
						validation={VALIDATION.name}
						error={errors?.name}
					/>
					<Input
						name="email"
						placeholder="Email"
						type="text"
						register={register}
						inputClass={errors?.email && "error-input"}
						validation={VALIDATION.email}
						error={errors?.email}
					/>
					<Input
						name="password"
						placeholder="Password"
						type="password"
						validation={VALIDATION.password}
						inputClass={errors?.password && "error-input"}
						register={register}
						error={errors?.password}
					/>
					<div className="input-select">
						<Controller
							control={control}
							name="city"
							render={({ field: { onChange, value = [], ref } }) => (
								<Select
									ref={ref}
									placeholder="Select a City"
									value={value || values?.city}
									options={CITIES}
									getOptionLabel={(option) => option.label}
									getOptionValue={(option) => option.value}
									onChange={(e) => {
										onChange(e);
									}}
								/>
							)}
						/>
						{errors && errors?.city && (
							<span className="input-error">{errors?.city}</span>
						)}
					</div>
					<div className="input-select">
						<Controller
							control={control}
							name="state"
							render={({ field: { onChange, value = [], ref } }) => (
								<Select
									ref={ref}
									placeholder="Select a State"
									value={value || values?.state}
									options={STATES}
									getOptionLabel={(option) => option.label}
									getOptionValue={(option) => option.value}
									onChange={(e) => {
										onChange(e);
									}}
								/>
							)}
						/>
						{errors && errors?.city && (
							<span className="input-error">{errors?.city}</span>
						)}
					</div>
					<Input
						label="Select Birth Date"
						name="date"
						placeholder="date"
						type="date"
						register={register}
						error={errors?.date}
					/>
					<Input
						label="Your Age"
						name="age"
						age={age || 0}
						placeholder="Age"
						type="range"
						min="1"
						max="100"
						onChange={(e) => setAge(e.target.value)}
						register={register}
						error={errors?.age}
					/>
					<Input
						type="textarea"
						name="address"
						placeholder="Address"
						inputClass={errors?.address && "error-input"}
						validation={VALIDATION.address}
						register={register}
						error={errors?.address}
					/>
					<Input
						type="file"
						name="profileImage"
						accept="image/jpg, image/jpeg, image/png"
						register={register}
						inputClass={errors?.profileImage && "error-input"}
						error={errors?.profileImage}
						validation={VALIDATION.image}
						onChange={(e) => handleImageChange(e)}
					/>
					<Input
						label="Select Favorite Color"
						type="color"
						register={register}
						error={errors?.favColor}
						name="favColor"
					/>

					<Input
						label="is Active?"
						type="checkbox"
						id="isActive"
						register={register}
						error={errors?.isActive}
						name="isActive"
					/>
				</div>
				<div className="btn-container">
					<button type="submit" className="btn-primary">
						{id ? "Update" : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddEditPerson;
