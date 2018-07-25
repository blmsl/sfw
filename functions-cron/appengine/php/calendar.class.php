<?php

trait sfwCalendar
{

  public $eventCollection = null;
  private $events = array();

  /**
   * @param $club
   * @param $startDate DateTime
   * @param $endDate DateTime
   * @return mixed
   */
  public function getEvents($club, $startDate, $endDate)
  {
    if (count($this->events) === 0) {
      $optParams = array(
        'timeMin' => $startDate->format('c'),
        'timeMax' => $endDate->format('c')
      );
      $eventList = $this->calendarService->events->listEvents($club['calendarId'], $optParams);
      foreach ($eventList AS $event){
        $this->events[$event["title"]] = $event;
      }
    }
    return $this->events;
  }

  /**
   * @param $match["matchStartDate"] DateTime
   * @param $locations
   * @return Google_Service_Calendar_Event
   */
  public function generateCalendarEvent($match, $locations)
  {

    $assignedLocation = '';
    foreach ($locations as $title => $id) {
      if ($id === $match["assignedLocation"]) {
        $assignedLocation = $title;
      }
    }

    /**
     * @var $match array
     */
    return new Google_Service_Calendar_Event(array(
      'summary' => $match["title"],
      'location' => $assignedLocation,
      'description' => $match["matchLink"],
      'start' => array(
        'dateTime' => $match["matchStartDate"]->format(DATE_ATOM),
        'timeZone' => 'Europe/Berlin'
      ),
      'end' => array(
        'dateTime' => $match["matchEndDate"]->format(DATE_ATOM),
        'timeZone' => 'Europe/Berlin'
      ),
      "creator" => array(
        "email" => "sfwinterbach@gmail.com",
        "displayName" => "SF Winterbach",
        "self" => true
      ),
    ));
  }

  /**
   * @param $eventList
   * @param $startDate DateTime
   * @param $endDate DateTime
   * @return bool
   */
  public function deleteEventsBetweenDates($eventList, $startDate, $endDate)
  {
    // Delete all events between $startDate and $endDate
    $optParams = array(
      'timeMin' => $startDate->format('c'),
      'timeMax' => $endDate->format('c')
    );
    #foreach ($eventList AS $event){

    #}
    return true;
  }

    /* Save data to Calendar
    foreach ($output as $match) {
    $eventData = generateCalendarEvent($match, $locations);
    $event = $calendarService->events->insert($club['calendarId'], $eventData);
    printf('Event created: %s\n', $event->htmlLink);
    }
     */

}
