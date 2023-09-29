"use strict";
async function listTask() {
	const container = document.querySelector(".order_section_content");
	const gif_loader = document.querySelector(".gif_img_orders");
	const headers = {
		Authorization: "basic 68ceff06-2039-45d6-b617-a84ee6b319c1",
	};
	const endpoint =
		"https://9cxlt1wgo5.execute-api.us-east-1.amazonaws.com/api/orders";
	const options = {
		method: "GET",
		headers: headers,
	};
	try {
		gif_loader.style.display = "block";
		// container.style.display = "none";
		const response = await fetch(endpoint, options);
		if (response.status === 200) {
			gif_loader.style.display = "none";
			// container.style.display = "display";
		} else {
			alert("error");
		}
		const data = await response.json();
		document.querySelector(".number_of_ord").textContent = data.length;

		console.log(data);
		for (const res of data) {
			console.log(res);
			const html = `<div class="order_box">
				<h2 class="name">${res.name}</h2>
				<h3 class="address">Address: <span>${res.address}</span></h3>
				<h3 class="style">Style: <span>${res.style}</span></h3>
				<h3 class="crust">Crust: <span>${res.crust}</span></h3>
				<h3 class="cheese">Extra Cheese: <span>${
					res.cheese ? "yes" : "false"
				}</span></h3>
				<div class="remove_btn">Remove</div>
			</div>`;
			container.innerHTML += html;
		}
		const removeButtons = document.querySelectorAll(".remove_btn");
		removeButtons.forEach((button) => {
			button.addEventListener("click", () => {
				const orderBox = button.parentElement;
				const selectedName =
					orderBox.querySelector(".name").textContent;
				console.log(selectedName);
				data.forEach((el) => {
					if (el.name === selectedName) {
						console.log(el);
						const endpoint2 = `https://9cxlt1wgo5.execute-api.us-east-1.amazonaws.com/api/orders/${el.id}`;
						const options2 = {
							method: "DELETE",
							headers: headers,
						};
						orderBox.querySelector(".remove_btn").textContent =
							"Removing....";
						gif_loader.style.display = "block";
						// container.style.display = "none";
						fetch(endpoint2, options2)
							.then((response) => {
								console.log(response);
								if (response.status === 200) {
									container.removeChild(orderBox);
									gif_loader.style.display = "none";
									// container.style.display = "block";
									location.reload();
									// console.log(data);
								}
							})
							.catch((err) => {
								alert(err);
							});
					}
				});
			});
		});
		console.log("Response:", response);
	} catch (error) {
		console.log("Error:", error);
	}
}
