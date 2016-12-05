var lines,labels,label_val1,label_val2,fname;

function fileLoad(file){
	fname = file.name;
	var load = new FileReader();
	load.onloadend = function(){
		lines = this.result.split('\n');//splitting the file - reference '\n'(new line)
		labels = lines[0].split(',');//splitting the file - reference ',' value 
		var result = [];

		//populating label values
		var labelId = 'label_1';
		for(var x=0; x < 2; x++){
			var label = document.getElementById(labelId);
			for(var y=0; y < labels.length; y++){
				var option = document.createElement('option');
				option.value = labels[y];
				label.appendChild(option).text = labels[y];
			}
			labelId='label_2';
		}
	};
	load.readAsText(file);
}


//getting filter values
function disable(val){
	var a = document.getElementById('label_1');
	var b = document.getElementById('label_2');
	(val.id == 'label_1') ? label_val1= val.options[val.selectedIndex].text : label_val2= val.options[val.selectedIndex].text;
	//disable option values if it is selected in other label or filter
	var z = (val.id == 'label_1') ? b : a;
	for (var i = 0; i < labels.length; i++) {
		if (val.options[val.selectedIndex].text == z.options[i].text) {
			z.options[i].disabled = true;
		}else {
			z.options[i].disabled = false;
		}
	}
}


function fileFilter(){
	var result = [];
	for(var x=1;x<lines.length;x++){
		var obj = {};
		var cline = lines[x].split(",");
		//for(var y=0;y<labels.length;y++){
		//	if(labels[y] == label_val1){// || labels[y] == label_val2){
				//obj[labels[y]] = cline[y];
					obj.label = label_val1;
					obj.value = label_val2;
		//	}	
		//}
		result.push(JSON.stringify(obj,null,3));
	}

	document.getElementById('content').innerHTML = result;//printing to page
	var data = "text/json;charset=utf-8," + encodeURIComponent(result);//data download stuff
	var atag = document.createElement('a');
	atag.href = 'data:'+ data;
	atag.id = 'download';
	atag.download = fname.substr(0,fname.lastIndexOf('.'))+'.json';//getting filename & rename it .json extention
	atag.innerHTML = '&#11015;';
	var div = document.getElementById('container');
	var anchor = document.getElementById('download');
	if (div.contains(anchor)) { //checking if the download button is there.
		div.removeChild(div.childNodes[0]);//(should not append 'anchor' child each time you click submit)
	}
	div.appendChild(atag);
}
