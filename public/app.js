document.addEventListener("click", (event) => {
	if (event.target.dataset.type === "remove") {
		const id = event.target.dataset.id

		remove(id).then(() => {
			event.target.closest("li").remove()
		})
	}

	if (event.target.dataset.type === "edit") {
		const id = event.target.dataset.id

		const newTitle = prompt("enter new name")

		edit(id, newTitle).then(() => {
			event.target.closest("li").innerHTML = `
					${newTitle}
					<div class="d-flex justify-content-right gap-2">
						<button class='btn btn-secondary' data-type="edit" data-id="<%= notes[i].id %>">edit</button>
						<button class="btn btn-danger" data-type="remove" data-id="<%= notes[i].id %>">&times;</button>
					</div>
				`
		})
	}
})

async function remove(id) {
	await fetch(`/${id}`, { method: "DELETE" })
}

async function edit(id, title) {
	const editedNote = { id, title }

	await fetch(`/${id}`, {
		method: "PUT",
		body: JSON.stringify(editedNote),
		headers: { "Content-type": "application/json; charset=UTF-8" },
	})
}
