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
      ->where('publication.status', '=', 2)
      ->where('publication.dateTime', '>=', $startDate->format('D M d Y H:i:s'))
      ->where('publication.dateTime', '<=', $endDate->format('D M d Y H:i:s'));

    $snapshot = $query->documents();

    if ($snapshot->isEmpty()) {
      echo "Keine Artikel zum Veröffentlichen gefunden";
    }

    #echo $snapshot->size();

    // return first season with that title
    if ($snapshot->size() > 0) {
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

  public function generateArticleTable()
  {

    $returnString = '';
    $returnString .= '<table class="table table-striped table-bordered table-hover table-sm">' . PHP_EOL;
    $returnString .= '<thead class="thead-light">' . PHP_EOL;
    $returnString .= '<tr>' . PHP_EOL;
    $returnString .= '<th>Nr.</th>' . PHP_EOL;
    $returnString .= '<th>Titel</th>' . PHP_EOL;
    $returnString .= '<th>Frontend</th>' . PHP_EOL;
    $returnString .= '<th>Facebook</th>' . PHP_EOL;
    $returnString .= '<th>Twitter</th>' . PHP_EOL;
    $returnString .= '</tr>' . PHP_EOL;
    $returnString .= '</thead>' . PHP_EOL;
    $returnString .= '<tbody>' . PHP_EOL;
    return $returnString;
  }

  public function generateArticleFooter()
  {
    $returnString = '';
    $returnString .= '</tbody>' . PHP_EOL;
    $returnString .= '</table>' . PHP_EOL;
    return $returnString;
  }

  public function generateArticleRow($article)
  {

    $returnString = '';
    $returnString .= "<tr>" . PHP_EOL;
    $returnString .= "<td>" . $article["title"] . "</td>" . PHP_EOL;
    $returnString .= "<td>ToDo</td>";
    $returnString .= "<td>ToDo</td>";

    #if(key_exists('scheduled', $article["meta"]["facebook"]) && $article["meta"]["facebook"]["scheduled"] === true){
    #echo "<li>Publishing to facebook</li>";
    #}

    $returnString .= "<td>" . $this->getTwitterPublication($article) . "</td>" . PHP_EOL;
    $returnString .= "</tr>" . PHP_EOL;
    return $returnString;
  }

  public function getTwitterPublication($article)
  {
    $returnString = '';
    if (key_exists('scheduled', $article["meta"]["twitter"]) && $article["meta"]["twitter"]["scheduled"] === true) {

      # $title = $article["meta"]["twitter"]["title"] !== '' ? $article["meta"]["twitter"]["title"] : $article["title"];
      $description = $article["meta"]["twitter"]["description"] !== '' ? $article["meta"]["twitter"]["description"] : '';
      $description === '' && $article["excerpt"] === '' ? $description = $article["text"] : $description = $article["excerpt"];

      $params = array('status' => substr($description, 0, 280));
      /**
       * @var $twitter object
       */
      $reply = (array)$twitter->statuses_update($params);

      if ($reply["httpstatus"] === 200) {
        $createdAt = DateTime::createFromFormat('D M d H:i:s P Y', $reply["created_at"]);
        $returnString .= "Auf Twitter veröffentlicht am " . $createdAt->format('d.m.Y H:i:s') . ": <a target='_blank' href='https://twitter.com/" . $this->twitterConfig["siteName"] . "/status/" . $reply["id"] . "'>Link</a>";
      } else {
        var_dump($reply);
        $returnString .= "<div class='alert alert-danger'><p>" . $reply["errors"][0]["message"] . "</p></div>";
      }
    }
    return $returnString;
  }

}
