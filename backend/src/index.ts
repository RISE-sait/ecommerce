require('dotenv').config();
import express, { Request, Response } from 'express';
const cors = require('cors')

const sqlCommands = require('./sqlCommands')
const Stripe = require('stripe');
const apiKey = process.env.KSPORTS_STRIPE_API_KEY
const stripe = new Stripe(apiKey)
const db = require('./postgresConfig')

const app = express()

app.use(express.json())
// const domain = "https://k-sports.vercel.app"
const domain = "http://localhost:3001"

const corsOptions = {
    origin: function (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
        if (origin == domain || origin == "http://localhost:3000" || origin == "http://localhost:3001" ) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
    res.send('response from ksports')
})

app.post('/products', (req, res) => {

    const { ids, productName, minPrice, maxPrice, priceSort, subDirs } = req.body
    db.pool.query(sqlCommands.SELECT_PRODUCTS(
        ids, productName, minPrice, maxPrice, priceSort, subDirs
    ), (err: Error, results: any) => {
        if (err) {
            console.log(err)
            res.json(err)
        }
        if (results) res.json(results.rows)
    })
})

app.post('/selectDistinctColVals', (req, res) => {
    const { colName } = req.body
    db.pool.query(sqlCommands.SELECT_DISTINCT_VAL_FROM_COLUMN(colName), (err: Error, results: any) => {
        if (err) throw (err)
        if (results) {
            res.json(results.rows.map((row: any) => row[colName]))
        }
    })
})

app.post('/selectColWhereUpperDirOverlap', (req, res) => {
    const { subDirVals } = req.body
    db.pool.query(sqlCommands.SELECT_COL_WHERE_DIR_OVERLAP(subDirVals), (err: Error, results: any) => {
        if (err) res.json(err)
        if (results) {
            res.json(results.rows.map((row: any) => row[`subDir${subDirVals.length}`]).filter((val: any) => val !== null))
        }
    })
})

app.post('/checkColumnExist', (req, res) => {
    const { colName } = req.body
    db.pool.query(sqlCommands.CHECK_IF_COLUMN_EXIST(colName), (err: Error, results: any) => {
        if (err) throw (err)
        if (results) res.json(results.rows)
    })
})

app.post("/checkout", async (req, res) => {

    const checkoutProducts = req.body

    try {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: checkoutProducts,
            success_url: domain + "/paymentsuccess?orderID={CHECKOUT_SESSION_ID}",
            cancel_url: domain + "/paymentfailed",
            metadata: { checkoutProducts: JSON.stringify(checkoutProducts) }
        })

        res.json({ url: session.url })
    }
    catch (err) {
        res.json({ error: err })
    }
})

app.post("/getPurchasedItems", (req, res) => {

    try {
        const { orderNumber } = req.body

        stripe.checkout.sessions.retrieve(orderNumber).then((paymentInfo: any) => {
            res.json({ paymentInfo })
        })
    }
    catch (err) {
        res.json({ error: err })
    }
})

/* 

Users

*/

app.post('/createAcc', (req, res) => {
    const { email, password } = req.body
    db.pool.query(sqlCommands.CREATE_USER(email, password), (err: Error, results: any) => {
        if (err) throw (err)
        if (results) res.json(results.rows)
    })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    db.pool.query(sqlCommands.LOGIN_USER(email, password), (err: Error, results: any) => {
        if (err) throw (err)
        if (results) res.json(results.rows)
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('connected')
})