const toggleModal = () => {
    document.querySelector('.modal')
      .classList.toggle('modal--hidden');
  }
  document.querySelector('#loginMenu')
    .addEventListener('click', toggleModal);

   document.querySelector('#signinMenu')
    .addEventListener('click', toggleModal);
  
 /* document.querySelector('#learn-more-form')
    .addEventListener('submit', (e) => {
    e.preventDefault();
    toggleModal();
  });*/
 /* document.querySelector('.modal__close-bar span')
    .addEventListener('click', toggleModal);*/

  