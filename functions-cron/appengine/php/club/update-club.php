<?php

/**
 * alle 150 Tage werden die Informationen des Vereins neu von fussball.de geladen
 */

echo "Update Vereinsdaten 1x pro Jahr";

/*
$clubs = array();
$dbClubs = $db->collection('clubs');
foreach ($dbClubs->documents() as $club) {
    $clubs[$club["title"]] = $club;
    // get new achievements from clubPage, address and contact
    // $curlRequest = curlRequest($club["fussballde"]["clubUrl"]);
    // $data = scrap_clubData($curlRequest, $seasons, $dbSeasons, $club["fussballde"]["clubId"], $club["fussballde"]["clubUrl"]);
}
*/