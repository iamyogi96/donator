use strict;
use Test::More tests => 3;
require "../htdocs/modules/DntFunkcije.pm";

is(DntFunkcije::trim("  trim   "), "trim", 'DntFunkcije::trim()');
is(DntFunkcije::sl_date("2008-11-21 00:00:00"), "21/11/2008", 'DntFunkcije::sl_date()');
is(DntFunkcije::FormatFinancno("12345.6789"), '12.345,68', 'DntFunkcije::formatFinancno()');
