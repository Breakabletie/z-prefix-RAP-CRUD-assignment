const bcrypt = require('bcryptjs');
const db = require('./db');

function seedDatabase() {
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    if (userCount > 0) {
        console.log('Database already has users; skipping seed.');
        return;
    }
    console.log('Seeding initial database with sample managers and items...');
    const passwordHash = bcrypt.hashSync('password123', 10);

    // Create Manager 1
    const insertUser = db.prepare(`
    INSERT INTO users (first_name, last_name, username, password_hash)
    VALUES (?, ?, ?, ?)
  `);
    const u1 = insertUser.run('Alice', 'Smith', 'alice_smith', passwordHash);
    const u2 = insertUser.run('Bob', 'Johnson', 'bob_johnson', passwordHash);
    const insertItem = db.prepare(`
    INSERT INTO items (user_id, item_name, description, quantity)
    VALUES (?, ?, ?, ?)
  `);

    // Alice's items
    insertItem.run(
        Number(u1.lastInsertRowid),
        'Ergonomic Mechanical Keyboard',
        'Custom RGB backlit mechanical keyboard featuring hot-swappable switches, PBT keycaps, and durable aluminum construction designed for long hours of comfortable programming and typing.',
        25
    );
    insertItem.run(
        Number(u1.lastInsertRowid),
        'Wireless Noise-Canceling Headphones',
        'High-fidelity wireless over-ear headphones with active noise cancellation, 40-hour battery life, and crystal-clear microphone audio.',
        12
    );
    insertItem.run(
        Number(u1.lastInsertRowid),
        'Ultra-Wide 34-Inch Curved Monitor',
        'Curved 144Hz WQHD monitor.',
        8
    );

    // Bob's items
    insertItem.run(
        Number(u2.lastInsertRowid),
        'Electric Standing Desk Pro',
        'Dual-motor height adjustable motorized standing desk with solid bamboo desktop, digital memory preset controller, and integrated cable management tray.',
        15
    );
    insertItem.run(
        Number(u2.lastInsertRowid),
        'Heavy-Duty Ergonomic Mesh Chair',
        'Breathable mesh office chair with lumbar support and 3D armrests.',
        30
    );
    console.log('Seed completed successfully!');
}

if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;
