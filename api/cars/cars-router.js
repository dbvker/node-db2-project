const Car = require('./cars-model');
const router = require('express').Router();
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');

router.get('/', (req, res, next) => {
    Car.getAll()
        .then(cars => {
            res.json(cars);
        }).catch(next);
});

router.get('/:id', checkCarId, (req, res, next) => {
    const { id } = req.params;
    Car.getById(id)
        .then(car => {
            if (car) {
                res.json(car);
            } else {
                next();
            }
        }).catch(next);
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    Car.create(req.body)
        .then(newCar => {
            res.json(newCar);
        }).catch(next);
});

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'There was an error in cars router.',
        message: err.message,
        stack: err.stack,
    });
})

module.exports = router;