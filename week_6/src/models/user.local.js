// src/models/user.js (Đã sửa lỗi)

const { uuid } = require('uuidv4');
const fs = require('fs');
const path = require('path');

// Định vị file JSON (quan trọng cho tính ổn định)
const DB_FILE = path.join(__dirname, 'db.json');

// --- HÀM HỖ TRỢ ĐỌC/GHI FILE (Sử dụng Đồng bộ) ---

const readUsers = () => {
    try {
        // Đọc dữ liệu đồng bộ
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data); 
    } catch (err) {
        // Nếu file không tồn tại, tạo file mới và trả về mảng rỗng
        if (err.code === 'ENOENT') {
            fs.writeFileSync(DB_FILE, '[]', 'utf8');
            return [];
        }
        console.error('Lỗi khi đọc file DB:', err.message);
        return [];
    }
};

const writeUsers = (data) => {
    const jsonData = JSON.stringify(data, null, 2);
    // Ghi dữ liệu đồng bộ
    fs.writeFileSync(DB_FILE, jsonData, 'utf8'); 
    // console.log('Data written to file successfully'); // Không cần thiết
};

// --- USER MODEL ĐÃ SỬA LỖI ---

const UserModel = {
    getAllUsers() {
        return readUsers(); // ĐỌC LẠI FILE MỖI LẦN
    },
    
    findUserByUsername(username) {
        const users = readUsers(); // ĐỌC LẠI FILE
        // Dùng find()
        return users.find(user => user.username === username) || null;
    },
    
    getUserById(id) {
        const users = readUsers(); // ĐỌC LẠI FILE
        return users.find(user => user.id === id) || null;
    },
    
    insertUser(inputData) {
        const users = readUsers(); // ĐỌC LẠI FILE
        
        const newUser = { 
            id: uuid(), // Tạo ID mới
            ...inputData, 
            created: new Date().toISOString() 
        };
        
        users.push(newUser);
        writeUsers(users); // GHI LẠI TOÀN BỘ MẢNG
    },
    
    updateUser(data, userId) {
        let users = readUsers(); // ĐỌC LẠI FILE
        const index = users.findIndex(user => user.id === userId); // Tìm vị trí

        if (index !== -1) {
            // Cập nhật người dùng bằng cách gộp dữ liệu
            users[index] = { ...users[index], ...data };
            writeUsers(users); // GHI LẠI TOÀN BỘ MẢNG
        }
    },
    
    delUser(id) {
        const users = readUsers(); // ĐỌC LẠI FILE
        const newUsers = users.filter(user => user.id !== id);
        
        if (newUsers.length < users.length) {
            writeUsers(newUsers); // GHI LẠI MẢNG ĐÃ LỌC
            return true;
        }
        return false;
    }
};

module.exports = UserModel;