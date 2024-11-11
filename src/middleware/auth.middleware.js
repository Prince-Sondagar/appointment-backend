import { findUser } from "../services/user.service.js";
import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {

    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
      
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { userId } = decoded;
            const user = await findUser({ _id: userId });
            req.user = user;

            next();
        } catch (err) {
            res.status(403).json({ message: 'Invalid or expired token.' });
        }
    }
}

export default authMiddleware;
