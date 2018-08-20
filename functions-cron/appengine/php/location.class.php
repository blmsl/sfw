<?php


trait sfwLocation
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $locationCollection = null;
  private $locations = array();

  public function getLocationByLocationDataAndCategory($locationData, $locationCategory, $batch){

      $title = $locationData["type"] . " ". $locationData["address"]["streetName"] .", " . $locationData["address"]["city"];

      $query = $this->locationCollection
          ->where('title', '=', $title)
          ->where('assignedCategory', '=', $locationCategory["id"]);
      $snapshot = $query->documents();

      if ($snapshot->isEmpty()) {
          return $this->saveFireStoreObject(
              $this->locationCollection,
              array(
                  'title' => $title,
                  'address' => $locationData["address"],
                  'assignedCategory' => $locationCategory["id"]
              ),
              $batch);
      }

      if ($snapshot->size() === 1) {
          foreach ($snapshot as $doc) {
              return array(
                  'id' => $doc["id"],
                  'title' => $doc["title"],
                  'address' => $doc["address"],
                  'assignedCategory' => $doc["assignedCategory"]
              );
          }
      }
  }

    public function getLocationList()
    {
        $locationList = [];
        foreach ($this->locationCollection->documents() as $doc) {
            $locationList[$doc["title"]] =
                array(
                    'id' => $doc['id'],
                    'assignedCategory' => $doc["assignedCategory"],
                    'title' => $doc['title']
                );
        }
        return $locationList;
    }

  public function getLocationCategoryName($locationCategoryName)
  {
    $returnString = '';
    if (strpos($locationCategoryName, 'Hartplatz') !== false) {
      $returnString .= 'Hartplätze';
    }
    if (strpos($locationCategoryName, 'Rasenplatz') !== false) {
      $returnString .= 'Rasenplätze';
    }
    if (strpos($locationCategoryName, 'Kunstrasen') !== false) {
      $returnString .= 'Kunstrasenplätze';
    }
    if (strpos($locationCategoryName, 'Halle') !== false) {
      $returnString .= 'Hallen';
    }
    return $returnString;
  }


  public function generateAddressArray($addressArray)
  {
    // format 5 Kunstrasenplatz, Hoof, Kunstrasen, Zum Sportheim, 66606 St. Wendel
    // oder   4 Rasenplatz, Weiersbach Rasenplatz, Auf dem Langenfeld, 55768 Hoppstädten-Weiersbach
    // oder   6 Rasenplatz, Ottweiler, Rasen, Im Alten Weiher, Im Alten Weiher, 66564 Ottweiler
    // oder   6 Kunstrasenplatz, Wiesbach, ProWin Stadion, Kunstrasen, Landstuhlstr., 66571 Eppelborn
    $zip = '';
    $county = '';
    $street = '';

    $city = trim($addressArray[1]);
    if (count($addressArray) === 6) {
      $street = trim($addressArray[4]);
      $county = substr(trim($addressArray[5]), 6);
      $zip = substr(trim($addressArray[5]), 0, 5);
    } elseif (count($addressArray) === 5) {
      $street = trim($addressArray[3]);
      $county = substr(trim($addressArray[4]), 6);
      $zip = substr(trim($addressArray[4]), 0, 5);
    } elseif (count($addressArray) === 4) {
      $city = explode(' ', trim($addressArray[1]))[0];
      $street = trim($addressArray[2]);
      $county = substr(trim($addressArray[3]), 6);
      $zip = substr(trim($addressArray[3]), 0, 5);
    }

    $streetName = $street;
    $houseNumber = '';

    if (preg_match('/^([^\d]*[^\d\s]) *(\d.*)$/', $street, $result)) {
      $streetName = $result[1];
      $houseNumber = $result[2];
    }

    if (substr($streetName, -4) === 'str.') {
      $streetName = str_replace("str.", "straße", $streetName);
    }
    return $address = array(
      'streetName' => $streetName,
      'houseNumber' => $houseNumber,
      'zip' => $zip,
      'city' => $city,
      'county' => $county
    );
  }

}
