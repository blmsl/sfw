<?php


trait sfwArticle
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $articleCollection = null;
  private $articles = array();

  /**
   * @param $startDate DateTime
   * @param $endDate DateTime
   * @return array
   */
  public function getArticlesByPublishDate($startDate, $endDate)
  {
    $query = $this->articleCollection
      ->orderBy('publication.dateTime')
      ->where('publication.dateTime', '>=', $startDate->format('D M d Y H:i:s'))
      ->where('publication.dateTime', '<=', $endDate->format('D M d Y H:i:s'));

    $snapshot = $query->documents();

    if ($snapshot->isEmpty()) {
      echo "Keine Artikel zum Veröffentlichen gefunden";
    }

    #echo $snapshot->size();

    // return first season with that title
    if($snapshot->size() > 0) {
      foreach ($snapshot as $doc) {
        $this->articles[] = array(
          'id' => $doc["id"],
          'title' => $doc["title"],
          'meta' => $doc["meta"],
          'subTitle' => $doc["subTitle"],
          'postURL' => $doc["postURL"],
          'text' => $doc["text"],
          'excerpt' => $doc["excerpt"],
          'assignedTags' => $doc["assignedTags"],
          'publication' => $doc["publication"]
        );
      }
    }
    return $this->articles;
  }

}
