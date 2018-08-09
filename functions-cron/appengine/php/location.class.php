<?php


trait sfwLocation
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $locationCollection = null;
  private $locations = array();

  public function getLocations()
  {
    foreach ($this->locationCollection->documents() as $doc) {
      $this->locations[$doc["title"]] = array(
        'id' => $doc["id"],
        'assignedCategory' => $doc['assignedCategory'],
        'address' => array(
          'city' => $doc['address']['city'],
          'streetName' => $doc['address']['streetName'],
          'houseNumber' => $doc['address']['houseNumber'],
          'county' => $doc['address']['county'],
          'zip' => $doc['address']['zip']
        )
      );
    }
    return $this->locations;
  }

  /* public function getLocationsById()
  {
    $locationList = array();
    $dbLocations = $this->locationCollection;
    foreach ($dbLocations->documents() as $location) {
      $locationList[$location["id"]] = $location["title"];
    }
    return $locationList;
  }

  public function saveLocation($title, $address, $assignedCategory)
  {
    if (!key_exists($title, $this->getLocations())) {
      $this->locations[$title] = $this->saveFireStoreObject($this->locationCollection, array(
        'title' => $title,
        "isImported" => true,
        "address" => $address,
        'assignedCategory' => $assignedCategory["id"]
      ), null);
    }
    return $this->locations[$title];
  } */

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
