// ===== Lazy Loading Inteligente e Funcionalidades que dependem do DOM =====
// Espera o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function() {
    
    // --- Lógica do Lazy Loading ---
    
    // Seleciona todas as imagens que possuem o atributo 'data-src'
    const imagens = document.querySelectorAll('img[data-src]');

    // Configurações do IntersectionObserver
    // rootMargin: distância da viewport para disparar o carregamento
    // threshold: percentual de visibilidade do elemento para acionar o observer
    const config = { rootMargin: '100px 0px', threshold: 0.01 };

    // Cria um observer para observar quando as imagens entram na tela
    let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            // Verifica se a imagem entrou na área visível da página
            if (entry.isIntersecting) {
                const img = entry.target;
                // Troca o src da imagem pelo valor de data-src
                img.src = img.dataset.src;

                // Adiciona uma classe 'loaded' quando a imagem termina de carregar
                img.onload = () => img.classList.add('loaded');

                // Para de observar essa imagem, já que ela carregou
                self.unobserve(img);
            }
        });
    }, config);

    // Observa cada imagem para disparar o lazy loading
    imagens.forEach(img => observer.observe(img));


    // --- Lógica do Menu Hambúrguer (ADICIONADA AQUI) ---
    
    const btnMenu = document.querySelector('.menu-mobile-btn');
    const menuLinks = document.querySelector('#menu-links');

    if (btnMenu && menuLinks) {
        btnMenu.addEventListener('click', () => {
            menuLinks.classList.toggle('active');
        });
    }

}); // FIM de DOMContentLoaded


// ===== Rolagem suave para links de âncora =====
// Seleciona todos os links que começam com '#'
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Evita o comportamento padrão de pular instantaneamente

        // Seleciona o elemento de destino baseado no href
        const alvo = document.querySelector(this.getAttribute('href'));

        // Se o elemento existir, faz a rolagem suave até ele
        if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== Botão de voltar ao topo =====
// Cria dinamicamente um botão
const scrollButton = document.createElement('button');
scrollButton.textContent = '↑'; // Texto do botão (seta para cima)

// Estiliza o botão usando Object.assign para definir várias propriedades
Object.assign(scrollButton.style, {
    position: 'fixed',      // Fixa o botão na tela
    bottom: '30px',          // Distância da parte inferior
    right: '30px',           // Distância da borda direita
    padding: '10px 15px',    // Espaçamento interno
    fontSize: '20px',        // Tamanho da fonte
    borderRadius: '50%',     // Formato circular
    border: 'none',          // Sem borda
    backgroundColor: '#12333d', // Cor de fundo
    color: '#fff',           // Cor do texto
    cursor: 'pointer',       // Cursor de mãozinha ao passar o mouse
    display: 'none',         // Inicialmente escondido
    zIndex: '1000'           // Fica acima de outros elementos
});

// Adiciona o botão ao corpo do documento
document.body.appendChild(scrollButton);

// Evento de clique do botão: rola suavemente para o topo
scrollButton.addEventListener('click', () => 
    window.scrollTo({ top: 0, behavior: 'smooth' })
);

// Mostra ou esconde o botão baseado na posição de rolagem
window.addEventListener('scroll', () => {
    scrollButton.style.display = window.scrollY > 300 ? 'block' : 'none';
});