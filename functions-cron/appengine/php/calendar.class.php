<?php

trait sfwCalendar
{
    public $eventCollection = null;

    /**
     * @param $calendarId string
     * @param $startDate DateTime
     * @param $endDate DateTime
     * @return Google_Service_Calendar_Events
     */
    public function getEvents($calendarId, $startDate, $endDate)
    {
        $optParams = array(
            'maxResults' => 2500,
            'timeMin' => $startDate->format('c'),
            'timeMax' => $endDate->format('c')
        );
        $eventList = $this->calendarService->events->listEvents($calendarId, $optParams);
        return $eventList["items"];
    }

    /**
     * @param $match ["matchStartDate"] DateTime
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

    public function generateEventItem($match, $locations)
    {
        /**
         * @var $match array
         */
        return array(
            'description' => $match["matchType"] . ' <a target="_blank" href="'.$match["matchLink"].'">Link</a>',
            'end' => $match["matchEndDate"]->get()->format(DATE_RFC3339),
            'start' => $match["matchStartDate"]->get()->format(DATE_RFC3339),
            'location' => $locations[$match['assignedLocation']],
            'title' => $match['title']
        );
    }

    public function saveCalendarEvent($calendarId, $matchEvent)
    {
        $start = new Google_Service_Calendar_EventDateTime();
        $start->setDateTime($matchEvent["start"]);

        $end = new Google_Service_Calendar_EventDateTime();
        $end->setDateTime($matchEvent["end"]);

        $eventData = new Google_Service_Calendar_Event();
        $eventData->setSummary($matchEvent['title']);
        $eventData->setLocation($matchEvent['location']);
        $eventData->setDescription($matchEvent["description"]);
        $eventData->setStart($start);
        $eventData->setEnd($end);
        return $this->calendarService->events->insert($calendarId, $eventData);
    }

}
