export function cpfValidate (vlr, value, length){
 // GET: Resultado de validação do CPF
 if (length == 11) {
   var v = [];

   // v[0] recebe o resultado da soma e multiplicação, gerando o primeiro digito do CPF.
   v[0] = 1  * vlr[0] + 2 * vlr[1] + 3 * vlr[2];
   v[0] += 4 * vlr[3] + 5 * vlr[4] + 6 * vlr[5];
   v[0] += 7 * vlr[6] + 8 * vlr[7] + 9 * vlr[8];
   v[0] = v[0] % 11;
   v[0] = v[0] % 10;

   // v[1] recebe o resultado da soma e multiplicação, gerando o segundo digito do CPF
   v[1] = 1  * vlr[1] + 2 * vlr[2] + 3 * vlr[3];
   v[1] += 4 * vlr[4] + 5 * vlr[5] + 6 * vlr[6];
   v[1] += 7 * vlr[7] + 8 * vlr[8] + 9 * v[0];
   v[1] = v[1] % 11;
   v[1] = v[1] % 10;
   
   // GET: Validação de repetição de digitos. 
   if ((v[0] != vlr[9]) || (v[1] != vlr[10]) || value === "00000000000" || value === "11111111111" || value === "22222222222" || value === "33333333333" || 
        value === "44444444444" || value === "55555555555" || value === "66666666666" || value === "77777777777" || value === "88888888888" || value === "99999999999") 
        return true;    
 }
}

export function cpfLength  (length) { 
 if (length < 11) 
   return true; 
}