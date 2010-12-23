var arMes = new Array;
arMes.length = 12;
arMes[0] = "januar";
arMes[1] = "februar";
arMes[2] = "marec";
arMes[3] = "april";
arMes[4] = "maj";
arMes[5] = "junij";
arMes[6] = "julij";
arMes[7] = "avgust";
arMes[8] = "september";
arMes[9] = "oktober";
arMes[10] = "november";
arMes[11] = "december";

var arDni = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

function IzberiDatum(id) {
	if (document.getElementById) {
		var zdaj = new Date();
		var mes = zdaj.getMonth() + 1;
		var dan = zdaj.getDate();
		var let = zdaj.getFullYear();
		var dZac = dan + "." + mes + "." + let;

		//preveri trenutno vrednost in jo nastavi na danes, če še ni nastavljena
		var zacetno = document.getElementById(id).value;
		if (zacetno == "danes" || zacetno == "nikoli" || zacetno == "neskončnost" || zacetno == "pričetek akcije") {
			zacetno = dZac;
		}

		//prikaži trenutni datum v tabeli
		PrikaziKoledar(zacetno, id);
	} else
		alert("Napaka: Ni DOM!");
}

var w;
function PrikaziKoledar(FocusDate, pID) {
	try {
		if (w==null || w.document == null) {
			//odpri novo okno s koledarjem
			w = open_window("koledar.html", "koledar", 150, 200, 400, 300, false, false, true, true, true);
		}
	} catch (ex) {
		w = open_window("koledar.html", "koledar", 150, 200, 400, 300, false, false, true, true, true);
	}
	w.document.open();
	ww('<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><script type="text/javascript" src="koledar.js"></script><script type="text/javascript">var pID = "' + pID + '";</script><style type="text/css" media="all">@import "koledar.css";</style></head><body>');
	ww("<br />Kliknite na željeni datum in zaprite okno.<br />Trenutno je izbran datum: <b id='FocusDate'>" + FocusDate + "</b>");
	ww(DobiTabelo(FocusDate, pID));
	ww("<br /><a href='#' onclick='window.close();return false;'>Zapri okno</a></body></html>");
	w.document.close();
}

function DobiTabelo(FocusDate, pID) {
	//dobi datum iz FD
	var nd = Number(FocusDate.split(".")[0]);
	var nm = Number(FocusDate.split(".")[1]);
	var nl = Number(FocusDate.split(".")[2]);

	//preveri za prestopno leto
	if (isLeap(nl)) {
		arDni[1] = 29;
	} else {
		arDni[1] = 28;
	}

	//nastavi datume za gumba naprej/nazaj
	var prejMes = nm-1;
	nasMes = nm+1;

	var prejLet = nl;
	var nasLet = nl;

	if (nm==1) {
		prejMes = 12;
		prejLet = nl-1;
	} else if (nm == 12) {
		nasMes = 1;
		nasLet = nl+1;
	}

	//izpiši glavo
	var s = "<table style='width:100%;' id='tDatePicker'>";
	s += "<tr>";
	s += "<th><a href='#' title='Prejšnje leto' onclick='opener.PrikaziKoledar(\"1. 1. " + (nl-1) + "\", \"" + pID + "\");return false;'>&lt&lt</a></th>"; //nazaj leto
	s += "<th><a href='#' title='Prejšnji mesec' onclick='opener.PrikaziKoledar(\"1. " + prejMes + ". " + prejLet + "\", \"" + pID + "\");return false;'>&lt</a></th>"; //nazaj mesec
	s += "<th colspan='3'>" + arMes[nm-1] + " " + nl + "</th>";//mesec, leto
	s += "<th><a href='#' title='Naslednji mesec' onclick='opener.PrikaziKoledar(\"1. " + nasMes + ". " + nasLet + "\", \"" + pID + "\");return false;'>&gt</a></th>"; //naprej mesec
	s += "<th><a href='#' title='Naslednje leto' onclick='opener.PrikaziKoledar(\"1. 1. " + (nl+1) + "\", \"" + pID + "\");return false;'>&gt&gt</a></th>"; //naprej leto
	s += "</tr>";
	s += "<tr><th>pon</th><th>tor</th><th>sre</th><th>čet</th><th>pet</th><th>sob</th><th>ned</th></tr>";

	//dobi dan prvega dneva v mesecu
	var takrat = new Date(nl, nm-1, 1);
	var prvi = takrat.getDay()-1;
	if (prvi == -1) //nedelja
		prvi = 6;

	//dobi dan zadnjega dneva v mesecu
	takrat = new Date(nl, nm-1, arDni[nm-1]);
	var zadnji = takrat.getDay();

	var nr = Math.ceil((arDni[nm-1]+prvi) / 7); //število potrebnih vrstic

	for (var iDan = 1; iDan <= nr*7; iDan++) {
		//
		if (iDan%7 == 1) { //če je nov teden
			s += "\n<tr>"
		}

		if (iDan-1>=prvi && (iDan-prvi)<=arDni[nm-1]) {
			s += "\n<td onclick='IzberiDan(this, \"" + (iDan-prvi) + "." + nm + "." + nl + "\");'>" + (iDan-prvi) + "</td>";
		} else {
			s +="<td>&nbsp;</td>";
		}

		if (iDan%7 == 0) { //če je nov teden
			s += "</tr>"
		}

	}

	s += "</table>";
	return s;
}

//nastavi izbrani datum v oknu-staršu
function IzberiDan(sender, datum) {

	//pobarvaj vse celice v default barvo
	//
	var tds = document.getElementsByTagName("TD");

	for (var td in tds) {
		if (tds[td].style)
			tds[td].style.backgroundColor="beige";
	}

	//pobarvaj kliknjeno drugače
	sender.style.backgroundColor="#ccccff";
	//nastavi datum v tem oknu
	document.getElementById("FocusDate").innerHTML = datum;
	//nastavi datum v staršu
	window.opener.document.getElementById(pID).value = datum;
}



//vrne true, če je prestopno leto
function isLeap(y) {
	var il = false;

	//poseben primer so leta deljiva s sto, ki niso deljiva s štiristo
	if ((y % 100 == 0) && (y % 400 == 0)) {
		//1600,2000,2400
		il = true;
	} else {
		//vsako četrto je prestopno
		if (y % 4==0) {
			il = true;
		} else {
			il = false;
		}
	}



	return il;
}

function ww(text) {
	w.document.write(text);
}


function open_window(url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable) {
  toolbar_str = toolbar ? 'yes' : 'no';
  menubar_str = menubar ? 'yes' : 'no';
  statusbar_str = statusbar ? 'yes' : 'no';
  scrollbar_str = scrollbar ? 'yes' : 'no';
  resizable_str = resizable ? 'yes' : 'no';
  return window.open(url, name, 'left='+left+',top='+top+',width='+width+',height='+height+',toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str);
}