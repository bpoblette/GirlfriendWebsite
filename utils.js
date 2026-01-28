const { error } = require('console');
const fs = require('fs');
const path = require('path');

const validateEmail = function (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const replaceHTML = function (html, obj) {
  return html.replace(/\{\{(.*?)\}\}/g, function (key) {
    const newData = obj[key.replace(/[{}]+/g, "")];
    return newData || "";
  });
}

const gerRandomImage = function (folderpath) {
  const files = fs.readdirSync(folderPath).filter(file =>
    /\.(jpg|jpeg|png|gif)$/i.test(file) // only images
  );

  if (files.length === 0) throw new Error('No images found in folder.');
  const randomIndex = Math.floor(Math.random() * files.length);
  return path.join(folderPath, files[randomIndex]);
}

module.exports = { validateEmail, replaceHTML, gerRandomImage };
