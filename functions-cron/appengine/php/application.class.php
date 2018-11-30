<?php


trait sfwApplication
{
    /**
     * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
     */
    public $applicationCollection = null;
    private $applications = array();

    /**
     * @param $batch \Google\Cloud\Firestore\WriteBatch
     * @return array
     */
    public function getCurrentApplication($batch)
    {
        $query = $this->applicationCollection->where('isCurrentApplication', '=', true);

        $snapshot = $query->documents();

        if ($snapshot->isEmpty()) {
            echo "isEmpty";

            return $this->saveFireStoreObject($this->applicationCollection,
                array(
                    'assignedCalendars' => array(),
                    'isCurrentApplication' => true,
                    'page' => array(
                        'isEnabled' => true,
                        'name' => 'SF Winterbach e.V.',
                        'title' => 'Homepage der Sportfreunde Winterbach e.V.',
                        'description' => 'Bescheribung der Seite',
                        'email' => 'info@sfwinterbach.com',
                        'assignedKeywords' => 'Fußball, Amateure, Saarland, Saar-FV, Winterbach, Sportfreunde, Verein'
                    ),
                    'urlShortening' => array('title' => 'bitly', 'key' => '123456'),
                    'registration' => 'subscriber',
                    'downtime' => array('isEnabled' => false, 'message' => 'Die Seite ist momentan im Wartungsmodus. Bitte versuche es zu einem späteren Zeitpunkt erneut.'),
                    'mailing' => array(
                        array('title' => 'Geburtstagsgrüße als Kopie', 'emails' => array('thomas.handle@gmail.com', 'mail@r-klein.com', 'ronnyhassel@gmail.com'), 'isActive' => true),
                        array('title' => 'Mannschaft des Monats', 'emails' => array('thomas.handle@gmail.com'), 'isActive' => true),
                        array('title' => 'Mitglieder der Woche', 'emails' => array('thomas.handle@gmail.com', 'mail@r-klein.com'), 'isActive' => true)
                    ),
                    'social' => array(
                        array('link' => 'https://www.facebook.com/sfwinterbach/', 'title' => 'Facebook'),
                        array('link' => 'https://twitter.com/SFWinterbach', 'title' => 'Twitter'),
                        array('link' => 'https://www.youtube.com/channel/UCY1lS06YkzBqxzlrpUtpV1A', 'title' => 'YouTube'),
                        array('link' => 'https://www.instagram.com/sfwinterbach/', 'title' => 'Instagram'),
                        array('link' => 'vimeo', 'title' => 'Vimeo'),
                    )
                ),
                $batch);
        }

        $application = null;
        if ($snapshot->size() > 0) {
            foreach ($snapshot as $doc) {
                $application = array(
                    'id' => $doc["id"],
                    'page' => $doc["page"],
                    'assignedCalendars' => $doc["assignedCalendars"],
                    'socialNetworks' => $doc["socialNetworks"]
                );
                break;
            }
        }
        return $application;
    }

}
