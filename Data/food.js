const food = new Map()
food.set(0,{item: 'Pizza', price: 200})
food.set(1,{item: 'Burger', price: 250})
food.set(2,{item: 'SeaFood', price: 150})
food.set(3,{item: 'Krapao', price: 50})

foodlist = () => {
    //GET
    let message = ''
    food.forEach((value,key) => {
        message += ` Item ${key}, ${value.item} Price: ${value.price}`
    })
    return message
}

addfood = (food_name,food_price) => {
    //POST
    food.set(food.size+1,{item: food_name, price: food_price})
    console.log(food)
    return 'Food Added'
}

module.exports = {
    foodlist:foodlist,
    addfood:addfood,
    food:food,
}