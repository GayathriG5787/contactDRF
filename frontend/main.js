const API_URL = "http://127.0.0.1:8000/contacts/";

// Load Contacts
async function loadContacts() {
  const response = await fetch(API_URL);
  // response.json() converts json data into JS object
  const contacts = await response.json();
  renderContacts(contacts);
}

// Display Contacts
function renderContacts(contacts) {
  const container = document.getElementById("contactList");

  const template = document.getElementById("contact-template");

  // All the HTML inside this container will be cleared
  container.innerHTML = "";

  contacts.forEach((contact) => {
    // template.content gives the HTML that is stored inside template tag
    // cloneNode(true) creates copy of the node
    const clone = template.content.cloneNode(true);

    // querySelector() finds the first element inside clone that has class contact-name
    clone.querySelector(".contact-name").textContent = contact.name;

    clone.querySelector(".contact-phone").textContent = contact.phone;

    clone.querySelector(".contact-email").textContent = contact.email;

    const editButton = clone.querySelector(".edit-btn");

    editButton.addEventListener("click", () => openEditModal(contact));

    const deleteButton = clone.querySelector(".delete-btn");

    deleteButton.addEventListener(
        "click",
        () => openDeleteModal(contact.id)
    );
    container.appendChild(clone);
  });
}

// Add Contacts (POST)
document.getElementById("contactForm").addEventListener("submit", addContact);

async function addContact(e) {
    e.preventDefault();

    clearError();

    const form = document.getElementById("contactForm");

    const contact = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
    });

    if (response.ok) {
        clearError();
        form.reset();
        loadContacts();
            showSuccessToast(
        "Contact saved successfully!"
    );
        return;
    }

    const errorData = await response.json();

    showError(formatErrors(errorData));
}

// Delete contacts
async function deleteContact() {

    await fetch(
        `${API_URL}${selectedDeleteId}/`,
        {
            method: "DELETE"
        }
    );

    const modalElement =
        document.getElementById(
            "deleteModal"
        );

    bootstrap.Modal
        .getInstance(modalElement)
        .hide();

    loadContacts();

    showSuccessToast(
        "Contact deleted successfully!"
    );
}

let selectedContactId = null;
let selectedDeleteId = null;

// Modal with prefilled values

function openEditModal(contact) {

    selectedContactId =
        contact.id;

    document.getElementById(
        "editName"
    ).value = contact.name;

    document.getElementById(
        "editPhone"
    ).value = contact.phone;

    document.getElementById(
        "editEmail"
    ).value = contact.email;

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "editModal"
            )
        );

    modal.show();
}

// Edit contacts
async function updateContact() {

    const updatedData = {

        name:
            document.getElementById(
                "editName"
            ).value,

        phone:
            document.getElementById(
                "editPhone"
            ).value,

        email:
            document.getElementById(
                "editEmail"
            ).value
    };

    const response =
        await fetch(
            `${API_URL}${selectedContactId}/`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(
                    updatedData
                )
            }
        );

    if (response.ok) {

        const modalElement =
            document.getElementById(
                "editModal"
            );

        bootstrap.Modal
            .getInstance(
                modalElement
            )
            .hide();

        loadContacts();

            showSuccessToast(
        "Contact updated successfully!"
    );
    }

}





function showError(message) {
    const errorDiv = document.getElementById("errorMessage");
    errorDiv.textContent = message;
    errorDiv.classList.remove("d-none");
}

function clearError() {
    const errorDiv = document.getElementById("errorMessage");
    errorDiv.textContent = "";
    errorDiv.classList.add("d-none");
}

function formatErrors(errors) {
    return Object.entries(errors)
        .map(([field, messages]) => {
            return `${field}: ${messages.join(", ")}`;
        })
        .join("<br>");
}

function openDeleteModal(contactId) {

    selectedDeleteId = contactId;

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "deleteModal"
            )
        );

    modal.show();
}

function showError(message) {
    const errorDiv = document.getElementById("errorMessage");

    errorDiv.innerHTML = message; // use innerHTML because of <br>

    errorDiv.classList.remove("d-none");
}

function showSuccessToast(message) {
    const toastElement =
        document.getElementById("successToast");

    toastElement.querySelector(
        ".toast-body"
    ).textContent = message;

    const toast =
        new bootstrap.Toast(
            toastElement,
            {
                delay: 3000
            }
        );

    toast.show();
}

document
    .getElementById(
        "updateBtn"
    )
    .addEventListener(
        "click",
        updateContact
    );

document
    .getElementById(
        "confirmDeleteBtn"
    )
    .addEventListener(
        "click",
        deleteContact
    );

loadContacts();