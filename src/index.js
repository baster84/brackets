module.exports = function check(str, bracketsConfig) {
  let stack = [];
  for (let i=0; i < str.length; i++)
  {
    const char = str[i];
    let open = 0;
    let num = -1;
    for (let j=0; j < bracketsConfig.length; j++){
      if (char === bracketsConfig[j][0] && bracketsConfig[j][0] === bracketsConfig[j][1]){
        open = 0;
        num = j;
        break;
      }
      if (char === bracketsConfig[j][0]){
        open = 1;
        num = j;
        break;
      }
      if (char === bracketsConfig[j][1]){
        open = 2;
        num = j;
        break;
      }
    }
    // символ не является скобкой из набора
    if (num < 0) continue;
    // если скобка открывается, то добавляем её номер в стек
    if (open == 1){
      stack.push(num);
      continue;
    }
    // если скобка закрывается, то проверяем её пару в стеке
    if (open == 2) {
      if (stack.length === 0 || stack.pop() !== num){
        return false;
      }
    }
    // если скобка вида |
    if (open === 0) {
      if (num !== stack[stack.length - 1]){
        stack.push(num);
      } else {
        stack.pop();
      }
    }
  }
  return stack.length === 0;
}
