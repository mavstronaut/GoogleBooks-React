const router = require("express").Router();
const booksController = require("../../controllers/bookscontroller");

// landing page
router.route("/:id").post(booksController.create);

// saved page

router.route("/books/saved/:id").get(booksController.findAllSaved);

// delete call
router.route("/delete/:id").delete(booksController.remove);

module.exports = router;