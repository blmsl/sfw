<?php

trait sfwClub
{
    /**
     * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
     */
    public $clubCollection = null;
    private $clubs = array();

    private $defaultClubData = array(
        "fussballDeName" => 'sf-winterbach-saarland',
        "fussballDeId" => '00ES8GNBEO00001UVV0AG08LVUPGND5I'
    );

    public function setDefaultClub()
    {
        $url = 'http://www.fussball.de/verein/' . $this->defaultClubData["fussballDeName"] . '/-/id/' . $this->defaultClubData["fussballDeId"] . '#!/section/stage';
        $curlRequest = $this->curlRequest($url);
        $clubData = $this->scrap_clubData($curlRequest, $url, $this->defaultClubData["fussballDeId"]);
        $currentClub = $this->saveClub($clubData);
        $this->clubs[$currentClub['title']] = $currentClub;
    }

    public function scrap_clubData($html, $url, $id)
    {
        $output = array();
        /**
         * @var $html simple_html_dom_node
         */
        if ($html && is_object($html) && isset($html->nodes)) {
            if ($html->find("div.club-profile > h3", 0)) {
                $output["title"] = $html->find("div.club-profile > h3", 0)->plaintext;
            }

            if ($html->find("div.team-logo > img", 0)) {
                $output["logoURL"] = $html->find("div.team-logo > img", 0)->src;
            }

            $output["fussballde"] = array(
                "clubId" => $id,
                "clubUrl" => $url
            );

            // Vereinsdaten sammeln
            $items = $html->find("div.club-profile .factfile-data .column-left, div.club-profile .factfile-data .column-right");
            foreach ($items AS $item) {
                /**
                 * @var $item simple_html_dom_node
                 */
                if ($item->find('.label', 0) && $item->find('.value', 0)) {

                    $value = trim($item->find('.value', 0)->plaintext);

                    switch ($item->find('.label', 0)->plaintext) {
                        case "Adresse":
                            $output["address"] = $value;
                            break;
                        case "Ansprechpartner":
                            $output["info"]["assignedContact"] = $value;
                            break;
                        case "Gründungsjahr":
                            $output["info"]["founding"] = $value;
                            break;
                        case "Vereinsfarben":
                            $output["info"]["clubColours"] = $value;
                            break;
                        case "Website":
                            $output["info"]["website"] = $value;
                            break;
                    }
                }
            }

            // Erfolge
            $items = $html->find('div.timeline-content .section');
            foreach ($items as $item) {

                $seasonTitle = $item->find('.season .year', 0)->plaintext;
                $startYear2Digit = substr($seasonTitle, 0, 2);

                $startDate = DateTime::createFromFormat('y-m-d H:i:s', $startYear2Digit . '-07-01 12:00:00');
                $currentSeason = $this->setSeason($startDate->format('Y-m-d H:i:s'), $this->getSeasons());

                $events = $item->find('.event');
                foreach ($events as $event) {
                    /**
                     * @var $event simple_html_dom_node
                     */
                    $output["timeLine"][] = array(
                        'title' => $event->find('.title', 0)->plaintext . ' ' . $event->find('.subtitle', 0)->plaintext,
                        'subTitle' => $event->find('.copy', 0)->plaintext,
                        'startDate' => $currentSeason ["StartDate"],
                        'endDate' => $currentSeason["EndDate"]
                    );
                }
            }
        }
        return $output;
    }

    public function getClubs($clubTitle = null)
    {
        $clubList = array();
        if ($clubTitle) {
            foreach ($this->clubCollection->where('title', '=', $clubTitle)->documents() as $doc) {
                $clubList[$doc["title"]] = $doc;
            }
        } else {
            foreach ($this->clubCollection->documents() as $doc) {
                $clubList[$doc["title"]] = $doc;
            }
        }

        if (count($clubList) === 0 && !$clubTitle) {
            $this->setDefaultClub();
        } elseif(count($clubList) === 0 && $clubTitle){
            echo "<p>Es wurde kein Verein mit diesem Namen gefunden.</p>";
            exit();
        }
        return $clubList;
    }

    public function saveClub($data)
    {
        return $this->saveFireStoreObject($this->clubCollection, $data, null);
    }

}
