<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');
header("Content-Type: text/html; charset=utf-8");

require "../../vendor/autoload.php";
require "../base.class.php";


$project = new sfwApp();
$time_start = microtime(true);

echo $project->generateHeader();

echo "<h1>Erstelle die Grundkonfiguration</h1>";

// set batch
$batch = $project->db->batch();

try {
    // set application
    $project->getCurrentApplication($batch);

    // set club
    $project->getClubByTitle($project->defaultClub, $batch);
    $project->generateList('Gespeicherte Vereine', array($project->defaultClub["title"]));

    // set current season
    $currentYear = new DateTimeImmutable();
    $seasonStart = DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $currentYear->format('Y') . '-07-01 00:00:00');
    $season = $project->getSeasonByDate($seasonStart, $batch);
    $project->generateList('Gespeicherte Saisons', array($season["title"]));

    // set category-types
    $savedCategoryTypes = [];
    $categoryTypes = array('team.types', 'location.types', 'club.position.types', 'team.position.types', 'sponsor.types');
    $project->generateList('Gespeicherte Kategorie-Arten', $categoryTypes);
    foreach ($categoryTypes as $link) {
        $savedCategoryTypes[$link] = $project->getCategoryTypeByLink($link, $batch);
    }

    // set categories
    $categories = array(
        // Team-Types
        array('title' => 'Junioren', 'type' => $savedCategoryTypes['team.types']),
        array('title' => 'Seniorinnen', 'type' => $savedCategoryTypes['team.types']),
        array('title' => 'Senioren', 'type' => $savedCategoryTypes['team.types']),
        array('title' => 'G-Junioren', 'type' => $savedCategoryTypes['team.types']),
        array('title' => 'F-Junioren', 'type' => $savedCategoryTypes['team.types']),
        array('title' => 'E-Junioren', 'type' => $savedCategoryTypes['team.types']),
        array('title' => 'D-Junioren', 'type' => $savedCategoryTypes['team.types']),
        array('title' => 'C-Junioren', 'type' => $savedCategoryTypes['team.types']),
        array('title' => 'B-Junioren', 'type' => $savedCategoryTypes['team.types']),
        array('title' => 'A-Junioren', 'type' => $savedCategoryTypes['team.types']),
        array('title' => 'Frauen', 'type' => $savedCategoryTypes['team.types']),
        array('title' => 'Herren', 'type' => $savedCategoryTypes['team.types']),
        // Location-Types
        array('title' => 'Hartplätze', 'type' => $savedCategoryTypes['location.types']),
        array('title' => 'Rasenplätze', 'type' => $savedCategoryTypes['location.types']),
        array('title' => 'Kunstrasenplätze', 'type' => $savedCategoryTypes['location.types']),
        array('title' => 'Hallen', 'type' => $savedCategoryTypes['location.types']),
        // Club-Position-Types
        array('title' => 'Vereinsführung', 'type' => $savedCategoryTypes['club.position.types']),
        // Team-Position-Types
        array('title' => 'Mannschaftsinterne Aufgaben', 'type' => $savedCategoryTypes['team.position.types']),
        array('title' => 'Aufgaben in der Mannschaftsleitung', 'type' => $savedCategoryTypes['team.position.types']),
        // Sponsor-Types
        array('title' => 'Bandenwerbung', 'type' => $savedCategoryTypes['sponsor.types']),
        array('title' => 'Vereinsheft SFW Echo', 'type' => $savedCategoryTypes['sponsor.types']),
        array('title' => 'Fischer-Fußballschule 2019', 'type' => $savedCategoryTypes['sponsor.types']),
        array('title' => 'Weltrekordversuch', 'type' => $savedCategoryTypes['sponsor.types'])
    );
    $savedCategories = [];
    $project->generateList('Gespeicherte Kategorien', array_column($categories, 'title'));
    foreach ($categories as $category) {
        $savedCategories[$category['title']] = $project->getCategoryByTitleAndCategoryType($category['title'], $category['type']['id'], $batch);
    }

    $batch->commit();
    echo "<p>Import durchgeführt!</p>";
    echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
    echo $project->generateFooter();

} catch (Exception $e) {
    echo($e->getMessage());
}