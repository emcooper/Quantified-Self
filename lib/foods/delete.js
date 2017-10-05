$(function() {
  $('.delete-row').click(function(event) {
    alert("hello")
    deleteFood(this.id)
  })
})

function deleteFood(id) {
  $.ajax({
    url:'https://obscure-harbor-85447.herokuapp.com/api/v1/foods/' + id,
    type: 'DELETE'
  })
}
