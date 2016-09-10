import * as express from 'express';
exports.render = function (req: express.Request, res: express.Response) {
    res.sendfile('./public/index.html');
};
