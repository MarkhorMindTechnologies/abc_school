import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'abc_school_erp_secure_jwt_secret_2026';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User identity not found in institutional database' });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token authorization failed or expired', error: error.message });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Institutional access token missing' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: User role '${req.user?.role}' does not possess required privilege for this endpoint.`
      });
    }
    next();
  };
};
