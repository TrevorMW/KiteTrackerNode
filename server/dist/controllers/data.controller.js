"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitData = void 0;
const data_service_1 = require("../services/data.service");
const submitData = async (req, res) => {
    const payload = req.body;
    // validation will go here later
    await (0, data_service_1.saveData)(payload);
    res.status(201).json({ success: true });
};
exports.submitData = submitData;
//# sourceMappingURL=data.controller.js.map