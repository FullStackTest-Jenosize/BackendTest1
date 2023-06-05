const calculate24 = (numbers) => {
    // ตรวจสอบว่ามีตัวเลข 4 ตัวที่รับเข้ามาหรือไม่
    if (!numbers || numbers.length !== 4) {
      throw new Error('Invalid input. Please provide 4 numbers.');
    }
  
    // ตรวจสอบว่าตัวเลขทั้ง 4 ตัวอยู่ในช่วง 1-9 หรือไม่
    const isValidNumbers = numbers.every(num => num >= 1 && num <= 9);
    if (!isValidNumbers) {
      throw new Error('Invalid input. Numbers should be between 1 and 9.');
    }
  
    // คำนวณเกม 24
    const is24 = permuteAndEvaluate(numbers);
  
    return is24;
};
  
const permuteAndEvaluate = (numbers) => {
  const permutations = permute(numbers); // สร้างคอมบินาทีชั่นของตัวเลขทั้ง 4 ตัว
  const operators = ['+', '-', '*', '/'];

  for (const p of permutations) {
    for (const op1 of operators) {
      for (const op2 of operators) {
        for (const op3 of operators) {
          if (evaluateExpression(p[0], p[1], p[2], p[3], op1, op2, op3) === 24) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

const permute = (arr) => {
  // สร้างคอมบินาทีชั่นของตัวเลขทั้ง 4 ตัว
  const result = [];

  const backtrack = (arr, temp) => {
    if (temp.length === arr.length) {
      result.push(temp.slice());
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (temp.includes(arr[i])) {
          continue;
        }
        temp.push(arr[i]);
        backtrack(arr, temp);
        temp.pop();
      }
    }
  };

  backtrack(arr, []);

  return result;
};

const evaluateExpression = (num1, num2, num3, num4, op1, op2, op3) => {
  // คำนวณค่าในรูปแบบ (number1 op1 number2) op2 number3 op3 number4
  const intermediateResult1 = eval(`${num1}${op1}${num2}`);
  const intermediateResult2 = eval(`${intermediateResult1}${op2}${num3}`);
  const finalResult = eval(`${intermediateResult2}${op3}${num4}`);

  return finalResult;
};
  
module.exports = { calculate24 };
  