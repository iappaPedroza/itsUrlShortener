import { config } from '../config/Constants'
import { Request, Response } from 'express'
import shortid from 'shortid'
import { URLModel } from '../database/model/URL'
export class URLController {

    public async shorten(req: Request, res: Response):Promise<void> {

        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL })
        
        if(url) {
            res.json(url)
            return
        }

        const hash = shortid.generate()
        const shortURL = `${config.API_URL}/${hash}`
        const newURL = await URLModel.create({ hash, shortURL, originURL })

        res.json(newURL)
    }

    public async redirect(req: Request, response: Response): Promise<void> {
        
        const { hash } = req.params
        const url = {
            originURL: "https://cloud.mongodb.com/v2/61e97c760675d77ddf739f2e#clusters",
            hash:"By0Ts626Y",
            shorten:"http://localhost:5000/By0Ts626Y"
        }

        // const url = await URLModel.findOne({ hash })
        
        if(url) {
            response.redirect(url.originURL)
            return
        }
        response.status(400).json({ error: 'URL not found' })
    } 
}