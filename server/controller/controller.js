const model = require('../models/model')

//post localhost:8080/api/categories
async function create_Categories(req, res) {
  const Create = new model.Categories({
    type: 'Investment',
    color: '#FCBE44',
  })

  await Create.save()
    .then(() => {
      return res.json(Create)
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: `Error while creating categories ${err}` })
    })
}

//get request http://localhost:8080/api/categories

async function get_Categories(req, res) {
  let data = await model.Categories.find({})
  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color }),
  )
  return res.json(filter)
}

//post localhost:8080/api/transaaction
async function create_Transaction(req, res) {
  if (!req.body) return res.status(400).json('Post HTTP Data not Provided')
  let { name, type, amount } = req.body

  const create = await new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
  })
  create
    .save()
    .then(() => {
      return res.json(create)
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: `Error while creating transaction ${err}` })
    })
}

//get localhost:8080/api/transaaction
async function get_Tranaction(req, res) {
  let data = await model.Transaction.find({})
  return res.json(data)
}

//delete localhost:8080/api/transaaction
async function delete_Transaction(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Request body not found!' })
    }
    await model.Transaction.deleteOne(req.body)
    res.json({ message: 'Record deleted!' })
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting transaction record!' })
  }
}

//get localhost:8080/api/labels
async function get_Labels(req, res) {
  model.Transaction.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'type',
        foreignField: 'type',
        as: 'categories_info',
      },
    },
    {
      $unwind: '$categories_info',
    },
  ]).then((result) => {
      let data  = result.map(v => Object.assign({} , {_id:v._id , name:v.name , type:v.type , amount:v.amount , color:v.categories_info['color']}))
      res.json(data)
    })
    .catch(error => {
      res.status(400).json('Lookup Collection Error')
    })
}

module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Tranaction,
  delete_Transaction,
  get_Labels,
}
