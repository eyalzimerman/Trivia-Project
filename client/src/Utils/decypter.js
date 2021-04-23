const base64 = require("base-64");
const utf8 = require("utf8");

export default function decrypter(str) {
  const bytes = base64.decode(str);
  const text = utf8.decode(bytes);
  return text;
}
