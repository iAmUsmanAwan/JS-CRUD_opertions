const apiUrl = 'http://localhost:3000/items';

// Fetch and display items
async function fetchItems() {
    const response = await fetch(apiUrl);
    const items = await response.json();

    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = ''; // Clear the list

    items.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} 
            <button onclick="editItem(${item.id})">Edit</button>
            <button onclick="deleteItem(${item.id})">Delete</button>
        `;
        itemsList.appendChild(listItem);
    });
}

// Add a new item
async function addItem() {
    const itemName = document.getElementById('itemName').value;

    if (itemName.trim()) {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: itemName }),
        });

        if (response.ok) {
            fetchItems(); // Refresh the list
            document.getElementById('itemName').value = ''; // Clear input
        }
    }
}

// Edit an item
async function editItem(id) {
    const newName = prompt('Enter new name:');

    if (newName) {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName }),
        });

        if (response.ok) fetchItems();
    }
}

// Delete an item
async function deleteItem(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) fetchItems();
}

// Attach event listener
document.getElementById('addItem').addEventListener('click', addItem);

// Initial fetch
fetchItems();
