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

    public function generateJSONEventList($events){
        $eventList = array();
        foreach ($events AS $event){
            /**
             * @var $event object
             */
            $startDate = new DateTime($event->getStart()->dateTime);

            $eventList[] = array(
                'description' => $event["description"],
                'start' => $startDate->format('Y-m-d H:i:s'),
                'location' => $event["location"],
                'title' => $event["summary"]
            );
        }
        return $eventList;
    }

    public function saveCalendarEvent($eventData, $calendarId){
        return $this->calendarService->events->insert($calendarId, $eventData);
    }

}
