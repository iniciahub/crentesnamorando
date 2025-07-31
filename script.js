document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Inicializa a biblioteca de animações
    AOS.init({
        duration: 800, // Duração da animação
        once: true,    // Animar apenas uma vez
        offset: 50,    // Começar a animação 50px antes do elemento aparecer
    });

    // 2. Lógica de validação do formulário
    const form = document.getElementById('interview-form');
    const submitButton = document.getElementById('submit-button');
    const errorMessageContainer = document.querySelector('.form-message-error');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio imediato

            const instagramInput = document.getElementById('instagram');
            const whatsappInput = document.getElementById('whatsapp');
            const photoLinkInput = document.getElementById('link_foto');

            let errors = [];

            // Validação do Instagram
            if (!instagramInput.value.startsWith('@')) {
                errors.push('O Instagram precisa começar com "@".');
            }

            // Validação do WhatsApp (formato simples)
            const whatsappRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (!whatsappRegex.test(whatsappInput.value)) {
                errors.push('O formato do WhatsApp deve ser (XX) XXXXX-XXXX.');
            }

            // Validação do Link da Foto (URL válida)
            try {
                new URL(photoLinkInput.value);
            } catch (_) {
                errors.push('O link da foto parece ser inválido.');
            }

            if (errors.length > 0) {
                // Mostra os erros
                errorMessageContainer.innerHTML = errors.join('<br>');
                errorMessageContainer.style.display = 'block';
                window.scrollTo(0, errorMessageContainer.offsetTop - 100); // Rola para a mensagem de erro
            } else {
                // Se não houver erros, oculta a mensagem e envia
                errorMessageContainer.style.display = 'none';
                
                // Ativa o estado de "carregando"
                submitButton.classList.add('btn--loading');
                submitButton.disabled = true;

                // Envia o formulário
                form.submit();
            }
        });
    }
});
