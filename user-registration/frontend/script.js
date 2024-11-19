const API_URL = 'http://localhost:3000/api/users';

const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();
        const usersTableBody = document.getElementById('usersTableBody');
        usersTableBody.innerHTML = ''; 
        users.forEach((user) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.dob}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${user._id}">Edit</button>
                    <button class="action-btn delete-btn" data-id="${user._id}">Delete</button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });

        
        document.querySelectorAll('.edit-btn').forEach((btn) =>
            btn.addEventListener('click', () => editUser(btn.dataset.id))
        );
        document.querySelectorAll('.delete-btn').forEach((btn) =>
            btn.addEventListener('click', () => deleteUser(btn.dataset.id))
        );
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const saveUser = async (e) => {
    e.preventDefault();
    const id = document.getElementById('userId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;

   
    if (!name || !email || !dob) {
        alert('Please fill in all fields.');
        return;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, dob }),
        });

        if (response.ok) {
          
            resetForm();
            fetchUsers();
        } else {
            const errorData = await response.json();
            alert('Failed to save user: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error saving user:', error);
        alert('An error occurred while saving the user. Please try again.');
    }
};


const editUser = async (id) => {
    try {
        
        console.error('Editing user with ID:', id);
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
            }
            
        const user = await response.json();
        console.log(user); 
        
        document.getElementById('userId').value = user._id;
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('dob').value = user.dob;

        document.getElementById('formHeading').innerText = 'Edit User';
        document.getElementById('submitButton').innerText = 'Update User';
    } catch (error) {
        console.error('Error editing user:', error);
        alert('An error occurred while loading user data.');
    }
};




const deleteUser = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchUsers(); 
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user.');
        }
    }
};

const resetForm = () => {
    document.getElementById('userId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('formHeading').innerText = 'Add User';
    document.getElementById('submitButton').innerText = 'Submit';
};

document.getElementById('userForm').addEventListener('submit', saveUser);
document.getElementById('resetButton').addEventListener('click', resetForm);
document.addEventListener('DOMContentLoaded', fetchUsers);
