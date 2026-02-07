"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_controller_1 = require("../controllers/data.controller");
const router = (0, express_1.Router)();
router.post("/", data_controller_1.submitData);
exports.default = router;
//# sourceMappingURL=data.js.map