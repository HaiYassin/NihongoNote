import Express from "express"
import cors from "cors"
import bodyParser  from "body-parser"
import mongoose from "mongoose"
import userInfo from "./models/userinfo.js"

const app = Express();

const usernameDb = process.env.MONGO_INITDB_ROOT_USERNAME;
const passwordDb = process.env.MONGO_INITDB_ROOT_PASSWORD;

const database = `mongodb://${usernameDb}:${passwordDb}@mongo:27017`;


//Todo remove serverSelectionTimeoutMS: 5
mongoose
    .connect(
        database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log('Not Connected to DB'))

app.use(cors());

app.use(bodyParser.json());

app.get("/",(req,res)=>{
   res.send("Welcome to docker tutor")
});

app.get(
    "/user-info",
    (req, res) => {
        mongoose
            .model(
                "Userinfo",
                userInfo
            )
            .find(
                {},
                (err, data) => {
                    if(err) {
                        res.send({
                            result: []
                        })
                    } else {
                        res.send({
                            result: data
                        })
                    }
                }
            )
    }
)

app.post(
    "/user-info",
    (req, res) => {
        mongoose
            .model(
                'Userinfo',
                userInfo
            )
            .create(
                req.body,
                (err, data) => {
                    if(err) {
                        res.send({
                            result: []
                        })
                    } else {
                        res.send({
                            result: data
                        })
                    }
                }
            )
    }
)

const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => console.log(`\nServer Started on ${port}`));
