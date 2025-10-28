document.addEventListener('DOMContentLoaded', () => {
    // ===== Rolagem suave para links de âncora =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ===== Botão de voltar ao topo =====
    const scrollButton = document.createElement('button');
    scrollButton.textContent = '↑';
    Object.assign(scrollButton.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        padding: '10px 15px',
        fontSize: '20px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#12333d',
        color: '#fff',
        cursor: 'pointer',
        display: 'none',
        zIndex: '1000'
    });
    document.body.appendChild(scrollButton);

    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        scrollButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    // ===== Validação e funcionalidade do formulário de doação =====
    const formDoacao = document.getElementById('formulario');
    if (formDoacao) {
        const inputValor = document.getElementById('valor-doacao');
        const botoesValores = document.querySelectorAll('.btn-valor');
        const botaoDoacao = formDoacao.querySelector('.doacao');

        // Função para mostrar mensagem flutuante
        function mostrarMensagem(texto, sucesso = true) {
            const msg = document.createElement('div');
            msg.textContent = texto;
            Object.assign(msg.style, {
                position: 'fixed',
                top: '85px',
                right: '20px',
                padding: '15px 25px',
                borderRadius: '8px',
                fontWeight: 'bold',
                color: '#fff',
                opacity: '0',
                transform: 'translateY(-20px)',
                transition: 'all 0.4s ease',
                zIndex: '10000',
                backgroundColor: sucesso ? '#28a745' : '#dc3545'
            });
            document.body.appendChild(msg);

            setTimeout(() => {
                msg.style.opacity = '1';
                msg.style.transform = 'translateY(0)';
            }, 10);

            setTimeout(() => {
                msg.style.opacity = '0';
                msg.style.transform = 'translateY(-20px)';
                setTimeout(() => msg.remove(), 400);
            }, 3000);
        }

        // Valores pré-definidos
        botoesValores.forEach(botao => {
            botao.addEventListener('click', () => {
                let valorAtual = parseFloat(inputValor.value.replace(',', '.')) || 0;
                let valorBotao = parseFloat(botao.dataset.valor);
                inputValor.value = (valorAtual + valorBotao).toFixed(2).replace('.', ',');
            });
        });

        // Botão Limpar
        const btnLimpar = document.createElement('button');
        btnLimpar.type = 'button';
        btnLimpar.textContent = 'Limpar';
        Object.assign(btnLimpar.style, {
            marginLeft: '10px',
            padding: '8px 12px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#12333d',
            color: '#fff',
            cursor: 'pointer'
        });
        document.querySelector('.botoes-valores').appendChild(btnLimpar);
        btnLimpar.addEventListener('click', () => inputValor.value = '');

        // Evento do botão "Fazer doação"
        botaoDoacao.addEventListener('click', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome-doacao').value.trim();
            const email = document.getElementById('email-doacao').value.trim();
            const valor = parseFloat(inputValor.value.replace(',', '.'));

            if (!nome || !email || isNaN(valor) || valor <= 0) {
                mostrarMensagem("Preencha todos os campos corretamente!", false);
                return;
            }

            mostrarMensagem("Doação realizada com sucesso!", true);
            setTimeout(() => formDoacao.reset(), 3000);
        });
    }

    // ===== Validação do cadastro de voluntário =====
    const formVoluntario = document.getElementById('cadastro');
    if (formVoluntario) {
        formVoluntario.addEventListener('submit', (e) => {
            const senha = document.getElementById('senha').value;
            const confirmSenha = document.getElementById('confirmSenha').value;

            if (senha !== confirmSenha) {
                e.preventDefault();
                alert("As senhas não conferem!");
                return;
            }

            // Se quiser, pode mostrar mensagem de sucesso aqui também
            e.preventDefault();
            alert("Cadastro realizado com sucesso!");
            formVoluntario.reset();
        });
    }

    // ===== Lógica do Menu Hambúrguer =====
    const btnMenu = document.querySelector('.menu-mobile-btn');
    const menuLinks = document.querySelector('#menu-links');
    if (btnMenu && menuLinks) {
        btnMenu.addEventListener('click', () => {
            menuLinks.classList.toggle('active');
        });
    }
});
