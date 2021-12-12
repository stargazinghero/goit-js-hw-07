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

const instance = basicLightbox.create(
  `
    <div class="modal">
        <img src="">
    </div>
`,
  {
    onShow: instance => {
      window.addEventListener('keydown', onEscapeClose);
    },
    onClose: instance => {
      window.removeEventListener('keydown', onEscapeClose);
    },
  },
);

function selectGalleryItem(e) {
  e.preventDefault();
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  setInstanceUrl(e);
  instance.show();
}

function onEscapeClose(e) {
  if (e.code === 'Escape') {
    instance.close();
    return;
  }
}

function setInstanceUrl(e) {
  const galleryItemUrl = e.target.dataset.source;
  instance.element().querySelector('img').src = galleryItemUrl;
}
