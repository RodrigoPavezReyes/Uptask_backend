"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
exports.corsConfig = {
    origin: function (origin, callback) {
        const whilelist = [process.env.FRONTEND_URL];
        if (whilelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Error de CORS'));
        }
    }
};
//# sourceMappingURL=cors.js.map