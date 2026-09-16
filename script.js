const slider = document.getElementById('gallerySlider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (nextBtn && prevBtn && slider) {
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 300, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -300, behavior: 'smooth' });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const modalCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.item = function() {}; // seguridad

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // 1. Extraemos la URL de la imagen del fondo CSS (background-image)
            const bgImage = window.getComputedStyle(item).backgroundImage;
            // Limpiamos la URL para extraer solo el enlace (removiendo 'url("...")')
            const imageUrl = bgImage.slice(5, -2).replace(/['"]/g, "");

            // 2. Extraemos el texto del diseño que está dentro del span
            const titleSpan = item.querySelector('.gallery-overlay span');
            const titleText = titleSpan ? titleSpan.textContent : '';

            // 3. Pasamos los datos al modal y lo mostramos
            modal.style.display = 'flex';
            modalImg.src = imageUrl;
            modalCaption.textContent = titleText;
        });
    });

    // Función para cerrar el modal al hacer clic en la "X"
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cerrar también si hacen clic fuera de la imagen (en el fondo oscuro)
    modal.style.display = 'none'; // Asegurar estado inicial
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Cerrar presionando la tecla "Escape" del teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
});