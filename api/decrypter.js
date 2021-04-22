const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

const str = cryptr.decrypt(
  "b486808dc9ad61a93bbc5fe18860ec6341489483de88bfd90e2e9f1352147cd15608ae18c1f9229ad9f23604b51f4bf28870585bc7890958811f6c9342f836c149030ee056be64b593345e7deec9052156b9c4e206b8279991061c6233de6f968f996b7883"
);
console.log(str);
