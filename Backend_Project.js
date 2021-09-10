var http = require('http')
var url = require('url')

const {customerinfo,addcustomer} = require('./Data/customer')
const {foodlist,addfood} = require('./Data/food')
const {orderFood,orderStatus,orderinfo,} = require('./Data/order')
const {payfororder} = require('./Data/payment')

http.createServer(function (req, res) {
    
    var request_path = url.parse(req.url, true)
    var message = ''
    var data
    var status = 200
    var regid = /\d{1,2}/
    var regstring = /^[a-zA-z]+$/
    var regemail = /^([a-zA-z.-_]+)@(\w+)(\.[a-zA-z.]+)$/
    var regphone = /[0][689]\d{8}/
    var regprice = /\d{1,9}/

    switch(request_path.pathname) {
        
        case '/customer_info': 
            try {

                let customer_id = request_path.query.customer_id

                if(regid.test(customer_id)){
                    data = customerinfo(customer_id)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }

            } catch(err) {
                message += err
                status = 204
                console.log(err)
            }
            break

        case '/food_list':
            try {
                data = foodlist()
            } catch(err) {
                message += err
                status = 204
                console.log(err)
            }
            break
        
        case '/add_food': 
            try {

                let food_name = request_path.query.food_name
                let food_price = request_path.query.food_price

                if(regstring.test(food_name)&&regprice.test(food_price)){
                    data = addfood(food_name,food_price)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }
                
            } catch(err) {
                message += err
                status = 204
                console.log(err)
            }
            break
        
        case '/add_customer':
            try{

                let firstname = request_path.query.firstname
                let lastname = request_path.query.lastname
                let email = request_path.query.email
                let phone = request_path.query.phone

                if(regstring.test(firstname)&&regstring.test(lastname)&&regemail.test(email)&&regphone.test(phone)){
                    data = addcustomer(firstname,lastname,email,phone)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }
                
            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
        
        case '/order_food':
            try{

                let customer_id = request_path.query.customer_id
                let food_id = request_path.query.food_id
                let qty = request_path.query.qty

                if(regid.test(customer_id)&&regid.test(food_id)&&regprice.test(qty)){
                    data = orderFood(customer_id,food_id,qty)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }
                
            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
        
        case '/order_status':
            try{

                let order_id = request_path.query.order_id

                if(regid.test(order_id)){
                    data = orderStatus(order_id)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }
                
            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
        
        case '/pay_order':
            try{

                let order_id = request_path.query.order_id

                if(regid.test(order_id)){
                    data = payfororder(order_id)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }

            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
        
        case '/order_info':
            try{

                let order_id = request_path.query.order_id

                if(regid.test(order_id)){
                    data = orderinfo(order_id)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }

            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break

    }   

    let response_object = {
        statusCode: status,
        message: message,
        data: data
    }

	res.writeHead(200, {'Content-Type': 'application/json'})
	res.end(JSON.stringify(response_object))
    
}).listen(8080)
console.log('Food Delivery application is running on port 8080.')

