export const MockApiService = (() => {
    const USERS_STORAGE_KEY = 'mock_users_data';
    const DELAY_MS = 500; // Simulate network latency

    // Initialize with some dummy data if nothing in localStorage
    const initializeData = () => {
        if (!localStorage.getItem(USERS_STORAGE_KEY)) {
            const initialUsers = [
                { id: crypto.randomUUID(), name: 'Admin User', email: 'admin@example.com', role: 'admin', password: 'password' },
                { id: crypto.randomUUID(), name: 'Manager One', email: 'manager1@example.com', role: 'manager', password: 'password' },
                { id: crypto.randomUUID(), name: 'Regular User', email: 'user1@example.com', role: 'user', password: 'password' },
                { id: crypto.randomUUID(), name: 'Another User', email: 'user2@example.com', role: 'user', password: 'password' },
            ];
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
        }
    };

    // Ensure data is initialized when the service is accessed
    initializeData();

    const getUsers = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
                resolve({ data: users });
            }, DELAY_MS);
        });
    };

    const addUser = (userData) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
                const newUser = { id: crypto.randomUUID(), ...userData }; // Generate unique ID
                users.push(newUser);
                localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
                resolve({ data: newUser });
            }, DELAY_MS);
        });
    };

    const updateUser = (userId, updatedData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
                const index = users.findIndex(u => u.id === userId);
                if (index !== -1) {
                    users[index] = { ...users[index], ...updatedData };
                    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
                    resolve({ data: users[index] });
                } else {
                    reject(new Error('User not found'));
                }
            }, DELAY_MS);
        });
    };

    const deleteUser = (userId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
                const initialLength = users.length;
                users = users.filter(u => u.id !== userId);
                if (users.length < initialLength) {
                    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
                    resolve({ success: true });
                } else {
                    reject(new Error('User not found'));
                }
            }, DELAY_MS);
        });
    };

    // Basic mock login
    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    resolve({ data: user });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, DELAY_MS);
        });
    };

    return { getUsers, addUser, updateUser, deleteUser, login };
})();