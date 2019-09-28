let buttonClicked = 0;
$(document).ready(function() {
	$("#retrieve").click(function() {
		fetch("/getTasks")
			.then(res => {
				return res.json();
			})
			.then(data => {
				if (buttonClicked === 0) {
					for (let x = 0; x < data.length; x++) {
						$("#task-list").append(
							`<li> ${data[x].item} <button class = "remove">X</button></li>`
						);
						buttonClicked++;
					}
				}
			});
	});
	$("#task-button").click(function() {
		fetch("/postTask", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ item: $("#task").val() })
		})
			.then(res => {
				return res.json();
			})
			.then(data => {
				console.log(data);
				$("#task-list").append(
					`<li> ${data} <button class = "remove">X</button></li>`
				);
			});
	});
	$(".remove").click(function() {
		console.log("hi");
		fetch("/removeTask", {
			method: "DELETE",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ item: $(this).text() })
		})
			.then(res => res.json())
			.then(data => {
				$(this).remove();
			});
	});
});
