exports.seed = (knex) => {
    return knex('cars').truncate()
        .then(function () {
            return knex('cars').insert([
                { vin: '123456789', make: 'Chevy', model: "Trailblazer", mileage: 134000 },
                { vin: '123333333', make: 'Dodge', model: "Dart", mileage: 1 },
                { vin: '123455555', make: 'Ford', model: "F-150", mileage: 4000 },
                { vin: '111111111', make: 'Tesla', model: "Model 3", mileage: 34000 },
                { vin: '123232323', make: 'Jeep', model: "Cherokee", mileage: 14000 },
            ]);
        })
}