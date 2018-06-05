<?php

header("Content-Type: text/html; charset=utf-8");

require "../simple_html_dom.php";
require "../functions.php";

/*
namespace Google\Cloud\Samples\Firestore;
use Google\Cloud\Firestore\FirestoreClient;
require __DIR__ . '/vendor/autoload.php';
*/
$clubId = '00ES8GNBEO00001UVV0AG08LVUPGND5I';

$currentSeason = array(
    'StartDate' => new DateTime('2017-07-01'),
    'EndDate' => new DateTime('2018-06-30')
);

$url = 'http://www.fussball.de/ajax.club.matchplan/-/id/' . $clubId . '/mime-type/HTML/mode/PAGE/show-filter/false/max/9999/datum-von/' . $currentSeason["StartDate"]->format('Y-m-d') . '/datum-bis/' . $currentSeason["EndDate"]->format('Y-m-d') . '/show-venues/checked/offset/0';

$output = array();
$curlRequest = curlRequest($url);
scrap_matchPlan($curlRequest, 'SF Winterbach');

echo generateHeader();

if($output) {
    echo generateMatchPlanTable($output);
}
else{
    echo "<p>Keine Spiele gefunden</p>";
}

echo generateFooter();