const express = require("express");
const router = express.Router();
const userData = require('../models/userCollection');
const validateJoiModels = require('../validations/validateJoiModels');
router.post('', async (req, res) => {
    try {
        const options = req.body;
        const joiReturn = validateJoiModels.validate(options, 'createUser');
        if (joiReturn.error) {
            return res.status(400).send({
                status: "Failed",
                error: validateJoiModels.generateValidationResponse(joiReturn)
            })
        }
        const dataFind = await userData.findOne({
            email: options.email
        }, { email: 1 });
        if (dataFind) {
            return res.status(400).send({
                status: "Failed",
                message: "Email already exist"
            })
        }
        const data = await userData.create({
            email: options.email,
            username: options.username,
            password: options.password,
            name: options.name,
            address: options.address,
            phone: options.phone
        })
        return res.status(200).send({
            status: "Success",
            data: data,
            message: "User Added Successfully"
        })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            error: error
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const options = req.body;
        options.id = req.params.id;
        const joiReturn = validateJoiModels.validate(options, 'idValidate');
        if (joiReturn.error) {
            return res.status(400).send({
                status: "Failed",
                error: validateJoiModels.generateValidationResponse(joiReturn)
            })
        }
        const getUserData = await userData.findOne({ _id: options.id }).lean()
        return res.status(200).send({
            status: "Success",
            data: getUserData,
        })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            error: error
        })
    }
})

router.get('', async (req, res) => {
    try {
        const getUserData = await userData.find().lean()
        if (getUserData) {
            return res.status(200).send({
                status: "Success",
                data: getUserData,
            })
        }
        return res.status(400).send({
            status: "User not found"
        })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            error: error
        })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const options = req.body;
        options.id = req.params.id;
        const joiReturn = validateJoiModels.validate(options, 'updateUser');
        if (joiReturn.error) {
            return res.status(400).send({
                status: "Failed",
                error: validateJoiModels.generateValidationResponse(joiReturn)
            })
        }
        const dataFind = await userData.findOne({
            email: options.email,
            _id: { $ne: options.id }
        }, { email: 1 });
        if (dataFind) {
            return res.status(400).send({
                status: "Failed",
                message: "Email already exist"
            })
        }
        const userUpdate = await userData.findByIdAndUpdate({ _id: options.id }, {
            email: options.email,
            username: options.username,
            password: options.password,
            name: options.name,
            address: options.address,
            phone: options.phone
        }, { new: true })
        if (userUpdate === null) {
            return res.status(400).send({
                status: "Failed",
                message: "User Not Found.."
            })
        } else {
            return res.status(200).send({
                status: "Success",
                message: "User Updated.."
            })
        }
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            error: error
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let options = { id: req.params.id };
        const joiReturn = validateJoiModels.validate(options, 'idValidate');
        if (joiReturn.error) {
            return res.status(400).send({
                status: "Failed",
                error: validateJoiModels.generateValidationResponse(joiReturn)
            })
        }
        const deleteUser = await userData.findByIdAndDelete({ _id: options.id })
        if (deleteUser === null || deleteUser === undefined) {
            return res.status(400).send({
                status: "Failed",
                message: "User Not Found.."
            })
        } else {
            return res.status(200).send({
                status: "Success",
                message: "User Delete Successfully..",
                result: deleteUser
            })
        }
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            error: error
        })
    }
})
module.exports = router