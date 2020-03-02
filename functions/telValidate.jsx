export function telValidate (value){ 
  if (value === "0000000000" || value === "1111111111" || value === "2222222222" || value === "3333333333" || value === "4444444444" || 
      value === "5555555555" || value === "6666666666" || value === "7777777777" || value === "8888888888" || value === "9999999999" ){
        return true; 
  }
}