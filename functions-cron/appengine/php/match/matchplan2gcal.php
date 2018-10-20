<?php
error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');
header("Content-Type: text/html; charset=utf-8");
require "../../vendor/autoload.php";
require "../base.class.php";
require_once "../utils.global.php"; # by emre isik
if (!strpos(gethostname(), 'appspot.com')) {
  putenv('GOOGLE_APPLICATION_CREDENTIALS=../client_secret.json');
}
$project = new sfwApp('sf-winterbach', array('calendarService'));
$time_start = microtime(true);
echo $project->generateHeader();
echo "<h1>Exportiere den Spielplan in den Google-Kalender</h1>";
$jahr = isset($_GET['jahr']) ? DateTime::createFromFormat('Y', $_GET['jahr']) : new DateTime();
// falls ein Jahr übergeben wurde wird die komplette Saison als Start- und Ende gesetzt,
// ansonsten die nächsten 4 Monate ab heute
$loadingLimit = null;
if (isset($_GET['jahr'])) {
  $seasonStart = $project->getSeasonStartDate($jahr);
  $seasonStartClone = clone($seasonStart);
  $loadingLimit = $seasonStartClone->modify('+1 year')->modify('-1 day');
  $seasonEndDate = $loadingLimit;
  echo "<h3>Lade Daten vom " . $seasonStart->format('d.m.Y') . " bis " . $loadingLimit->format('d.m.Y') . " </h3>";
} else {
// load data for the next 4 months
  $seasonStart = $jahr;
  $seasonStartClone = clone($seasonStart);
  $loadingLimit = $seasonStartClone->modify('+4 month');
  $seasonEnd = clone($seasonStart);
  $seasonEndDate = $seasonStartClone->modify('+1 year')->modify('-1 day');
  echo "<h3>Lade Daten vom " . $seasonStart->format('d.m.Y') . " bis " . $loadingLimit->format('d.m.Y') . " </h3>";
}
// App aus der DB laden
$app = $project->getCurrentApplication();
if (!$app) {
  echo "Keine aktuelle App ausgewählt";
  exit();
}
$savedMatches = array();
$calendarEvents = array();
$locations = $project->getLocationList();
foreach ($app[0]["assignedCalendars"] as $calendar) {
  if ($calendar["title"] === 'Spielplan') {
    // Load matches only, if the delete option isn´t triggered
    if (!isset($_GET['delete'])) {
      $matches = $project->getMatchesBetweenStartAndEndDate($seasonStart, $loadingLimit);
      foreach ($matches as $match) {
        $matchStartDate = $match["matchStartDate"];
        /**
         * @var $matchStartDate Google\Cloud\Core\Timestamp
         */
        if ($match["assignedLocation"] !== 0) {
          $title = $match['title'] . '-' . $project->getLocationById($match["assignedLocation"])["title"] . '-' . $matchStartDate->get()->format('d.m.Y H:i:s');
          $matchEvent = $project->generateEventItem($match, $project->getLocationById($match["assignedLocation"])["title"]);
          $savedMatches[$title] = $matchEvent;
        }
      }
    }
    // Lade die Spiele der nächsten 3 Monate
    $googleCalendarEvents = $project->getEvents($calendar["link"], $seasonStart, $loadingLimit);
    // Alle Calender-Termine laden; wenn ein Termin zu einem gelöschten Spiel gefunden wurde wird der Termin gelöscht
    foreach ($googleCalendarEvents as $key => $event) {
      // Batch to create and delete matches in the calendar
      $project->client->setUseBatch(true);
      $batch = new Google_Http_Batch($project->client);
      if (isset($_GET['delete'])) {
        echo $event->getSummary()  . "<br />";
        $request = $project->calendarService->events->delete($calendar["link"], $event->getId());
        $batch->add($request);
      }
      else {
        $startDate = new DateTime($event->getStart()->dateTime);
        $title = $event["summary"] . "-" . $event["location"] . "-" . $startDate->format('d.m.Y H:i:s');
        if (!array_key_exists($title, $savedMatches)) {
          $request = $project->calendarService->events->delete($calendar["link"], $event->getId());
          $batch->add($request);
        } else {
          $calendarEvents[$event["summary"] . "-" . $event["location"] . "-" . $startDate->format('d.m.Y H:i:s')] = true;
        }
      }
    }
    if (!isset($_GET['delete'])) {
      // Laden aller Spiele => wenn kein Termin zu diesem Spiel gefunden wurde, wird dieser erstellt
      foreach ($savedMatches as $key => $matchEvent) {
        if (!array_key_exists($key, $calendarEvents)) {
          $request = $project->calendarService->events->insert($calendar["link"], $project->setCalendarEvent($matchEvent));
          $batch->add($request);
        }
      }
    }
  }
}
if(isset($_GET['delete'])){
  echo "Alle Termine gelöscht";
}
$result = $batch->execute();
#var_dump($result);
echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
