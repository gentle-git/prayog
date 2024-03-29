const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyAuth = require('../middleware/verifyAuth');

const isAlphaWithSpaces = (value) => /^[A-Za-z\s]+$/.test(value);

//Register API
router.post('/register', [
    body('name', 'Invalid Name').notEmpty().custom(isAlphaWithSpaces).isLength({ min: 5 }),
    body('email', 'Invalid Email').notEmpty().isEmail(),
    body('password', 'Invalid Password').notEmpty().isAlphanumeric().isLength({ min: 8 }),
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).send({ success: false, error: error.array() });
        return;
    }
    try {
        const student = await Student.findOne({ email: req.body.email });
        if (student) {
            res.status(400).send({ success: false, error: 'Email Already Exists' });
            return;
        }
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = await Student.create({
            name: req.body.name,
            rollNo: req.body.rollNo,
            password: hashedPass,
            email: req.body.email,
            college: req.body.college,
            degree: req.body.degree,
        })
        if (user) {
            const JWT_SIGN = process.env.JWT_SECRET;
            const authToken = jwt.sign({ user: { id: user.id } }, JWT_SIGN);
            res.json({ success: true, token: authToken });
        }

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, error: 'Server Error' });
    }
})

//Login API
router.post('/login', [
    body('email', 'Invalid Email').notEmpty().isEmail(),
    body('password', 'Invalid Password').notEmpty()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.send({ success: false, error: 'Invalid Fields' });
        return;
    }
    try {
        const student = await Student.findOne({ email: req.body.email });
        if (!student) {
            res.send({ success: false, error: 'Account Does Not Exists' });
            return;
        }
        if (await bcrypt.compare(req.body.password, student.password)) {
            if (!student.verified) {
                res.send({ success:false, error: 'Account not verified yet\n Contact your college' });
                return;
            }
            const JWT_SIGN = process.env.JWT_SECRET;
            const authToken = jwt.sign({ user: { id: student.id } }, JWT_SIGN);
            res.json({ success: true, token: authToken, type: 'student' });
        } else {
            res.send({ success: false, error: 'Password does not match' });
            return;
        }
    } catch (error) {
        res.json({ success: false, error: "Server Error" });
    }
})

router.post('/get-details', verifyAuth, async (req, res) => {
    try {
        const id = req.user.id;
        const student = await Student.findById(id).select("-password");
        let details = student.toObject();
        details.type = 'student';
        res.send({ validated: true, success: true, details })
    } catch (error) {
        res.status(400).send({ success: false, error: 'Server Error' });
    }
})

module.exports = router