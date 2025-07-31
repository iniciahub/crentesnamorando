document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Inicializa a biblioteca de animações
    try {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    } catch (e) {
        console.error("AOS não pôde ser inicializado.", e);
    }

    // 2. Lógica de validação do formulário
    const form = document.getElementById('interview-form');
    const submitButton = document.getElementById('submit-button');
    const errorMessageContainer = document.querySelector('.form-message-error');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Limpa erros antigos
            errorMessageContainer.style.display = 'none';
            errorMessageContainer.innerHTML = '';
            
            const instagramInput = document.getElementById('instagram');
            const whatsappInput = document.getElementById('whatsapp');
            const photoLinkInput = document.getElementById('link_foto');

            let errors = [];

            // Validação do Instagram
            if (!instagramInput.value.startsWith('@') || instagramInput.value.length < 3) {
                errors.push('O Instagram deve começar com "@" e ter um nome de usuário.');
            }

            // Validação do WhatsApp (formato simples: (XX) XXXXX-XXXX)
            const whatsappRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (!whatsappRegex.test(whatsappInput.value)) {
                errors.push('O formato do WhatsApp deve ser (XX) XXXXX-XXXX.');
            }

            // Validação do Link da Foto
            try {
                new URL(photoLinkInput.value);
            } catch (_) {
                errors.push('O link da foto parece ser uma URL inválida.');
            }

            // Verifica se campos obrigatórios estão preenchidos (navegadores antigos)
            if (document.getElementById('nome').value.trim() === '' || document.getElementById('idade').value.trim() === '') {
                 errors.push('Por favor, preencha todos os campos obrigatórios.');
            }


            if (errors.length > 0) {
                // Mostra os erros
                errorMessageContainer.innerHTML = errors.join('<br>');
                errorMessageContainer.style.display = 'block';
                // Rola para a mensagem de erro
                errorMessageContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                // Se não houver erros, envia
                submitButton.classList.add('btn--loading');
                submitButton.disabled = true;

                form.submit();
            }
        });
    }
});
