const router = require("express").Router();
const User = require("../model/user");
const auth = require("../middleware/auth");

/* these are REST endpoints */

router.post("/", auth({ block: true })); // save route to db

router.get("/", auth({ block: true })); // display the user's dashboard

router.get("/:routeId", auth({ block: true })); // display selected route

/* change "description" from body */
/* set public from /:routeId?isPublic=true */
router.patch("/:routeId", auth({ block: true })); // update and response with updated document

router.delete("/:routeId", auth({ block: true })); // isDeleted: true ;)

// router.get("/:id/todos", auth({ block: true }), allTodos);

// router.get("/:id/todos/:todoId", auth({ block: true }), todoById);

// router.post("/:id/todos"); // create a todo and send todo :id back

// router.patch("/:id/todos/:id", controller); // update and send updated todo :id back

// router.delete("/:id/todos/:id", controller); // isDeleted: true ;)

module.exports = router;
