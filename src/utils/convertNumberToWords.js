const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

const teens = [
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

const scales = ["", "Thousand", "Lakh", "Crore"];

const convertHundreds = (num) => {
  let result = "";

  const hundreds = Math.floor(num / 100);
  if (hundreds > 0) {
    result += ones[hundreds] + " Hundred";
  }

  const remainder = num % 100;
  if (remainder > 0) {
    if (result) result += " ";
    if (remainder < 10) {
      result += ones[remainder];
    } else if (remainder < 20) {
      result += teens[remainder - 10];
    } else {
      const ten = Math.floor(remainder / 10);
      const one = remainder % 10;
      result += tens[ten];
      if (one > 0) {
        result += " " + ones[one];
      }
    }
  }

  return result;
};

export const convertNumberToWords = (num) => {
  const number = Number(num);

  if (number === 0) {
    return "Zero";
  }

  if (number < 0) {
    return "Minus " + convertNumberToWords(-number);
  }

  const parts = [];

  if (number >= 10000000) {
    const crores = Math.floor(number / 10000000);
    parts.push(convertHundreds(crores) + " Crore");
    const afterCrores = number % 10000000;
    if (afterCrores > 0) {
      if (afterCrores >= 100000) {
        const lakhs = Math.floor(afterCrores / 100000);
        parts.push(convertHundreds(lakhs) + " Lakh");
        const afterLakhs = afterCrores % 100000;
        if (afterLakhs > 0) {
          if (afterLakhs >= 1000) {
            const thousands = Math.floor(afterLakhs / 1000);
            parts.push(convertHundreds(thousands) + " Thousand");
            const remainder = afterLakhs % 1000;
            if (remainder > 0) {
              parts.push(convertHundreds(remainder));
            }
          } else {
            parts.push(convertHundreds(afterLakhs));
          }
        }
      } else if (afterCrores >= 1000) {
        const thousands = Math.floor(afterCrores / 1000);
        parts.push(convertHundreds(thousands) + " Thousand");
        const remainder = afterCrores % 1000;
        if (remainder > 0) {
          parts.push(convertHundreds(remainder));
        }
      } else {
        parts.push(convertHundreds(afterCrores));
      }
    }
  } else if (number >= 100000) {
    const lakhs = Math.floor(number / 100000);
    parts.push(convertHundreds(lakhs) + " Lakh");
    const afterLakhs = number % 100000;
    if (afterLakhs > 0) {
      if (afterLakhs >= 1000) {
        const thousands = Math.floor(afterLakhs / 1000);
        parts.push(convertHundreds(thousands) + " Thousand");
        const remainder = afterLakhs % 1000;
        if (remainder > 0) {
          parts.push(convertHundreds(remainder));
        }
      } else {
        parts.push(convertHundreds(afterLakhs));
      }
    }
  } else if (number >= 1000) {
    const thousands = Math.floor(number / 1000);
    parts.push(convertHundreds(thousands) + " Thousand");
    const remainder = number % 1000;
    if (remainder > 0) {
      parts.push(convertHundreds(remainder));
    }
  } else {
    parts.push(convertHundreds(number));
  }

  return parts.join(" ");
};
