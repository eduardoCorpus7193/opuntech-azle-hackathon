import { Server, ic } from 'azle';
import cors from "cors";
import express, { NextFunction, Request, Response } from 'express';

type Data = {
    id: number,
    city: string,
    stars: number,
    price: number,
};

let data: Data[] = [
    {
        id: 1,
        city: 'Tamaulipas',
        stars: 4.3,
        price: 23.4,
    },
    {
        id: 2,
        city: 'Aguascalientes',
        stars: 4.7,
        price: 28.6,
    },
    {
        id: 3,
        city: 'Aguascalientes',
        stars: 3.7,
        price: 22.1,
    },
    {
        id: 4,
        city: 'León',
        stars: 3.2,
        price: 18.3,
    },
    {
        id: 5,
        city: 'Guadalajara',
        stars: 4.9,
        price: 27.9,
    }
];

type Historial = {
    id: number,
    hour: Date,
    success: boolean
};

let historial: Historial[] = [
    {
        id: 1,
        hour: new Date("2018-03-16T12:00:00"),
        success: true
    },
    {
        id: 2,
        hour: new Date("2018-03-16T12:00:00"),
        success: true
    },
    {
        id: 3,
        hour: new Date("2018-03-16T12:00:00"),
        success: true
    }
];

export default Server(() => {

    const keysDefault = ['id', 'city', 'stars', 'price'];

    const keysDefaultHistorial = ['id', 'hour', 'success']

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get('/whoami', (req, res) => {
        res.statusCode = 200;
        res.send(ic.caller());
    });

        // GET
    app.get('/getData', (req: Request, res) => {
        try {
            res.json(data)
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    });

    app.get('/getHistorial', (req: Request, res) => {
        try {
            res.json(historial)
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    });

    // GET BY STARS
    app.get('/getData/stars/:stars', (req: Request, res) => {
        try {
            if (!req.params.stars) {
                res.status(400).send('Endpoint not valid');
            }
            const stars = +req.params.stars;
            if (!stars) {
                res.status(400).send('Endpoint not valid');
            }
            const filterData = data.filter(d => d.stars > stars);

            res.json(filterData)
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    });

    // GET BY CITY
    app.get('/getData/city/:city', (req: Request, res) => {
        try {
            if (!req.params.city) {
                res.status(400).send('Endpoint not valid');
            }
            const city = req.params.city;
            if (!city) {
                res.status(400).send('Endpoint not valid');
            }
            const filterData = data.filter(d => d.city === city);

            res.json(filterData)
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    });

    // GET BY PRICE
    app.get('/getData/price/:price', (req: Request, res) => {
        try {
            if (!req.params.price) {
                res.status(400).send('Endpoint not valid');
            }
            const price = +req.params.price;
            if (!price) {
                res.status(400).send('Endpoint not valid');
            }
            const filterData = data.filter(d => d.price < price);

            res.json(filterData)
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    });

    // POST
    app.post('/addData', (req, res) => {
        try {
            const { id, city, stars, price } = req.body;
            if (!id || !city || !stars || !price) {
                res.status(404).send('Error');
            }

            const newData: Data = {
                id: req.body.id,
                city: req.body.city,
                stars: req.body.stars,
                price: req.body.price
            }

            data = [...data, newData];
            res.json(data);
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    });

    // POST
    app.post('/addHIstorial', (req, res) => {
        try {
            const { id, hour, success } = req.body;
            if (!id || !hour || !success) {
                res.status(404).send('Error');
            }

            const newHistorial: Historial = {
                id: req.body.id,
                hour: req.body.hour,
                success: req.body.success,
            }

            historial = [...historial, newHistorial];
            res.json(historial);
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    });

    return app.listen();
});