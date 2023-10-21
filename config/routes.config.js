const express = require ("express")
const router = express.Router()
const author = require("../controller/author.controller")


router.get("/authors", author.list),
router.post("/authors", author.create)
router.delete("/authors/:id", author.delete)


module.exports = router