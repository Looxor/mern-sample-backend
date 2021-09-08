function countXChars(max) {
  var count = 0;
  for (var i = 1; i <= max; i++) {
    const roman = toRoman(i);
    roman.replace(/X/g, () => {
      count++;
    });
  }

  return count;

  function toRoman(num) {
    if (typeof num !== "number") throw Error();

    const digits = String(num).split("");
    const key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX"
    ];
    var roman_num = "";
    var i = 3;
    while (i--) {
      roman_num = (key[+digits.pop() + i * 10] || "") + roman_num;
    }
    return Array(+digits.join("") + 1).join("M") + roman_num;
  }
}

console.log(countXChars(2660));


function sum(str) {
  var english_chars = "abcdefghijklmnopqrstuvwxyz";
  var vowels = "AEIOUaeiou";
  var sum = 0;
  for (var i = 0; i < str.length; i++) {
    if (english_chars.indexOf(str[i].toLowerCase()) > -1) {
      if (vowels.indexOf(str[i]) > -1) {
        sum -= str.charCodeAt(i);
      } else {
        sum += str.charCodeAt(i);
      }
    }
  }
  return sum;
}

console.log(sum("Dealing with failure is easy: Work hard to improve. Success is also easy to handle: You’ve solved the wrong problem. Work hard to improve."));


const sumOfPalindromes = n => {
  let x = 0;
  for (let i = 0; i <= n; i++) {
    if ((i + '') === ('' + i).split('').reverse().join('')) {
      x += i;
    }
  }
  return x
};
console.log(sumOfPalindromes(10000));