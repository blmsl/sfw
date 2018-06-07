<?php

header("Content-Type: text/html; charset=utf-8");

require "../simple_html_dom.php";
require "../functions.php";


echo "<h1>Standings</h1>";

$urls = array(
    'Frauen' => 'http://www.fussball.de/mannschaft/sf-winterbach-sf-winterbach-saarland/-/saison/1718/team-id/01DIPRBFPS000000VV0AG811VTMPFBM2#!/',
    'Herren' => 'http://www.fussball.de/mannschaft/sf-winterbach-sf-winterbach-saarland/-/saison/1718/team-id/011MIBO43O000000VTVG0001VTR8C1K7#!/',
    'Altherren' => 'http://www.fussball.de/mannschaft/sf-winterbach-sf-winterbach-saarland/-/saison/1718/team-id/01AJSD0AVO000000VV0AG811VTUDOO2M#!/'
);

foreach ($urls AS $key => $url) {
    $output = array();
    $curlRequest = curlRequest($url);
    scrap_standings($curlRequest);
    echo "<h2>" . $key . "</h2>";
    echo "<pre>";
    if($output) {
        print_r($output);
    }
    else{
        echo "Keine Tabelle vorhanden";
    }
    echo "</pre>";
}