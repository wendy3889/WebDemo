function readHtml(file){
    if (file.length) {
        var reader = new FileReader();
        reader.onload = function(){
            html = this.result;
            console.log(html);
        };
        reader.readAsText(file);
    } else {
        alert("出错");
    }
}
 

