import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deletePerson } from "../app/actions";
import { createPortal } from "react-dom";
import Modal from "../shared/components/Modal";

const Home = () => {
	const { persons } = useSelector((state) => state.persons);
	const [modal, setModal] = useState();
	const refId = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleEdit = (id) => {
		navigate(`/edit-person/${id}`);
	};
	const handleDelete = (id) => {
		dispatch(deletePerson(id));
		setModal(false);
	};
	return (
		<div className="home">
			<div className="home-container">
				<div className="home-header">
					<h1>PERSON LIST</h1>
					<Link to="/create" className="btn-primary">
						+ Create Person
					</Link>
				</div>
				<div className="table">
					<table>
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Email</th>
								<th>Password</th>
								<th>City</th>
								<th>State</th>
								<th>Date</th>
								<th>Age</th>
								<th>Address</th>
								<th>Profile Img</th>
								<th>Fav Color</th>
								<th>isActive</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{persons?.length > 0 &&
								persons?.map((person, index) => {
									return (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{person?.name || "N/A"}</td>
											<td>{person?.email || "N/A"}</td>
											<td>{person?.password || "N/A"}</td>
											<td>{person?.city?.label || "N/A"}</td>
											<td>{person?.state?.label || "N/A"}</td>
											<td>{person?.date || "N/A"}</td>
											<td>{`${person?.age || 0} Years`}</td>
											<td>{person?.address || "N/A"}</td>
											<td>{person?.profileImage?.[0]?.name || "N/A"}</td>
											<td>
												<div
													style={{
														backgroundColor: person?.favColor,
														width: "100%",
														height: "24px",
														color: "white",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														borderRadius: "6px",
													}}
												>
													{person?.favColor}
												</div>
												{!person?.favColor && "N/A"}
											</td>
											<td>{person?.isActive ? "TRUE" : "FALSE"}</td>
											<td>
												<div className="action-btns">
													<span onClick={() => handleEdit(person?.id)}>
														<FaRegEdit />
													</span>
													<span
														onClick={() => {
															setModal(true);
															refId.current = person?.id;
														}}
													>
														<MdDelete />
													</span>
												</div>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
					{persons?.length === 0 && (
						<h4 className="no-data">Oops! No Data Found</h4>
					)}
				</div>
				{modal &&
					createPortal(
						<Modal
							onClose={() => setModal(false)}
							handleDelete={handleDelete}
							personId={refId.current}
							// person={person}
						/>,
						document.body
					)}
			</div>
		</div>
	);
};

export default Home;
