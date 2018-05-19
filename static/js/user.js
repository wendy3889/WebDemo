function F_Open_dialog() 
{ 
document.getElementById("btn_file").click();
var obj1 = document.getElementById('btn_file');
var obj2 = document.getElementById('filepath');
obj2.value = obj1.value; 
} 