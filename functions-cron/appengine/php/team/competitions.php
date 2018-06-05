<?php

require_once '../simple_html_dom.php';
require_once '../functions.php';
require '../../vendor/autoload.php';

use Google\Cloud\Firestore\FirestoreClient;

$db = new FirestoreClient();
$collection = $db->collection('users');
var_dump($collection);

/*
echo "<h1>Competitions</h1>";

$urls = array(
    'Frauen' => 'http://www.fussball.de/mannschaft/sf-winterbach-sf-winterbach-saarland/-/saison/1718/team-id/01DIPRBFPS000000VV0AG811VTMPFBM2#!/',
    'Herren' => 'http://www.fussball.de/mannschaft/sf-winterbach-sf-winterbach-saarland/-/saison/1718/team-id/011MIBO43O000000VTVG0001VTR8C1K7#!/',
    'Altherren' => 'http://www.fussball.de/mannschaft/sf-winterbach-sf-winterbach-saarland/-/saison/1718/team-id/01AJSD0AVO000000VV0AG811VTUDOO2M#!/'
);

foreach ($urls AS $key => $url) {
    $output = array();
    $curlRequest = curlRequest($url);
    scrap_competitions($curlRequest);
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
*/