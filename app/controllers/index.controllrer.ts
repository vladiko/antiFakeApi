import * as express from 'express';
exports.render = (req: express.Request, res: express.Response) => {
    res.sendfile('./public/index.html');
};
