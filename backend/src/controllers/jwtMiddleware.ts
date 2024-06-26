import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: any;
}

export const checkJwt = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as any;
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).send('Invalid token');
    }
};
