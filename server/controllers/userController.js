const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateAccessToken = require('../utils/jwt/genarateToken');

const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            const user = new User({ name, email, password });
            await user.save();

            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

            res.cookie('token', token, {
                httpOnly: true,
                secure:true,
                sameSite: "none",
                maxAge: 60 * 60 * 1000, 
            });
            

            res.status(201).json({ user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({ error: 'Invalid login credentials' });
            }
       
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure:true,
                sameSite: "none",
                maxAge: 60 * 60 * 1000, 
            });
            

            res.json({ user });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },


    getProfile: async (req, res) => {
        try {
            const token = req.cookies.token

            if (!token) {
                return res.status(401).json({ error: 'No token provided' });
            }

            const decoded = jwt.verify(token, JWT_SECRET);
            console.log(decoded,'decode data from toke ')
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({user});
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Invalid token' });
            } else if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired' });
            }
            res.status(500).json({ error: error.message });
        }
    },
 logout :async (req, res) => {
        try {
            console.log('user logout')
            res.cookie('token', '', {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: new Date(0),
                path: '/' 
            });
            console.log('cookie after clearing',req.cookies)
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to logout' });
        }
    },
    
};

module.exports = userController;
