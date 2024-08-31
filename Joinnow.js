let userName;
window.onload = function() {
    userName = localStorage.getItem("userName"); 

    if (userName) {
        let profileCard = document.getElementById("signUpSuccses");
        profileCard.style.display = "flex";
        let signUpform = document.getElementById("form");
        signUpform.style.display = "none";
        let h3Name = document.getElementById("h3Name");
        h3Name.textContent = `Hello, ${userName}`;
    }
}

function sendEmail() {
    const name = document.getElementById("name").value; 
    userName = name; 
    localStorage.setItem("userName", userName); 

    const params = {
        name: name,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    const serviceId = "service_mn8krlg";
    const templateId = "template_5zw04oj";

    emailjs.send(serviceId, templateId, params)
    .then(
        res => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            console.log("Sign up success");
            alert("Sign up success!");

            let profileCard = document.getElementById("signUpSuccses");
            profileCard.style.display = "flex";
            let signUpform = document.getElementById("form");
            signUpform.style.display = "none";
            let h3Name = document.getElementById("h3Name");
            h3Name.textContent = `Hello, ${userName}`;
        }
    )
    .catch(error => {
        console.error("Error:", error);
        alert("Failed. Please try again later.");
    });
}
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("expenses-table-body");
const totalAmountCell = document.getElementById("total-amount");

// Function to update localStorage
function updateLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("totalAmount", totalAmount.toString());
}

// Function to render the expenses table
function renderExpenses() {
    expensesTableBody.innerHTML = ""; // Clear the table body
    expenses.forEach((expense, index) => {
        const newRow = expensesTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        categoryCell.textContent = expense.category;
        amountCell.textContent = `$${expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        dateCell.textContent = expense.date;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            expenses.splice(index, 1);
            totalAmount -= parseFloat(expense.amount);
            updateLocalStorage();
            renderExpenses();
        });
        deleteCell.appendChild(deleteBtn);
    });

    totalAmountCell.textContent = `$${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    totalAmountCell.style.color = `red`;
}

// Initial render
renderExpenses();

addBtn.addEventListener("click", () => {
    const category = categorySelect.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (category === "") {
        alert("Please select a valid category");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }
    if (date === "") {
        alert("Please select a valid date");
        return;
    }

    const newExpense = { category, amount, date };
    expenses.push(newExpense);
    totalAmount += amount;

    updateLocalStorage();
    renderExpenses();
    amountInput.value = "";
    categorySelect.value = "";
});





