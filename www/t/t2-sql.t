use Test::More tests => 23;
use DBI;
#require "../lib/perl/DntQuery.pm";
require "../htdocs/modules/DntFunkcije.pm";
use base qw(Apache::Request);

my $dbh = DntFunkcije->connectDB;

#DB_CONNECT TEST:
ok(defined $dbh, 'Connect to database');

#SELECT TEST:
my $sql = "SELECT id, test_date, test_int, test_char ".
			"FROM test_table ".
            "WHERE id=?";
my $sth = $dbh->prepare($sql);
$sth->execute(1);
my $res = $sth->fetchrow_hashref;

ok(defined $sth, 'SELECT row');
is($res->{'test_char'}, "riba raca rak..", 'SELECT character test');
is($res->{'test_int'}, 42, 'SELECT integer test');
is(DntFunkcije::sl_date($res->{'test_date'}), "23/01/2009", 'SELECT date test');

#INSERT TEST:
$sql = "INSERT INTO test_table( ".
            "test_int, test_char, test_date) ".
			"VALUES (?, ?, ?)";
$sth = $dbh->prepare($sql);
$sth->execute(99, 'abcd1234', '2009-12-31');
ok(defined $res, 'INSERT test');

$sql = "SELECT id, test_int, test_char, test_date ".
			"FROM test_table ".
            "ORDER BY id DESC LIMIT 1";
$sth = $dbh->prepare($sql);
$sth->execute();
$res = $sth->fetchrow_hashref;
my $last_id = $res->{'id'};
ok($last_id > 1, "INSERT id test");
is(DntFunkcije::trim($res->{'test_char'}), "abcd1234", 'INSERT character test');
is($res->{'test_int'}, 99, 'INSERT integer test');
is(DntFunkcije::sl_date($res->{'test_date'}), "31/12/2009", 'INSERT date test');

#UPDATE TEST:
$sql = "UPDATE test_table ".
		"SET test_int=?, test_char=?, test_date=? ".
		"WHERE id=?;";
$sth = $dbh->prepare($sql);
$sth->execute(11, '4321dcba','2010-8-7', $last_id);
ok(defined $res, 'UPDATE test ');
$sql = "SELECT id, test_int, test_char, test_date ".
			"FROM test_table ".
            "ORDER BY id DESC LIMIT 1";
$sth = $dbh->prepare($sql);
$sth->execute();
$res = $sth->fetchrow_hashref;
is(DntFunkcije::trim($res->{'test_char'}), "4321dcba", 'UPDATE character test');
is($res->{'test_int'},11, 'UPDATE integer test');
is(DntFunkcije::sl_date($res->{'test_date'}), "07/08/2010", 'UPDATE date test');

#DELETE TEST:
$sql = "DELETE FROM test_table WHERE id=?";
$sth = $dbh->prepare($sql);
$sth->execute($last_id);
$sql = "SELECT id ".
			"FROM test_table ".
            "ORDER BY id DESC LIMIT 1";
$sth = $dbh->prepare($sql);
$sth->execute();
$res = $sth->fetchrow_hashref;
is($res->{id}, 1, 'DELETE test');


$dbh = DntFunkcije->connectDBtest;
ok(defined $dbh, 'Connect to test database');
#DONATOR:
BEGIN { unshift @INC, '../htdocs/modules'; }
require "../htdocs/modules/DntDonatorji.pm";
##INSERT TEST:
my $don_test=  DntDonatorji::DonatorInsert($dbh, "Testno podjetje", "test", "test",
				  "test", 1, 1000,
				  "12345567", "Dokument", "123456",
				  "1234", "email@test.com", "0",
				  "Test", 12, 1000,
				  0, "Gospod", 0,
				  1, 1,
				  1, 1, 1,
				  1, 1, 1,
				  "Lj", "1122",
				  "", "2009-12-12");
ok($don_test > 1, "INSERT donator");
##UPDATE TEST:
$don_test=  DntDonatorji::DonatorUpdate($dbh, "Testno podjetje2", "test2", "test2",
				  "test2", 2, 2000,
				  "22345567", "Dokument2", "1234562",
				  "12342", "email2@test.com", "0",
				  "Test", 12, 2000,
				  0, "Gospod", 0,
				  1, 1,
				  1, 1, 0,
				  1, 1, 0,
				  "Lj", "1122",
				  $don_test, "2009-11-11");
ok($don_test > 1, "UPDATE donator");
die('No CGI');
#POGODBE:
require "/htdocs/modules/DntPogodbe.pm";
my $id_agreement = "2090201400333";

##INSERT TEST
my $webapp = DntPogodbe->new({QUERY => DntQuery->new('test=1&rm=shrani_pogodbo&id_don_nov=&hid_id_agreement=&hid_vneseno=1&hid_id=14&hid_status=1&hid_podjetje=Pro-moda+Sebastijan+Breznik+s.p.&hid_prednaziv=&hid_upokojenec=0&hid_ime=&hid_priimek=&hid_ulica=Cerkvenjak&hid_hisnaSt=19+A&hid_postnaSt=2236&hid_davcnaSt=SI30686742&hid_davcniZavezanec=1&hid_danRojstva=&hid_mesecRojstva=&hid_letoRojstva=&hid_emso=&ui=1248681877&hid_don=0&edb_projekt=1&edb_leto=09&edb_dogodek=01&edb_komercialist=001&uredi=&edb_id_agreement='.$id_agreement.'&edb_datumVnosa=27%2F07%2F2009&edb_datumPodpisa=27%2F07%2F2009&edb_id_donator='.$don_test.'&edb_status=1&edb_podjetje=TestPodjetje&edb_prednaziv=&edb_ime=TestIme&edb_priimek=TestPriimek&edb_ulica=TestUlica&edb_hisnaSt=42&edb_postnaSt=2236&edb_postnaSt2=Cerkvenjak&edb_davcnaSt=SI22222222&davcniZavezanec=1&edb_danRojstva=12&edb_mesecRojstva=12&edb_letoRojstva=2000&edb_emso=&edb_amount=200%2C00&edb_amount1=123%2C00&edb_nacinPlacila=G1&edb_placanDne=27%2F07%2F2009&edb_num_installments=12&edb_amount2=6%2C42&edb_frekvenca=08&edb_valuta=30&edb_vrstaBremenitve=A1&edb_aktiviraj=27%2F07%2F2009&nazaj=')});
is($webapp->PogodbaShrani(), 1, "INSERT agreement");

##UPDATE TEST
$q = new DntQuery('test=1&rm=shrani_pogodbo&id_don_nov=11&hid_id_agreement=2090201400665&hid_vneseno=1&hid_id=11&hid_status=0&hid_podjetje=&hid_prednaziv=Gospa&hid_upokojenec=0&hid_ime=Andreja&hid_priimek=Znidar&hid_ulica=Detelova&hid_hisnaSt=7&hid_postnaSt=1251&hid_davcnaSt=&hid_davcniZavezanec=0&hid_danRojstva=05&hid_mesecRojstva=11&hid_letoRojstva=1964&hid_emso=&ui=&hid_don=0&uredi=1&edb_id_agreement='.$id_agreement.'&edb_datumVnosa=24%2F07%2F2009&edb_datumPodpisa=24%2F05%2F2009&edb_id_donator='.$don_test.'&edb_status=0&edb_prednaziv=Gospa&edb_ime=TestIme&edb_priimek=TestPriimek&edb_ulica=TestUlica&edb_hisnaSt=2&edb_postnaSt=1251&edb_postnaSt2=Morav%7Ee&edb_davcnaSt=&edb_danRojstva=05&edb_mesecRojstva=11&edb_letoRojstva=1964&edb_emso=&edb_amount=72%2C00&edb_amount1=0%2C00&edb_nacinPlacila=G1&edb_num_installments=6&edb_amount2=12%2C00&edb_frekvenca=18&edb_vrstaBremenitve=01&edb_TRR=&edb_aktiviraj=18%2F08%2F2009&nazaj=');
$webapp = DntPogodbe->new({QUERY => $q});
is($webapp->PogodbaShrani(), 1, "UPDATE agreement");

#OBROKI:
require "/htdocs/modules/DntObroki.pm";

##GENERIRAJ OBROKE
$q = new DntQuery('test=1&seja=&izberiVse=&rm=generiraj&izberiId='.$id_agreement.'_18%2F08%2F2009&generiraj=Generiraj+obroke');
my $webapp_obroki = DntObroki->new({QUERY => $q});
is($webapp_obroki->ObrokiGeneriraj(), 1, "GENERATE pay_installment");

#DELETE TEST:

##DELETE sfr_agreement
$q = new DntQuery('test=1&rm=zbrisi&brisi=pogodba&id_pogodbe=&brisiId='.$id_agreement);
my $webapp_pogodba_zbrisi = DntPogodbe->new({QUERY => $q});
is($webapp_pogodba_zbrisi->PogodbeZbrisi(), 1, "DELETE agreement");

##DELETE sfr_donor
$sql="DELETE FROM sfr_donor WHERE id_donor=?";
$sth = $dbh->prepare($sql);
$sth->execute($don_test);
$sth = $dbh->prepare($sql);
$sql = "SELECT id_donor ".
			"FROM sfr_donor ".
            "ORDER BY id_donor DESC LIMIT 1";
$sth = $dbh->prepare($sql);
$sth->execute();
$res = $sth->fetchrow_hashref;
is($res->{id_donor}, 1, 'DELETE test');
