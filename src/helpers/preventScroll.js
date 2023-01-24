const body = document.body;

export function disableScroll() {
  const bodyPosition = window.scrollY;

  body.classList.add('disableScroll');
  body.dataset.position = bodyPosition;
  body.style.top = -bodyPosition + 'px';
}

export function enableScroll() {
  const bodyPosition = parseInt(body.dataset.position, 10);

  body.classList.remove('disableScroll');
  body.style.top = '';
  body.removeAttribute('data-position');

  window.scrollTo({ top: bodyPosition, left: 0 });
}
