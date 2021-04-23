const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

export default function decrypter(str) {
  return cryptr.decrypt(str);
}
