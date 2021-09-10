const food = require('./food')
const customer = require('./customer')

const order = new Map()
order.set(0,{customer_name:'Ying DII',food_name:'Burger',type:'Single',food_price:250,qty:25,total_price:6250,status:'Waiting For Payment'})
order.set(1,{customer_name:'Tom Cruise',food_name:'PadThai',type:'Single',food_price:50,qty:2,total_price:100,status:'Waiting For Payment'})
order.set(2,{customer_name:'James Potter',menu_id:'0',type:'Menu',itemlist:'[13 Burger(s) (13*250),12 Pizza(s) (12*200)]',total_price:15000,status:'Waiting For Payment'})

orderFood = (customer_id,food_id,qty) => {
    //POST
    let price = food.food.get(food_id).price * qty
    let name = `${customer.customer.get(customer_id).firstname} ${customer.customer.get(customer_id).lastname}`
    order.set(order.size+1,{customer_name:name,food_name:food.food.get(food_id).item,type:'Single',food_price:food.food.get(food_id).price,qty:qty,total_price:price,status:'Waiting For Payment'})
    return order.get(order.size)
}

orderStatus = (order_id) => {
    //GET
    return order.get(order_id).status
}

orderinfo = (order_id) => {
    //GET
    let id = parseInt(order_id)
    if(order.has(id)){
        return order.get(id)
    }else{
        return 'Order Not Found'
    }
}

module.exports = {
    orderFood:orderFood,
    orderStatus:orderStatus,
    orderinfo:orderinfo,
    order:order,
}