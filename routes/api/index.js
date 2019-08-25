const router = require("express").Router();
const bookRoutes = require("./books");
const booksController = require("../../controllers/bookscontroller");


// book routes
router.use("/books", bookRoutes);

module.exports = router;