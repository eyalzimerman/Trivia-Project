const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

const str = cryptr.decrypt(
    "989d2dbe3fb86b6de1a55783788028027865ea23052fd8372b9e47cb465f445ba3f7aa699cc7a5e5922ac182fb71acbd6cc716a88a32b45602cb7843404c194fc2211c6ca5936c7d097fd3037d84b3444e8dd67477efd4bf4bbfd7ce813fe1752bff5b39d86a3f"
);
console.log(str);
