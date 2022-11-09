const addModal = document.querySelector(".add-modal");
const openModalButton = document.querySelector(".footer-btn");
const createButton = document.querySelector(".create-button");
const phoneInput = document.getElementById("add-phone");

const maskPhoneInput = () =>
{
	
	const maskOptions = {
		mask: '+{7} (000) 000-00-00',
		lazy: false,
	};

	IMask(phoneInput, maskOptions);
}

const insertBookItemIntoBookContainer = (name, phoneNumber, isFavorite) => {
	const bookItem = `
	<div class="box-item">
		<div class="box-item-logo">
			<img src="img/person.png" alt="">
		</div>
		<div class="box-item-data">
			<div class="box-item-name">
				${name}
			</div>
			<div class="box-item-phone">
				${phoneNumber}
			</div>
		</div>

		<div class="box-item-buttons">
			<button class="box-item-delete">
				<img class="button-img" src="img/close.png" alt="">
			</button>
			<button class="box-item-favourite">
				<img class="button-love" src="${isFavorite ? "img/heart.png" : "img/empty-heart.png"}" alt="empty">
			</button>
		</div>
</div>`;

	bookContainer.insertAdjacentHTML("beforeend", bookItem);
}

openModalButton.addEventListener("click", () => {
	addModal.style.display = "flex";
	document.body.classList.add("modal-open");
	maskPhoneInput();
})

createButton.addEventListener("click", () => {
	const nameInput = document.getElementById("add-name");
	const phoneInput = document.getElementById("add-phone");
	const checkbox = document.getElementById("is-favorite");

	const handledPhoneNumber = phoneInput.value.replace(/\(|\)|\s|\_|\-/g, "");
	console.log(handledPhoneNumber);
	if (/(?:\+|\d)[\d\-\(\) ]{9,}\d/g.test(handledPhoneNumber) && nameInput.value !== "" && handledPhoneNumber.length === 12) {
		insertBookItemIntoBookContainer(nameInput.value, phoneInput.value, checkbox.checked);
		document.body.classList.remove("modal-open");
		addModal.style.display = "none";
		checkbox.checked = false;
		nameInput.value = "";
		maskPhoneInput()
		listenRemoveButtons();
		listenForFavourite();
		sortBookItems(document.querySelectorAll(".box-item"));
	}
});

