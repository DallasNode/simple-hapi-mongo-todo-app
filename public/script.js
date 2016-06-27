(function(context) {

  let $list;

  function load() {
    fetchDataAndRender();

    $('input').on('keyup', keyUp);
    $('ol').on('click', '.delete', destroy)

    $list = $('ol');
  }

  function destroy() {
    console.log('destroy', $(this).data('id'));
    $.ajax({
      url: '/api/todo/' + $(this).data('id'),
      method: 'DELETE'
    })
    .done(fetchDataAndRender);
  }

  function fetchDataAndRender() {
    $.ajax({
      url: '/api/todo'
    })
    .done(function(data) {
      $list.empty();
      for (var item of data.todos) {
        $list.append('<li>' + item.description + '<div data-id="' + item.id + '" class="delete">X</div></li>')
      }
    });
  }

  function keyUp(evt) {
    if (evt.keyCode == 13) {
      var description = $(this).val();
      saveNewItem(description);
      $(this).val('');
    }
  }

  function saveNewItem(description) {
    $.ajax({
      url: '/api/todo',
      method: 'POST',
      data: {
        description: description
      }
    })
    .done(function() {
      fetchDataAndRender();
    });
  }



  load();

})(window)
