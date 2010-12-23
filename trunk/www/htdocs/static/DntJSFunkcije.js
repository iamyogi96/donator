function dopostback(hiddenfield, val, clearfields)
{
    if(clearfields == true) //recimo se rabi, ko se klikne isci in se morajo ostali podatki zbrani od prej pobrisat
    {
        var x=document.getElementsByTagName("input");
        
        for(i=0; i<x.length;i++)
        {
            if(x[i].type == "hidden")
            {
                x[i].value = "";
            }
        }
    }
    
    dopostback(hiddenfield, val);
}


function dopostback(hiddenfield, val)
{
	var hf=document.getElementsByName(hiddenfield);
	if(hf.length) //kao obstaja, pa itak jih ni vec kot 1, ce se drzis, da ne bo name attribut kje isti
	{
	    hf[0].value = val;
	    
	    hf[0].form.submit(); //force submit
	}
}

function dopostbacks(hiddenfields)
{
	//dopostbacks(hiddenfields, vals)
	var hf ; //=document.getElementsByName(hiddenfield);
	var hiddenfield;
	var i;
	var rez;
	var val;
	rez = '';
	for(i=0; i<hiddenfields.length;i++){
		hiddenfield = hiddenfields[i,0];
		val = hiddenfields[i,1]
		hf =document.getElementsByName(hiddenfield);
		if(hf.length) //kao obstaja, pa itak jih ni vec kot 1, ce se drzis, da ne bo name attribut kje isti
		{
			hf[i].value = val;
			
			hf[i].form.submit(); //force submit
			rez = rez+ hf +' '+ val;
		}
	}
	//document.getElementById('dekodirano').innerHTML= 'XXXXXXXXXX'; //+rez;
}

function doReport()
{
    var f = document.forms[0];
    
    var oldaction = f.action;
    
    f.action = "DntReport.pl";
    f.submit();
    f.action = oldaction;
}

function doIzbranaV(novurl)
{
    var f = document.forms[0];
    
    f.action = novurl;
    f.submit();
}

function izberiDatoteko(datoteka)
{
	var f = document.forms[0];
	opener.document.getElementsByName("$izbrana_datoteka")[0].value = "test";	
	opener.submit();
	
}

function popup(page, height, width)
{
	window.open(page, "CDpopup", "location = no, menubar = no, resizable = yes, scrollbars = yes, status = no, titlebar = yes, toolbar = no, height = " + height + ", width = " + width);
}

function closer_SubjektiEdit_NaslovSelect(id_naslova, text_naslova)
{
    opener.document.getElementsByName("edb_id_naslova")[0].value = id_naslova;
	opener.document.getElementsByName("span_text_naslova")[0].innerHTML = text_naslova;
	window.close();
}


function ajaxGet(return_span_name, server_url, url_param_field_name)
{
    var xmlHttp;
    try
    {
        // Firefox, Opera 8.0+, Safari
        xmlHttp=new XMLHttpRequest();
    }
    catch (e)
    {
        // Internet Explorer
        try
        {
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            try
            {
                xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e)
            {
                alert("Your browser does not support AJAX!");
                return false;
            }
        }
    }
    
    xmlHttp.onreadystatechange=function()
    {
        if(xmlHttp.readyState==4)
        {
            document.getElementsByName(return_span_name)[0].innerHTML = xmlHttp.responseText;
        }
    }
    
    var p = document.getElementsByName(url_param_field_name)[0].value;
    
    xmlHttp.open("GET",server_url + p,true);
    xmlHttp.send(null);
}
