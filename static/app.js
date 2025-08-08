$("#prompt").on("keypress", function (event) {
  if (event.key === "Enter") {
      getBotResponse();
  }
});

$("#sendButton").on("click", function () {
  getBotResponse();
});

$("#messages div").on("scroll", function () {
  shadowScroll();
});

// Função para adicionar mensagens ao chat
function appendMessage(message) {
  $("#messages ul").append(message);
  $("#userInput")[0].scrollIntoView({ behavior: "smooth" , block: "end"});
  $("#messages div ul li").last().get(0).scrollIntoView({ behavior: "smooth" , block: "end"})
}

// Função para obter a resposta do bot
function getBotResponse() {
  var rawText = $("#prompt").val().trim();

  if (rawText === "") {
      return;
  }

  // Adiciona a mensagem do usuário ao chat
  var userHtml =
      '<li class="d-flex justify-content-between my-4 mx-2 ms-auto w-50"><div class=" bg-primary px-2 py-1 rounded"><span>' +
      rawText +
      "</span></div></li>";
  $("#prompt").val("");
  appendMessage(userHtml);

  // Adiciona indicador de carregamento
  var loadingHtml =
      '<li id="loading" class="d-flex justify-content-between my-4 mx-2 me-auto w-50"><p><em>Processando...</em></p></li>';
  appendMessage(loadingHtml);

  // Faz a requisição para o servidor e obtém a resposta do bot
  $.get("/chat", { prompt: rawText })
      .done(function (data) {
          $("#loading").remove();
          data = data.replaceAll("<p>", "<span>").replaceAll("</p>", "</span>");
          var botHtml =
              '<li class="d-flex justify-content-between my-4 mx-2 me-auto w-50"><div class=" bg-success px-2 py-1 rounded">' +
              data +
              "</div></li>";
          appendMessage(botHtml);
      })
      .fail(function () {
          $("#loading").remove();
          var errorHtml =
              '<li class="d-flex justify-content-between my-4 mx-2 me-auto w-50"><div class=" bg-danger px-2 py-1 rounded" style="color: red;">Erro de conexão. Tente novamente.</div></li>';
          appendMessage(errorHtml)
      });
}

// Função para adicionar sombra ao scroll
function shadowScroll() {
  const chat = $("#messages div")

  // Verifica se o scroll está no topo
  // Se não estiver, adiciona a sombra
  if (chat.scrollTop() > 1) {
      $("#messages").css("position", "relative")
  } else {
      $("#messages").css("position", "");
  }
}