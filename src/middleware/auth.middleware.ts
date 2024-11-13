
import jwt from 'jsonwebtoken'
import { getUser } from '../services/user.service';

const authMiddleware = async (req: any, res: any, next: any) => {

    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
            const { userId } = decoded;
            const user = await getUser({ _id: userId });
            delete user?.password;
            req.user = user;

            next();
        } catch (err) {
            res.status(403).json({ message: 'Invalid or expired token.' });
        }
    }
}

export default authMiddleware;
