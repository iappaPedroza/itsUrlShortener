import { URLController } from './controller/URLController'
import express, { Request, Response} from 'express'
import { MongoConnection } from './database/MongoConnection'

const api = express()
api.use(express.json())

const urlController = new URLController()
const database = new MongoConnection()
database.connect()

api.get('/:hash', urlController.redirect)
api.post('/shorten', urlController.shorten)

/* api.get('/teste', (req: Request, res: Response) => {
    res.json({ success: true})
} ) */

api.listen(5000, () => console.log('ITS - Fase 3 - Preconnection MongoIng - Express listening'))