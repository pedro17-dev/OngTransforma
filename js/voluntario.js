// ===== Rolagem suave para links de âncora =====
// Seleciona todos os links que começam com '#' (âncoras internas)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Evita que o link pule instantaneamente para a seção
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== Botão de rolar para o topo =====
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
scrollButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => {
  scrollButton.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// ===== Funções executadas após o DOM carregar =====
document.addEventListener('DOMContentLoaded', () => {

  // --- Lógica do Menu Hambúrguer ---
  const btnMenu = document.querySelector('.menu-mobile-btn');
  const menuLinks = document.querySelector('#menu-links');

  if (btnMenu && menuLinks) {
    btnMenu.addEventListener('click', () => {
      menuLinks.classList.toggle('active');
    });
  }

  // ===== Validação e mensagem de sucesso no cadastro =====
  const formVoluntario = document.getElementById('cadastro');
  const senhaInput = document.getElementById('senha');
  const confirmSenhaInput = document.getElementById('confirmSenha');

  if (formVoluntario && senhaInput && confirmSenhaInput) {
    formVoluntario.addEventListener('submit', (e) => {
      e.preventDefault();

      const senha = senhaInput.value.trim();
      const confirmSenha = confirmSenhaInput.value.trim();

      if (senha === "" || confirmSenha === "") {
        alert("Preencha ambos os campos de senha!");
        return;
      }

      if (senha !== confirmSenha) {
        alert("As senhas não conferem!");
        senhaInput.focus();
        return;
      }

      // Cria o elemento flutuante da mensagem de sucesso
      const msgSucesso = document.createElement('div');
      msgSucesso.textContent = "Cadastro realizado com sucesso!";
      msgSucesso.classList.add('mensagens');
      document.body.appendChild(msgSucesso);

      // Mostra a mensagem suavemente
      setTimeout(() => msgSucesso.classList.add('mostrar'), 10);

      // Remove a mensagem e reseta o formulário após 3 segundos
      setTimeout(() => {
        msgSucesso.classList.remove('mostrar');
        setTimeout(() => msgSucesso.remove(), 400);
        formVoluntario.reset();
      }, 3000);
    });
  }

  // ===== Máscaras de CPF, Telefone e CEP =====
  const cpfInput = document.getElementById("cpf");
  const telefoneInput = document.getElementById("telefone");
  const cepInput = document.getElementById("cep");

  // CPF
  if (cpfInput) {
    cpfInput.addEventListener("input", function () {
      let valor = this.value.replace(/\D/g, "");
      if (valor.length > 11) valor = valor.slice(0, 11);
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      this.value = valor;
    });
  }

  // Telefone
  if (telefoneInput) {
    telefoneInput.addEventListener("input", function () {
      let valor = this.value.replace(/\D/g, "");
      if (valor.length > 11) valor = valor.slice(0, 11);
      valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
      valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
      this.value = valor;
    });
  }

  // CEP
  if (cepInput) {
    cepInput.addEventListener("input", function () {
      let valor = this.value.replace(/\D/g, "");
      if (valor.length > 8) valor = valor.slice(0, 8);
      valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
      this.value = valor;
    });
  }

}); // FIM do DOMContentLoaded
