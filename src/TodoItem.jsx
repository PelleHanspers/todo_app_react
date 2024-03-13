export default function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={e => toggleTodo(id, e.target.checked)}
                />
                {title} <br />
                {id}
            </label>
            <button
                //compare with onClick={deleteTodo(todo.id)} where the function deleteTodo is called
                //autmatically and returning the result straight away, removing the todo as soon as it 
                //is created - instead '() =>' creates a function that in turn calls deleteTodo when button
                //is clicked
                onClick={() => deleteTodo(id)}
                className="btn btn-danger"
            >
                Delete
            </button>
        </li>
  )
}