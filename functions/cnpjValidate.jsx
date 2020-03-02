export function cnpjValidate (vlr, value, length ){ 
 //GET: Cálcuo CNPJ Validation. 
 if (length == 14) {
   var cn = [];
   // Verificação do primeiro digito. 
   cn[0] =  5 * vlr[0] + 4 * vlr[1] + 3 * vlr[2];
   cn[0] += 2 * vlr[3] + 9 * vlr[4] + 8 * vlr[5];
   cn[0] += 7 * vlr[6] + 6 * vlr[7] + 5 * vlr[8];
   cn[0] += 4 * vlr[9] + 3 * vlr[10] + 2 * vlr[11];
   cn[0] = cn[0] % 11;
   
   if (cn[0] < 2) 
     cn[0] = 0; 
   else 
     cn[0] = 11 - cn[0]; 
     
   // Verificação do segundo digito. 
   cn[1] = 6 * vlr[0] + 5 * vlr[1] + 4 * vlr[2];
   cn[1] += 3 * vlr[3] + 2 * vlr[4] + 9 * vlr[5];
   cn[1] += 8 * vlr[6] + 7 * vlr[7] + 6 * vlr[8];
   cn[1] += 5 * vlr[9] + 4 * vlr[10] + 3 * vlr[11] + 2 * cn[0];
   cn[1] = cn[1] % 11;
   
   if (cn[1] < 2) 
       cn[1] = 0;
   else
     cn[1] = 11 - cn[1];

   if ((cn[0] != vlr[12]) || (cn[1] != vlr[13]) || value === "00000000000000")
     return true;   
   else
     return false; 
 }
}

export function cnpjLength (length) {
 if (length < 14)
   return true; 
}
