let transactions = [];

function addTransaction() {
    const desc = document.getElementById("desc").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (!desc || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        desc: desc,
        amount: amount,
        type: type,
        date: new Date().toLocaleDateString()
    };

    transactions.push(transaction);
    updateUI();
    clearForm();
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateUI();
}

function updateUI() {
    const list = document.getElementById("transaction-list");

    if (transactions.length === 0) {
        list.innerHTML = '<p class="empty-msg">No transactions yet. Add one above!</p>';
    } else {
        list.innerHTML = transactions.map(t => `
            <div class="transaction-item ${t.type}">
                <div>
                    <div class="transaction-desc">${t.desc}</div>
                    <div class="transaction-date">${t.date}</div>
                </div>
                <div class="transaction-right">
                    <span class="transaction-amount">
                        ${t.type === "income" ? "+" : "-"} GH₵ ${t.amount.toFixed(2)}
                    </span>
                    <button class="btn-delete" onclick="deleteTransaction(${t.id})">🗑</button>
                </div>
            </div>
        `).join("");
    }

    const income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    document.getElementById("balance").textContent = `GH₵ ${balance.toFixed(2)}`;
    document.getElementById("total-income").textContent = `GH₵ ${income.toFixed(2)}`;
    document.getElementById("total-expense").textContent = `GH₵ ${expense.toFixed(2)}`;
}

function clearForm() {
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("type").value = "income";
}