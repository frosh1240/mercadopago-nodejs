import mercadopago from "mercadopago"
import { MERCADOPAGO_API } from "../config"


export const createOrder = async (req,res) => {

    mercadopago.configure({
        access_token: MERCADOPAGO_API
    })

    try{
        const result = await mercadopago.preferences.create({
            items: [
                {
                    title:"Laptop Lenovo",
                    unit_price:500,
                    currency_id: "COP",
                    quantity: 1
                }
            ],
            back_urls: {
                success:"https:localhost:3400/success",
                failure:"https:localhost:3400/failure",
                pending:"https:localhost:3400/pending",
            },
            notification_url: "https://bf9f-186-154-155-49.ngrok-free.app/webhook"
        })
    
        console.log(result.body)
    
        res.json(result.body)
    }catch (error){
        return res.status(500).json({message: "Something goes wrong"})
    }

}

export const receiveWebhook = async (req,res)=> {
    console.log(req.query)

    const payment = req.query
    try{
        if(payment.type === "payment"){
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data)
        }

        res.sendStatus(204)
    }catch (error){
        console.log(error)
        return res.sendStatus(500).json({message: "Something goes wrong"})
    }

}