import { galleryItems } from './gallery-items.js';
// Change code below this line

const refs = {
  gallery: document.querySelector('.gallery'),
};

function createGallery(galleryArr) {
  return galleryArr
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </div>`;
    })
    .join('');
}

refs.gallery.insertAdjacentHTML(`beforeend`, createGallery(galleryItems));
refs.gallery.addEventListener('click', selectGalleryItem);

const instance = basicLightbox.create(`
    <div class="modal">
        <img src="">
    </div>
`);

function selectGalleryItem(e) {
  e.preventDefault();
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  setInstanceUrl(e);
  showModal();
}

function showModal() {
  window.addEventListener('keydown', onEscapeClose);
  instance.show();
}

function closeModal() {
  window.removeEventListener('keydown', onEscapeClose);
  instance.close();
}

function onEscapeClose(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function setInstanceUrl(e) {
  const galleryItemUrl = e.target.dataset.source;
  instance.element().querySelector('img').src = galleryItemUrl;
}
