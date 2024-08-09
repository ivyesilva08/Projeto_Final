document.getElementById('submitButton').addEventListener('click', function() {
  const inputElement = document.getElementById('textInput');
  const inputValue = inputElement.value.trim(); // Remove espaços em branco

  if (inputValue) {
      // Criar um novo elemento de parágrafo para substituir o input
      const textElement = document.createElement('p');
      textElement.textContent = inputValue;
      textElement.id = 'textDisplay';

      // Criar um botão de edição
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.addEventListener('click', function() {
          // Substituir o parágrafo de volta pelo input
          inputElement.value = inputValue; // Restaura o valor no input
          textElement.replaceWith(inputElement);
          this.remove(); // Remove o botão de edição
          document.getElementById('submitButton').style.display = 'inline-block'; // Mostra o botão de envio novamente
      });

      // Substituir o input pelo novo elemento de parágrafo
      inputElement.replaceWith(textElement);
      this.style.display = 'none'; // Esconde o botão de envio

      // Adiciona o botão de edição após o texto
      textElement.after(editButton);
  } else {
      alert('Por favor, insira um texto antes de enviar.');
  }
});
