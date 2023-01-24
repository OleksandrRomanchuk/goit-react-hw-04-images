export function scrollingAfterMoreLoad() {
  const { height: cardHeight } = document
    .getElementById('gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2.4,
    behavior: 'smooth',
  });
}
