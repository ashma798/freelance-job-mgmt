const userModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


    userRegistration = async (req, res) => {
        try {
            const { name, username, email, password, phone, country, role} = req.body;
            const image = req.file ? req.file.filename : null;
            console.log("req:", req.body);

            if (name && username && email && password && country && role) {
                const encryptedPassword = await bcrypt.hash(password, 10);

                const newUser = new UserModel({
                    name,
                    username,
                    email,
                    password: encryptedPassword,
                    phone,
                    country,
                    role,
                    image
                });
                newUser.save()
                    .then((response) => {
                        console.log("response: ", response);

                        return res.status(201).json({
                            success: true,
                            statusCode: 201,
                            message: "User added successfully",
                        });
                    })
                    .catch((error) => {
                        console.log("User creation error:", error);


                        if (error?.code === 11000) {
                            return res.status(200).json({
                                success: false,
                                statusCode: 400,
                                message: "User with same name already exists!"
                            });
                        } else {
                            return res.status(500).json({
                                success: false,
                                statusCode: 500,
                                message: "User adding failed",
                                error: error.message || error,
                            });
                        }
                    })
            } else {
                return res.status(200).json({
                    success: false,
                    statusCode: 400,
                    message: "Missing required fields"
                });
            }

        } catch (err) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    },

    userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (email && password) {
                const userFound = await userModel.findOne({ email: email }).lean();

                if (userFound) {
                    const isPasswordMatch = await bcrypt.compare(password, userFound.password);

                    if (isPasswordMatch) {
                        delete userFound.password;
                        const jwtSecret = process.env.JWT_SECRET;
                        const token = jwt.sign(
                            { userId: userFound?._id,
                                role: userFound?.role },
                            jwtSecret,
                            { expiresIn: '5d' }
                        )
                        console.log("tk:",token);
                        return res.status(200).json({
                            success: true,
                            statusCode: 200,
                            message: "User Login successfully",
                            token: token,
                            user: userFound
                        });
                    } else {
                        return res.status(200).json({
                            success: false,
                            statusCode: 401,
                            message: "Incorrect password!"
                        });
                    }

                } else {
                    return res.status(200).json({
                        success: false,
                        statusCode: 401,
                        message: "User does not exist!"
                    });
                }
            } else {
                return res.status(200).json({
                    success: false,
                    statusCode: 400,
                    message: "Missing required fields"
                });
            }

        } catch (err) {
            console.log("error: ", err);
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    }
module.exports = { userRegistration, userLogin};
