const form = document.getElementById("user-form");
const peopleList = document.getElementById("people-list");
const message = document.getElementById("message");

function validateField(fieldName, value) {
  if (!value.trim()) return `${fieldName} is required.`;

  if (fieldName === "Age") {
    const age = parseInt(value, 10);
    if (isNaN(age) || age <= 0) return "Age must be a number greater than 0.";
  }

  if (fieldName === "Email Address") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Email format is invalid.";
  }

  return null;
}

function addPersonToList(person) {
  const li = document.createElement("li");
  li.className = "person-row";
  
  li.innerHTML = `
    <span class="cell">${person.name}</span>
    <span class="cell">${person.email}</span>
    <span class="cell">${person.age}</span>
  `;

  peopleList.appendChild(li);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  message.textContent = "";

  const name = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;

  const errors = [
    validateField("Full Name", name),
    validateField("Email Address", email),
    validateField("Age", age),
  ].filter(Boolean);

  if (errors.length > 0) {
    message.textContent = errors[0];
    return;
  }

  if (parseInt(age, 10) <= 18) {
    message.textContent = "You must be over 18 to submit.";
    return;
  }

  addPersonToList({ name, email, age });
  form.reset();
});
