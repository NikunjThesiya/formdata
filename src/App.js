import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import AddEditPerson from "./views/AddEditPerson";
import Home from "./views/Home";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create" element={<AddEditPerson />} />
					<Route path="/edit-person/:id" element={<AddEditPerson />} />
				</Routes>
			</div>
		);
	}
}

export default App;
