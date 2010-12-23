function trim(str){
                
	return str.replace(/^\s+|\s+$/g, '');
}
function DatumVnos(id){
            
    var datum=document.getElementById(id);
    var tmp=datum.value;
    var dan;
    var mesec;
    var leto;
            
    if(tmp.length>=6 && tmp.length<=13){
        tmp=tmp.replace('.', '/');
        tmp=tmp.replace('.', '/');
                
                
        dan=trim(tmp.substring(0, tmp.indexOf('/')));
		if(dan.indexOf('0')==0)
			dan=dan.substring(1, 2);
        dan=parseInt(dan);
        if(dan<10 && dan>0)
            dan="0"+dan;
                    
                
        mesec=trim(tmp.substring(tmp.indexOf('/')+1, tmp.lastIndexOf('/')));
		if(mesec.indexOf('0')==0)
			mesec=mesec.substring(1, 2);
        mesec=parseInt(mesec);
        if(mesec<10 && mesec>0)
            mesec="0"+mesec;
                    
        leto=trim(tmp.substring(tmp.lastIndexOf('/')+1, tmp.length));
        if(leto.length==2){
            leto="20"+leto;
        }
        else if(leto.length==3){
            leto="2"+leto;
		}
                
        datum.value=dan+"/"+mesec+"/"+leto;
    }
}

function Brisi(){
	var i=4;
	var error="Ali resnicno zelite izbrisati izbrana polja?";
	var vsi=true;
	while (document.brisi[i].value>0){
		if(document.brisi[i++].checked){						
			vsi=false;
		}
						
	}
	if(vsi)
		alert("Za brisanje niste izbrali nobenega polja!");
	else{
		if(confirm(error)){
			document.brisi.submit();	
		}
	}
}
	
function IzberiVse(id){
	var i=4;
	
	while (document.brisi[i].value>0){
		if(document.getElementById(id).checked)
			document.brisi[i++].checked=true;
		else
			document.brisi[i++].checked=false;
		
	}
}

function PreveriOznacene(){	
	var i=4;
	var vsi=true;
	while (document.brisi[i].value>0){
		if(!document.brisi[i++].checked){
			document.getElementById('izberiVse').checked=false;
			vsi=false;
		}
			
	}
	if(vsi)
		document.getElementById('izberiVse').checked=true;
}

function Pomoc(p1, p2){
	var p2e;
	p2 = p2.match(/rm=[^&]*/g)[0];
	p2 = p2.substring(3);
	p1 = p1.substring(1, p1.length-4);
	var link="DntPomoc.cgi?rm=seznam&id="+p1+"_"+p2;
	var handle = window.open(link,"pomoc","status=1, height=400, width=600, scrollbars=1");
}
function popup(url){
    
    var popup= window.open(url, 'mywindow', 'height=500, width=400, scrollbars=1,resizable=1');
    if(window.focus)
        popup.focus();
}
function SubmitMyForm(str){
	var error="Ali resnicno zelite izbrisati izbrana polja?";
	if(confirm(error))
		document.brisi.submit();	
	
}

function click_date(btn){
	if(btn.checked){
		document.getElementById('datum_izvoza').disabled = false;
		
	}
	else{
		inp = document.getElementById('datum_izvoza').disabled = true;
		
	}
	
}

function IzberiVseIzvoz(id){
	var indexi= "";
	var con = document.getElementsByName('content')[0].value;
	var ele = document.getElementsByName('izberiId');
	if(document.getElementById(id).checked){
		var i=0;
		while(ele[i]){
			ele[i++].checked=true;
		}
	}
	else{
		var i=0;
		while(ele[i]){
			ele[i++].checked=false;
		}
	}
	document.getElementById('indx').value=indexi.substring(0, indexi.length-2);	
	document.getElementsByName('content')[0].value=con;
	PreveriOznaceneIzvoz();
}

function PreveriOznaceneIzvoz(){
	var i=0;
	var vsi=true;
	var indexi="";
	var con = document.getElementsByName('content')[0].value;
	var arr = new Array();
	arr = con.split("\n");
	var ele = document.getElementsByName('izberiId');
	while(ele[i]){			
		if(!ele[i].checked){
			vsi=false;
			arr[i+1] = "#"+arr[i+1];
			arr[i+1] = arr[i+1].replace("##", "#");
		}
		else{
			
			arr[i+1] = arr[i+1].replace("#", "");
			indexi += "'"+ele[i].value+"', ";		
			
		}
		i++;
	}
	
	if(ele.length==0){

		if(!ele.checked){
			vsi=false;
			arr[1] = "#"+arr[1];
			arr[1] = arr[1].replace("##", "#");
		}
		else{
			
			arr[1] = arr[1].replace("#", "");
			indexi += "'"+ele.value+"', ";		
			
		}
		
	}
	con = arr.join("\n");
	if (vsi)
		document.getElementById('izberiVse').checked=true;
	else
		document.getElementById('izberiVse').checked=false;
		
	document.getElementById('indx').value=indexi.substring(0, indexi.length-2);
	document.getElementsByName('content')[0].value=con;
	//alert(con+"\n\n"+indexi);
	//alert(document.getElementsByName('content')[0].value);
}	