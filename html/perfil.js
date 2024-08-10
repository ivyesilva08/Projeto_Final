document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('uploadImage');
  const image = document.getElementById('image');
  const cropperModal = document.getElementById('cropperModal');
  const cropBtn = document.getElementById('cropBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const imgPreview = document.getElementById('uploadPreview');
  const submitButton = document.getElementById('submitButton');
  const inputElement = document.getElementById('textInput');
  const textElement = document.getElementById('textDisplay');
  let cropper;

  fileInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
          const reader = new FileReader();
          reader.onload = function (event) {
              image.src = event.target.result;
              cropperModal.style.display = 'flex';
              if (cropper) {
                  cropper.destroy();
              }
              cropper = new Cropper(image, {
                  aspectRatio: 1,
                  viewMode: 1,
              });
          };
          reader.readAsDataURL(file);
      } else {
          alert('Por favor, selecione uma imagem nos formatos JPG, JPEG ou PNG.');
      }
  });

  cropBtn.addEventListener('click', function () {
      const canvas = cropper.getCroppedCanvas({
          width: 110,
          height: 110,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high',
      });
      imgPreview.src = canvas.toDataURL();
      cropperModal.style.display = 'none';
  });

  cancelBtn.addEventListener('click', function () {
      cropperModal.style.display = 'none';
  });

  submitButton.addEventListener('click', function() {
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
});
