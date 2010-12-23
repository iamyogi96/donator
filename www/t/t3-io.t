use Test::More tests => 6;
use DBI;
require "../htdocs/modules/DntFunkcije.pm";
my $i=0;
my $frstChar;
my $file;
my $tmpStr;
my @parts;
my $poz;
my $scndChar;
my $strLen;
my $variable;
my $value;
my $vrstica;
$tmpStr = 'Content-Disposition: form-data; name="vrsta_uvoza_dok"

datoteke z banke
-----------------------------10802122381820
Content-Disposition: form-data; name="edb_datoteka"; filename="PP797401110904220101.ZC"
Content-Type: application/octet-stream

90797401110904220101000000020090422030039                                                                                                                                                        
01911325500904210101034856020090421000000000020000978051008010695309   1090101700391                                          00001000000020009708701                                  0420071000
91797401110904220101000001020090421000000000020000978051008010695309   6020003-901-210409  NLB                                000010000000200097                                                 
99797401110904220101000001020090422000000000020000978                                                                                                                                            

-----------------------------10802122381820
Content-Disposition: form-data; name="rm"

Precitaj
-----------------------------10802122381820
Content-Disposition: form-data; name="seja"


-----------------------------10802122381820--
';
@parts = split( /-----------------------------/, $tmpStr );

foreach my $pr (@parts){
	
	$i++;
	$pr =~ /name="(.*?)"/;
	$variable = $1;
	$value = DntFunkcije::trim($');
	
	if ($variable  eq "vrsta_uvoza_dok"){
		is("datoteke z banke", $value, "INPUT test file type");
		if ($value  eq 'datoteke z banke'){
			#print "Uvazam z banke<br>";
			UvoziZBanke($parts[$i], 0);
			#UvoziDavcneZavezance($parts[$i], 0);
			#print "content-type: text/html\n\n";
		}
		
	}
}
sub UvoziZBanke($$){
	
	my $dbh;
	my $str = shift;
	my $id = shift;
	
	#preberi ime datoteke:
	$str =~  /filename="(.*?)"/;
	my $filename=$1;
	is("PP797401110904220101.ZC", $filename, "INPUT test file name");
	$str =~ /Content-Type:\ (.*?)(\n|\r)/;
	my $contentType=$1;
	
	#content je vse, kar sledi content typu:
	my @content=split('\n',DntFunkcije::trim($'));	
	my $test;
	foreach $vrstica (@content){
		$vrstica = DntFunkcije::trim($vrstica);
		$s1 = substr($vrstica,0,2);
		$s2 = substr($vrstica,26,1);
		$trr_projekt = substr($vrstica,53,18);
		$s4 = substr($vrstica,164,2);
		$s5 = substr($vrstica,166,2);
		$test .= $s1;
	}
	is("90019199", $test, "INPUT test file contents");
}
$tmpStr = 'Content-Disposition: form-data; name="content"

id pogodbe;id donatorja;pravna oseba;naziv podjetja;prednaziv;ime;priimek;ulica;ulicna stevilka;stara pogodba;id vnasalca;id projekta;id zaposlenega;id dogodka;id pogodbe;stara pogodba;st obroka;datum aktivacije
2090201100033;13;;;Gospa;Zdenka;Flisek;Mosenik;5 A;;;2;11;02;2090201100033;;1;18/08/2009

-----------------------------266892901927486
Content-Disposition: form-data; name="index"

1239,
-----------------------------266892901927486
Content-Disposition: form-data; name="izvor"

obroki
-----------------------------266892901927486
Content-Disposition: form-data; name="datum_chk"

ON
-----------------------------266892901927486
Content-Disposition: form-data; name="datum"

30.07.2009
-----------------------------266892901927486
Content-Disposition: form-data; name="filename"

2009-07-30_obroki.csv
-----------------------------266892901927486
Content-Disposition: form-data; name="izvoz"

izvoz
-----------------------------266892901927486
Content-Disposition: form-data; name=".cgifields"

datum_chk
-----------------------------266892901927486--
';
my $con = 'id pogodbe;id donatorja;pravna oseba;naziv podjetja;prednaziv;ime;priimek;ulica;ulicna stevilka;stara pogodba;id vnasalca;id projekta;id zaposlenega;id dogodka;id pogodbe;stara pogodba;st obroka;datum aktivacije
2090201100033;13;;;Gospa;Zdenka;Flisek;Mosenik;5 A;;;2;11;02;2090201100033;;1;18/08/2009';

@parts = split( /-----------------------------/, $tmpStr );
foreach my $pr (@parts){

	my $str = $pr;

	$pr =~ /name="(.*?)"/;
	$variable = $1;
	$value = DntFunkcije::trim($');
	if($variable eq "content"){
		if($content eq undef){
			$content=$value;
		}
		else{
			$content2=$value;
		}
	}
	elsif($variable eq "filename"){
		$filename = $value;
	}
	elsif($variable eq "datum_chk"){
		$datumChk=$value;
	}
	elsif($variable eq "datum"){				
		$datum=substr($value, 6, 10)."-".substr($value, 3, 2)."-".substr($value, 0, 2);
	
	}
	elsif($variable eq "izvor"){				
		$izvor=$value;
	}
	elsif($variable eq "index"){
		$pogoj=$value;
	}
}
ok('obroki' eq $izvor, "OUTPUT test file source");
ok('2009-07-30_obroki.csv' eq $filename, "OUTPUT test filename");
ok($con eq $content, "OUTPUT test file contents");
