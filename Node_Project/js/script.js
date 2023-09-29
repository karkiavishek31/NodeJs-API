"use strict";
const place_order_btn = document.querySelector("#place_order");
const styleSelect = document.querySelector("#piz_style");
const crustSelect = document.querySelector("#crust");
const pizzaImage = document.getElementById("pizzaImage");
let selectedOption = "";
let selectedCrust = "";
let styleSelected,
	crustSelected,
	nameSelected,
	addressSelected = false;
styleSelect.addEventListener("change", function () {
	selectedOption = styleSelect.options[styleSelect.selectedIndex].value;
	console.log(selectedOption.toLowerCase());
	pizzaImage.src = `../images/${selectedOption.toLowerCase()}.jpg`;
	// selectedStyleText.textContent = `Selected style: ${selectedOption}`;
});
crustSelect.addEventListener("change", function () {
	selectedCrust = crustSelect.options[crustSelect.selectedIndex].value;
	console.log(selectedCrust.toLocaleLowerCase());
	// selectedStyleText.textContent = `Selected style: ${selectedOption}`;
});
place_order_btn.addEventListener("click", function (e) {
	e.preventDefault();
	const name = document.getElementById("name").value;
	const address = document.getElementById("address").value;
	const styleError = document.getElementById("style-error");
	const crustError = document.getElementById("crusts-error");
	const nameError = document.getElementById("name-error");
	const addressError = document.getElementById("address-error");
	// styleError.style.display = "block";
	if (
		selectedOption.toLowerCase() === "select" ||
		selectedOption.toLowerCase() === ""
	) {
		styleError.style.display = "block";
	} else {
		styleError.style.display = "none";
		styleSelected = true;
	}
	if (
		selectedCrust.toLowerCase() == "select" ||
		selectedCrust.toLowerCase() == ""
	) {
		crustError.style.display = "block";
	} else {
		crustError.style.display = "none";
		crustSelected = true;
	}
	if (name == "") {
		nameError.style.display = "block";
	} else {
		nameError.style.display = "none";
		nameSelected = true;
	}
	if (address == "") {
		addressError.style.display = "block";
	} else {
		addressError.style.display = "none";
		addressSelected = true;
	}
	if (styleSelected && crustSelected && nameSelected && addressSelected) {
		// console.log("why?");
		saveTask();
		// styleSelect.selectedIndex = 0;
		// crustSelect.selectedIndex = 0;
		// document.getElementById("name").value = "";
		// document.getElementById("address").value = "";
	}
});

/*--------------------------Async/Await operations---------------*/
// console.log(document.querySelector("#extra-cheese").checked);
// console.log(document.querySelector("#name").value);
// console.log(document.querySelector("#address").value);
async function saveTask() {
	const headers = {
		Authorization: "basic 68ceff06-2039-45d6-b617-a84ee6b319c1",
	};
	const data = {
		id: new Date().getTime(),
		style: selectedOption,
		crust: selectedCrust,
		cheese: document.querySelector("#extra-cheese").checked,
		name: document.querySelector("#name").value,
		address: document.querySelector("#address").value,
	};
	const endpoint =
		"https://9cxlt1wgo5.execute-api.us-east-1.amazonaws.com/api/orders";
	const options = {
		method: "POST",
		headers: headers,
		body: JSON.stringify(data),
	};
	try {
		document.querySelector("main").innerHTML =
			"<img src='../images/reload.gif' class='gif_img'>";
		const response = await fetch(endpoint, options);
		console.log("Response:", response);
		if (response.status === 201) {
			document.querySelector(
				"main"
			).innerHTML = `<h1 class='success_text'>Success</h1>`;
		}
	} catch (error) {
		console.log("Error:", error);
	}
}
