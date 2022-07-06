const router = require("express").Router();
const User = require("../model/user");
const auth = require("../middleware/auth");

/* === >>> REST endpoints <<< === */
router.post("/", auth({ block: true }), async (req, res) => {
  if (
    !req.body.description ||
    !req.body.from ||
    !req.body.to ||
    !req.body.coordinates ||
    !req.body.distance ||
    !req.body.tFactor
  )
    return res.status(400).send("Missing data from body");

  const user = await User.findById(res.locals.user.userId);
  if (!user) return res.status(404).send("User not found.");

  user.myRoutes.push({
    description: req.body.description,
    from: req.body.from,
    to: req.body.to,
    coordinates: req.body.coordinates,
    distance: req.body.distance,
    tFactor: req.body.tFactor,
    isPublic: false,
  });

  user
    .save()
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => {
      return res.status(500).json(err);
    }); // return the whole user object
});

/* === >>> <<< === */
/* === >>> display the user's all routes <<< === */
router.get("/", auth({ block: true }), async (req, res) => {
  const user = await User.findById(res.locals.user.userId);
  if (!user) return res.status(404).send("User not found.");

  return res.status(200).json({ username: user.username, myRoutes: user.myRoutes });
});

/* === >>> <<< === */
/* === >>> display the user's selected route only <<< === */
router.get("/:routeId", auth({ block: true }), async (req, res) => {
  const user = await User.findById(res.locals.user.userId);
  if (!user) return res.status(404).send("User not found.");

  const route = user.myRoutes.id(req.params.routeId);
  if (!route) return res.status(404).send("Route not found.");

  return res.status(200).json(route);
});

/* === >>> <<< === */
/* === >>> change "description" from body <<< === */
router.patch("/:routeId", auth({ block: true }), async (req, res) => {
  if (!req.params.routeId) return res.sendStatus(400);
  if (req.body.isPublic !== true && req.body.isPublic !== false && !req.body.description)
    return res.status(400).send("Cannot change the nothing");

  const isPublic = req.body.isPublic;
  // const isPublic = req.body.isPublic === "true"; // convert to boolean

  const user = await User.findById(res.locals.user.userId);
  if (!user) return res.status(404).send("User not found.");

  const route = user.myRoutes.id(req.params.routeId);
  if (!route) return res.status(404).send("Route not found.");

  if (req.body.description && req.body.description !== "") route.description = req.body.description;
  // if (isPublic === true || isPublic === false);
  route.isPublic = isPublic;

  user
    .save()
    .then((user) => {
      return res.status(200).json(user.myRoutes.id(req.params.routeId));
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

/* === >>> <<< === */
/* === >>> delete selected route only <<< === */
router.delete("/:routeId", auth({ block: true }), async (req, res) => {
  if (!req.params.routeId) return res.sendStatus(400);

  const user = await User.findById(res.locals.user.userId);
  if (!user) return res.status(404).send("User not found.");

  User.findByIdAndUpdate(
    res.locals.user.userId,
    {
      $pull: {
        myRoutes: { _id: req.params.routeId },
      },
    },
    { new: true }
  )
    .then((result) => res.status(200).json(result.myRoutes))
    .catch((err) => res.status(404).send("Route not found")); // return all remaining routes
});

module.exports = router;

/*

*/
