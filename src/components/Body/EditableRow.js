export default function EditableRow({ task, changeTaskId }){
    return(
        <tr>
            <td>
                <input type="text" required="required" placeholder="task name" name="taskName" />
            </td>
            <td>
                <input type="text" required="required" placeholder="person assigned" name="person assigned" />
            </td>
            <td>
                <input type="text" required="required" placeholder="priority" name="priority" />
            </td>
            <td>
                <input type="text" required="required" placeholder="status" name="status" />
            </td>
            <td>
                <input type="text" required="required" placeholder="project" name="project" />
            </td>
            <td>
                <button className="btn border-secondary btn-light btn-sm">Save</button>
                <button type="button" onClick={() => changeTaskId(null)} className="mx-2 btn border-secondary btn-light btn-sm">Cancel</button>
            </td>
        </tr>
    )
}