import React, { useState, useEffect } from "react";
import PropTypes, { array } from "prop-types";

//create your first component

export function Todo({ todo, index, removeTodo }) {
	return (
		<div className="todo">
			{todo.text}
			<div>
				<button className="close" onClick={() => removeTodo(index)}>
					X
				</button>
			</div>
		</div>
	);
}

export function TodoForm({ addTodo }) {
	const [value, setValue] = React.useState("");

	const handleSubmit = e => {
		e.preventDefault();
		if (!value) return;
		addTodo(value);
		setValue("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				className="input"
				value={value}
				placeholder={"What needs to be done?"}
				onChange={e => setValue(e.target.value)}
			/>
		</form>
	);
}

export function Home() {
	const [todos, setTodos] = React.useState([
		{ text: "Make the bed" },
		{ text: "Wash my hands" },
		{ text: "Build really cool todo app" }
	]);

	const addTodo = text => {
		const newTodos = [...todos, { text }];
		setTodos(newTodos);
	};

	const removeTodo = index => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	const itemsLeft = () => {
		const newTodos = [...todos];
		let itemsLeft = newTodos.length;
	};

	return (
		<div className="container text-center">
			<h1 className="display-3">todos</h1>
			<ul className="list-group-flush m-3">
				<div className="p-2 lead">
					<TodoForm addTodo={addTodo} />
				</div>
				<li className="list-group-item lead">
					{todos.map((todo, index) => (
						<Todo
							key={index}
							index={index}
							todo={todo}
							removeTodo={removeTodo}
						/>
					))}
					<div className="footer text-left text-muted p-2">
						<small>{todos.length} items left</small>
					</div>
				</li>
			</ul>
		</div>
	);
}

Todo.propTypes = {
	todo: PropTypes.object,
	index: PropTypes.number,
	removeTodo: PropTypes.function
};

TodoForm.propTypes = {
	addTodo: PropTypes.function
};
