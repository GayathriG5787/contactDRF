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

    container.appendChild(clone);
  });
}

loadContacts();

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

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(contact),
  });

  loadContacts();
}
