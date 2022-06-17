const router = require("express").Router();
const User = require("../model/user");
const auth = require("../middleware/auth");

/* these are REST endpoints */

router.post("/", auth({ block: true }), async (req, res) => {
  if (
    !req.body.description ||
    !req.body.from ||
    !req.body.to ||
    !req.body.coordinates ||
    !req.body.checkpoints ||
    !req.body.distance ||
    !req.body.tFactor
  )
    return res.sendStatus(400);

  const user = await User.findById(res.locals.userId);
  if (!user) return res.status(404).send("User not found.");

  user.myRoutes.push({
    description: req.body.description,
    from: req.body.from,
    to: req.body.to,
    coordinates: req.body.coordinates,
    checkpoints: req.body.checkpoints,
    distance: req.body.distance,
    tFactor: req.body.tFactor,
    isPublic: false,
  });

  user
    .save()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}); // save route to db

router.get("/", auth({ block: true })); // display the user's dashboard

router.get("/:routeId", auth({ block: true })); // display selected route

/* change "description" from body */
/* set public from /:routeId?isPublic=true */
router.patch("/:routeId", auth({ block: true }), async (req, res) => {
  if (!req.params.routeId) return res.sendStatus(400);

  const isPublic = req.query.isPublic;
  if (!isPublic && !req.body.description) return res.sendStatus(400);

  const user = await User.findById(res.locals.userId);
  if (!user) return res.status(404).send("User not found.");

  const route = user.myRoutes.id(req.params.routeId);
  if (!route) return res.status(404).send("Route not found.");

  if (req.body.description) route.description = req.body.description;
  if (isPublic === true || isPublic === false) route.isPublic = isPublic;

  user
    .save()
    .then((user) => {
      return res.status(200).json(user.myRoutes.id(req.params.routeId)); // return route only ?? i hope so
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}); // update and response with updated document

router.delete("/:routeId", auth({ block: true })); // isDeleted: true ;)

// router.get("/:id/todos", auth({ block: true }), allTodos);

// router.get("/:id/todos/:todoId", auth({ block: true }), todoById);

// router.post("/:id/todos"); // create a todo and send todo :id back

// router.patch("/:id/todos/:id", controller); // update and send updated todo :id back

// router.delete("/:id/todos/:id", controller); // isDeleted: true ;)

module.exports = router;
