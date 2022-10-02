const controller = require("../controllers/user.controller.js");
module.exports = (express, app) => {
    const controller = require("../controllers/post.controller.js");
    const router = express.Router();

    // get all post
    router.get("/getAll", controller.getAll);

    // get single post
    router.post("/getSingle", controller.getSingle);

    // create a new post.
    router.post("/create", controller.create);

    // edit post
    router.post("/edit", controller.edit);

    // delete post
    router.post("/delete", controller.delete);


    // add routes to server.
    app.use("/api/v1/posts", router);
};
