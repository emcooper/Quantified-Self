var $ = require('jquery')
var api = 'https://obscure-harbor-85447.herokuapp.com/api/v1'
var handlers = require('./handlers')

function createFood(food, calories) {
  $.ajax({
    type: "POST",
    url: api + "/foods",
    data: { food: {
      name: $.trim(food),
      calories: $.trim(calories)
    }},
    success: function(data) {
      handlers.postSuccess(data)
    },
    error: function(error) {
      handlers.postError(error)
    }
  })
}

module.exports = createFood
