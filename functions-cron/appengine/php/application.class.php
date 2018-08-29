<?php


trait sfwApplication
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $applicationCollection = null;
  private $applications = array();

  /**
   * @return array
   */
  public function getCurrentApplication()
  {
    $query = $this->applicationCollection->where('isCurrentApplication', '=', 1);

    $snapshot = $query->documents();

    if ($snapshot->isEmpty()) {
      echo "<div class='alert alert-info'><p>Keine aktuelle Applikationg gefunden.</p></div>";
    }

    #echo $snapshot->size();

    // return first season with that title
    if ($snapshot->size() > 0) {
      foreach ($snapshot as $doc) {
        $this->applications[] = array(
          'id' => $doc["id"],
          'page' => $doc["page"],
          'assignedCalendars' => $doc["assignedCalendars"]
        );
      }
    }
    return $this->applications;
  }

}
