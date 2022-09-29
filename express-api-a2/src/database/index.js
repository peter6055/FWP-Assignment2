const {Sequelize, DataTypes} = require("sequelize");
const config = require("./config.js");

const db = {
    Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.follow = require("./models/follow.js")(db.sequelize, DataTypes)
db.reply = require("./models/reply.js")(db.sequelize, DataTypes);
db.reaction = require("./models/reaction.js")(db.sequelize, DataTypes);

// ------------------------------------------------------------------------------ associations --------------------
// --------- Post ---------
// Relate post and user.
db.post.belongsTo(db.user, {foreignKey: {name: "user_id", allowNull: false}});

// --------- Reply ---------
db.reply.belongsTo(db.user, {foreignKey: {name: "user_id", allowNull: false}});
db.reply.belongsTo(db.post, {foreignKey: {name: "parent_post_id", allowNull: false}});
db.reply.belongsTo(db.reply, {foreignKey: {name: "parent_reply_id", allowNull: false}});


// --------- Follow ---------
db.follow.belongsTo(db.user, {foreignKey: {name: "user_id", allowNull: false}});
db.follow.belongsTo(db.user, {foreignKey: {name: "followed_user_id", allowNull: false}});


// --------- Reaction ---------
db.reaction.belongsTo(db.user, {foreignKey: {name: "user_id", allowNull: false}});
db.reaction.belongsTo(db.post, {foreignKey: {name: "post_id", allowNull: false}});


// ------------------------------------------------------------------------------ associations --------------------
// Include a sync option with seed data logic included.
db.sync = async () => {
    // Sync schema.
    await db.sequelize.sync();

    // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
    // await db.sequelize.sync({force: true});

    // await seedData();
};

// async function seedData() {
//   const count = await db.user.count();
//
//   // Only seed data if necessary.
//   if(count > 0)
//     return;
//
//   const argon2 = require("argon2");
//
//   let hash = await argon2.hash("abc123", { type: argon2.argon2id });
//   await db.user.create({ username: "mbolger", password_hash: hash, first_name: "Matthew", last_name : "Bolger" });
//
//   hash = await argon2.hash("def456", { type: argon2.argon2id });
//   await db.user.create({ username: "shekhar", password_hash: hash, first_name: "Shekhar", last_name : "Kalra" });
// }

module.exports = db;
