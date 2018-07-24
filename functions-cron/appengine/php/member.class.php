<?php

trait sfwMember
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $memberCollection = null;
  private $members = array();

  public function getMembers()
  {
    if (count($this->members) === 0) {
      $dbMembers = $this->memberCollection;
      foreach ($dbMembers->documents() as $doc) {
        $this->members[$doc["mainData"]["firstName"] . '-' . $doc["mainData"]["lastName"] . '-' . $doc["mainData"]['birthday']] = $doc;
      }
    }
    return $this->members;
  }

  public function saveDriveMember($data)
  {
  }

  public function saveDFBMember($data){

  }

}
