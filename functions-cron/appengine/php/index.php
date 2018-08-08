<?php

require "../vendor/autoload.php";
require "base.class.php";

$project = new sfwApp('sf-winterbach');

$time_start = microtime(true);

echo $project->generateHeader();

echo "<h1>Spielplan</h1>";
echo "<ul>";
echo "<li><a href='/php/club/matchplan-import.php'>Spielplan importieren (aktuelle Saison)</a></li>";
echo "<li><a href='/php/club/matchplan-calendar.php'>Spielplan als JSON anzeigen (aktuelle Saison)</a></li>";
echo "</ul>";

echo "<h1>Mitglieder</h1>";
echo "<ul>";
echo "<li><a href='/php/member/dfb-import.php'>Mitglieder aus dem DFB-Export importieren</a></li>";
echo "<li><a href='/php/member/drive-import.php'>Mitglieder aus dem Google-Drive importieren</a></li>";
echo "</ul>";

echo "<h1>Mannschaften</h1>";
echo "<ul>";
echo "<li><a href='/php/team/import.php'>Wettbewerbe und Tabellenstände importieren (aktuelle Saison)</a></li>";
echo "</ul>";

echo $project->generateFooter();
