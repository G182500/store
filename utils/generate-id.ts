export const generateId = () => {
  const randomNumber = Math.random();
  //Converte o número para uma string hexadecimal e remove o "0." no início
  return randomNumber.toString(16).substring(2);
};