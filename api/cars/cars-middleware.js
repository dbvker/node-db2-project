const db = require('../../data/db-config');
const Car = require('./cars-model');
var vinValidator = require('vin-validator');


const checkCarId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Car.getById(id);
    if (!result) {
      next({ status: 404, message: `car with id ${id} is not found` })
    } else {
      req.result = result;
      next();
    }
  } catch (err) {
    next(err);
  }
}

const checkCarPayload = (req, res, next) => {
    const error = { status: 400 };
    const { vin, make, model, mileage } = req.body;

    if (!vin) {
      error.message = 'vin is missing';
    } else if (!make) {
      error.message = 'make is missing';
    } else if (!model) {
      error.message = 'model is missing';
    } else if (!mileage) {
      error.message = 'mileage is missing';
    }

    if (error.message) {
      next(error);
    } else {
      next();
    }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  const isValidVin = vinValidator.validate(vin);

  if (isValidVin) {
    next();
  } else {
    next({ status: 400, message: `vin ${vin} is invalid` })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;
  try {
    const existingVin = await db('cars').where('vin', vin).first();
    if (existingVin) {
      next({ status: 400, message: `vin ${vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}