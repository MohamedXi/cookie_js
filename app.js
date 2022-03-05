const show = document.querySelector('.affichage');
const buttons = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input');
const infoText = document.querySelector('.info-txt');
let isMake = false;

const today = new Date();
const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
let day = ('0' + nextWeek.getDate()).slice(-2);
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let year = today.getFullYear();

document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

const createCookie = (name, value, expDate) => {

  infoText.innerHTML = '';
  show.innerHTML = '';

  let cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    cookie = cookie.split('=');
    if (cookie[0].trim() === encodeURIComponent(name)) {
      isMake = true;
    }
  });

  if (isMake) {
    infoText.innerHTML = 'Cookie already exists';
    isMake = false;
    return;
  }

  if (name.length === 0) {
    infoText.innerHTML = 'Impossible to create a cookie';
    return;
  }

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expDate.toUTCString()};`;
  let info = document.createElement('li');
  info.innerHTML = `Cookie ${name} create`;
  show.appendChild(info);

  setTimeout(() => {
    info.remove();
  }, 2000);
}

const cookieList = () => {
  let cookies = document.cookie.split(';');
  if (cookies.join()=== '') {
    infoText.innerHTML = 'No cookie';
    return;
  }

  cookies.forEach(cookie => {
    cookie = cookie.trim();
    let formattedCookie = cookie.split('=');
    let item = document.createElement('li');

    infoText.innerHTML = 'Click a cookie to delete it';
    item.innerHTML = `Name : ${decodeURIComponent(formattedCookie[0])} | Value : ${decodeURIComponent(formattedCookie[1])}`;
    show.appendChild(item);

    item.addEventListener('click', () => {
      document.cookie = `${decodeURIComponent(formattedCookie[0])}=; expires=${new Date(0)};`;
      item.innerHTML = `Cookie ${decodeURIComponent(formattedCookie[0])} deleted`;
      setTimeout(() => {
        item.remove();
      }, 1000);
    });
  });
}

const buttonAction = (e) => {
  let cookie = {};
  inputs.forEach((input) => {
    let attrName = input.getAttribute('name');
    cookie[attrName] = attrName !== 'cookieExpire' ? input.value : input.valueAsDate;
  });

  let description = e.target.getAttribute('data-cookie');
  if (description === 'create') {
    createCookie(cookie.cookieName, cookie.cookieValue, cookie.cookieExpire);
  } else if (description === 'show') {
    cookieList();
  }
}

buttons.forEach(button => {
  button.addEventListener('click', buttonAction);
})