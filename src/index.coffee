window.onload = ->
  window.board = new Board
  window.board.draw()

  $(".big_disk.black").on "click", ->
    window.board.you = Setting.DISK.BLACK
    window.board.AI = Setting.DISK.WHITE
    $(".mini_disk.you").addClass("black")
    $(".mini_disk.AI").addClass("white")
    $(".choose_box").hide()
    $(".modal").fadeOut()
    window.board.draw()

  $(".big_disk.white").on "click", ->
    window.board.you = Setting.DISK.WHITE
    window.board.AI = Setting.DISK.BLACK
    $(".mini_disk.you").addClass("white")
    $(".mini_disk.AI").addClass("black")
    $(".choose_box").hide()
    $(".modal").fadeOut()
    AI_move()
    window.board.draw()

  $(".cell").on "click", ->
    [row, col] = $(this).attr("id").row_col()
    unless window.board.can_move(row, col)
      return
    move(row, col).then ->
      $(".loading").hide()
      window.board.draw()
      unless window.board.can_move_anywhere()
        window.board.draw_result()

  move = (row, col) ->
    new Promise (resolve) ->
      $(".loading").show()
      window.board.move(row, col)
      window.board.draw()
      setTimeout ->
        if window.board.can_move_anywhere()
          AI_move()
        else
          window.board.change()
        resolve()
      , 10

  AI_move = ->
    ai = select_AI()
    [row2, col2] = ai.search()
    window.board.move(row2, col2)
    unless window.board.can_move_anywhere()
      window.board.change()
      if window.board.can_move_anywhere()
        AI_move()

  select_AI = ->
    switch $("#level").val()
      when "Lv.1"
        return new AI1(window.board)
      when "Lv.2"
        return new AI2(window.board)
      when "Lv.3"
        return new AI3(window.board)
      when "Lv.4"
        return new AI4(window.board)
      when "Lv.5"
        return new AI5(window.board)
      when "Lv.6"
        return new AI6(window.board)
      when "Lv.7"
        return new AI7(window.board)
      when "Lv.8"
        return new AI8(window.board)

  $(".result").on "click", ".retry", ->
    location.reload()