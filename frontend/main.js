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

    deleteButton.addEventListener("click", () => deleteContact(contact.id));

    container.appendChild(clone);
  });
}

// Add Contacts (POST)
document.getElementById("contactForm").addEventListener("submit", addContact);

async function addContact(e) {
  // To prevent default page reloads before JS finishes
  e.preventDefault();

  const contact = {
    name: document.getElementById("name").value,

    phone: document.getElementById("phone").value,

    email: document.getElementById("email").value,
  };

  //   fetch sends an HTTP request
  await fetch(API_URL, {
    method: "POST",

    // For backend to understand the format of the data (JSON) that we are sending
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(contact),
  });

  loadContacts();
}

// Delete contacts
async function deleteContact(contactId) {
  const confirmed = confirm("Are you sure you want to delete this contact?");

  if (!confirmed) {
    return;
  }

  await fetch(`${API_URL}${contactId}/`, {
    method: "DELETE",
  });

  loadContacts();
}

let selectedContactId = null;

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
    }
}

loadContacts();

document
    .getElementById(
        "updateBtn"
    )
    .addEventListener(
        "click",
        updateContact
    );

