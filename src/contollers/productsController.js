
import products from "../Data/Products.js";
import db from "../db.js";
import { faker } from '@faker-js/faker';


//retorna a lista de produtos
export async function getProducts(req, res) {

    try {
        const user = await db.collection("products").find({}).toArray(function (err, results) {
            res.send(results);// output all records
        });

    } catch (error) {
        res.status(500).send(error);
    }
}
//retorna o produto por id
export async function getProduct(req, res) {
    try {
        const user = await db.collection("products").findOne({ id: parseInt(req.params.index) })
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message);
    }
}

export async function putProduct(req, res) {
    try {
        for (let element in req.body) {
            console.log(req.body[element])
            const product = await db.collection("products").findOne({ id: parseInt(req.body[element].id) })
            if (!product) {
                res.sendStatus(404)
                return;
            }
            if (product.stock < req.body[element].stock) {
                res.status(412).send(`Quantidade no stock ${product.stock}`);
                return;
            }

            await db.collection("products").updateOne({
                id: parseInt(req.body[element].id)
            }, { $set: { "stock": product.stock - req.body[element].stock } })
        };
        res.send("ok")
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message);
    }
}

//    elementro tras a posiçao da array        0                      1
// axios.put(`http://localhost:3000/`, [{ id: 0, stock: 10 }, { id: 1, stock: 5 }]),



export async function addProductsColletion(req, res) {
    try {
        // for (let i = 0; i < 5; i++) {
        //     const randomName = faker.name.findName(); // Rowan Nikolaus
        //     const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
        //     const randomCard = faker.helpers.createCard(); // An object representing a random contact card containing many properties
        //     await db.collection("products").insertOne({
        //         randomName, randomEmail, randomCard
        //     });
        // }
        await db.collection("products").insertMany(products);
        res.send("OK");
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message);
    }
}

