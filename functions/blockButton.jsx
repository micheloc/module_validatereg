export function add_block_button (list, campo){
 var index = list.indexOf(campo); 
 if (index < 0){
   return true; 
 }
}

export function remove_block_button (list, campo){
 return list.filter(item => !campo.includes(item));
}

export function add_list_error (list, campo) { 
 var index = list.indexOf(campo); 
 if (index < 0 ){
   return true; 
 }
}

export function remove_list_error (list, campo){
 return list.filter(item => !campo.includes(item));
}

export function disabled_button (list){
 if (list.length > 0){
   return false; 
 }else{
   return true; 
 }
}