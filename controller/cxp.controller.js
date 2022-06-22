const { db } = require("../cnn")


//tabla-Cabecera
const getCabecera = async(req, res) => {
    const response = await db.any('SELECT * FROM public.cabecera order by idcabecera')
    res.json(response)
}



//tabla-detalle-pago

const getDetallePago = async(req, res) => {
        const response = await db.any('SELECT * FROM public.detalle_pago order by id_detalle_pago')
        res.json(response)

    }
    //tabla  fuentes-de-pago

const getFuentePago = async(req, res) => {
    const response = await db.any('SELECT * FROM public.fuentes_de_pago order by codigo')
    res.json(response)

}


const getPizzasByName = async(req, res) => {
    const name = req.params.name
    const response = await db.any(`select * from pizza 
    where piz_state=true and piz_name=$1`, [name])
    res.json(response)
}

const postCreatePizza = async(req, res) => {
    const { piz_name, piz_origin, piz_state } = req.body
    const response = await db.any(`INSERT INTO pizza (piz_name,piz_origin,piz_state) 
    values($1,$2,$3)`, [piz_name, piz_origin, piz_state])
    res.json({
        message: 'Pizza creada correctamente',
        body: {
            piz_name,
            piz_origin,
            piz_state
        }
    })
}

const putUpdatePizza = async(req, res) => {
    const { piz_id, piz_name, piz_origin, piz_state } = req.body
    const response = await db.any(`UPDATE pizza set piz_name=$2, piz_origin=$3, piz_state=$4 
    where piz_id=$1`, [piz_id, piz_name, piz_origin, piz_state])
    res.json({
        message: 'Pizza actualizada correctamente',
        body: {
            piz_id,
            piz_name,
            piz_origin,
            piz_state
        }
    })
}

const deletePizza = async(req, res) => {
    const { piz_id } = req.query
    const response = await db.any(`DELETE FROM pizza  
    where piz_id=$1`, [piz_id])
    res.json({
        message: 'Pizza ELIMINADA correctamente',
        body: {
            piz_id
        }
    })
}

//Ingredients services
const getIngredients = async(req, res) => {
    const response = await db.any('select * from ingredient where ing_state=true;')
    res.json(response)
}

const postCreateIngredients = async(req, res) => {
    const { ing_name, ing_calories, ing_state } = req.body
    const response = await db.any(`INSERT INTO ingredient (ing_name,ing_calories,ing_state) 
    values($1,$2,true)`, [ing_name, ing_calories, ing_state])
    res.json({
        message: 'Ingredients creado correctamente',
        body: {
            ing_name,
            ing_calories,
            ing_state
        }
    })
}

const putUpdateIngredients = async(req, res) => {
    const { ing_id, ing_name, ing_calories } = req.body
    const response = await db.any(`UPDATE ingredient set ing_name=$2, ing_calories=$3 
    where ing_id=$1`, [ing_id, ing_name, ing_calories])
    res.json({
        message: 'Ingredients actualizado correctamente',
        body: {
            ing_id,
            ing_name,
            ing_calories
        }
    })
}

const deleteIngredients = async(req, res) => {
    const { ing_id } = req.query
    const response = await db.any(`DELETE FROM ingredient  
    where ing_id=$1`, [ing_id])
    res.json({
        message: 'Ingredients eliminado correctamente',
        body: {
            ing_id
        }
    })
}

//Pizza Ingredients services
const getPizzaIngredients = async(req, res) => {
    const response = await db.any('select * from pizza_ingredient where piz_ing_state=true;')
    res.json(response)
}

const getPizzaWithIngredients = async(req, res) => {
    try {
        const pizzas = await db.query(`select * from pizza where piz_state=true order by 1`);
        const response = [];
        for (let i = 0; i < pizzas.length; i++) {

            const ingresdientPizza = await db.any(`select i.ing_id, i.ing_name, i.ing_calories 
                                                from pizza p,pizza_ingredient pi, 
                                                ingredient i where  p.piz_id=pi.piz_id 
                                                and i.ing_id=pi.ing_id and pi.piz_id=$1`, [pizzas[i].piz_id]);
            response.push({
                piz_id: pizzas[i].piz_id,
                piz_name: pizzas[i].piz_name,
                ingredient: ingresdientPizza
            })
        }
        res.json(response)
    } catch (error) {
        res.json({ message: 'Problema al obtener el detalle' })
    }
}

const postCreatePizzaIngredients = async(req, res) => {
    const { piz_id, ing_id } = req.body
    const response = await db.any(`INSERT INTO pizza_ingredient (piz_id,ing_id,piz_ing_state) 
    values($1,$2,true)`, [piz_id, ing_id])
    res.json({
        message: 'Pizza Ingredients creado correctamente',
        body: {
            piz_id,
            ing_id
        }
    })
}

const getPizzasIngredientsByPizzaId = async(req, res) => {
    const id = req.params.id
    const response = await db.any(`select pi.piz_ing_id,pi.piz_id,pi.ing_id,i.ing_name,i.ing_calories 
    from pizza_ingredient pi, pizza p, ingredient i where pi.piz_id=p.piz_id and pi.ing_id=i.ing_id 
    and pi.piz_ing_state=true and pi.piz_id=$1`, [id])
    res.json(response)
}

const deletePizzaIngredients = async(req, res) => {
    const { piz_ing_id } = req.query
    const response = await db.any(`DELETE FROM pizza_ingredient  
    where piz_ing_id=$1`, [piz_ing_id])
    res.json({
        message: 'Pizza Ingredients eliminado correctamente',
        body: {
            piz_ing_id
        }
    })
}

module.exports = {
    getCabecera,
    getDetallePago,
    getFuentePago
}