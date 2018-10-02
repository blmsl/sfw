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
      ->where('publication.status', '=', 2);
      //->where('publication.dateTime', '>=', $startDate->format('D M d Y H:i'))
      //->where('publication.dateTime', '<=', $endDate->format('D M d Y H:i'));

    $snapshot = $query->documents();

    if ($snapshot->isEmpty()) {
      echo "<div class='alert alert-info'><p>Keine Artikel zum Veröffentlichen gefunden.</p></div>";
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

  public function generateArticleRow($i, $article)
  {
    #$zapierToFacebook = false;
    $returnString = '';
    $returnString .= "<tr>" . PHP_EOL;
    $returnString .= "<td>" . $i . "</td>" . PHP_EOL;
    $returnString .= "<td>" . $article["title"] . "</td>" . PHP_EOL;
    $returnString .= "<td>" . $this->getFrontendPublication($article) . "</td>" . PHP_EOL;
    $returnString .= "<td>" . $this->getFacebookPublication($article) . "</td>" . PHP_EOL;
    $returnString .= "<td>" . $this->getTwitterPublication($article) . "</td>" . PHP_EOL;
    $returnString .= "</tr>" . PHP_EOL;
    return $returnString;
  }

  public function getFrontendPublication()
  {
    $returnString = '';
    // $article = $article;
    $returnString .= "<p>ToDo</p>";
    #$returnString .= "<p class='text-success'>Erfolgreich veröffentlicht.</p>";
    return $returnString;
  }

  public function getFacebookPublication($article)
  {
    $returnString = '';
    if (key_exists('scheduled', $article["meta"]["facebook"]) && $article["meta"]["facebook"]["scheduled"] === true) {
      $description = $article["meta"]["twitter"]["description"] !== '' ? $article["meta"]["twitter"]["description"] : '';
      $description === '' && $article["excerpt"] === '' ? $description = $article["text"] : $description = $article["excerpt"];

      $url = 'https://hooks.zapier.com/hooks/catch/2930760/geqmr9/';

      $options = array(
        'http' => array(
          'header' => "Content-type: application/x-www-form-urlencoded\r\n",
          'method' => 'POST',
          'content' => json_encode(array(
            'article' => array(
              'title' => $article["title"],
              'description' => strip_tags($description),
              'link' => $article["postURL"] ? 'https://sfwinterbach.com/' . $article["postURL"] : 'https://sfwinterbach.com'
            )
          ))
        )
      );
      $context = stream_context_create($options);
      $result = json_decode(file_get_contents($url, false, $context));

      if ($result->status === 'success') {
        $returnString .= "<p class='text-success'>Erfolgreich über Zapier gesendet.</p>";
      } else {
        var_dump($result);
        $returnString .= "<p class='text-danger'>ERROR.</p>";
      }
    } else {
      $returnString .= "<p class='text-danger'>Keine Veröffentlichung geplant.</p>";
    }
    return $returnString;
  }

  public function getTwitterPublication($article)
  {
    $returnString = '';
    if (key_exists('scheduled', $article["meta"]["twitter"]) && $article["meta"]["twitter"]["scheduled"] === true) {

      # $title = $article["meta"]["twitter"]["title"] !== '' ? $article["meta"]["twitter"]["title"] : $article["title"];
      $description = $article["meta"]["twitter"]["description"] !== '' ? $article["meta"]["twitter"]["description"] : '';
      $description === '' && $article["excerpt"] === '' ? $description = $article["text"] : $description = $article["excerpt"];

      $params = array('status' => substr(strip_tags($description), 0, 280));
      /**
       * @var $twitter object
       */
      $twitter = $this->twitter;
      $reply = (array)$twitter->statuses_update($params);

      if ($reply["httpstatus"] === 200) {
        $createdAt = DateTime::createFromFormat('D M d H:i:s P Y', $reply["created_at"]);
        $returnString .= "<p class='text-success'>Auf Twitter veröffentlicht am " . $createdAt->format('d.m.Y H:i:s') . ": <a target='_blank' href='https://twitter.com/" . $this->twitterConfig["siteName"] . "/status/" . $reply["id"] . "'>Link</a></p>";
      } else {
        $returnString .= "<p class='text-danger'>" . $reply["errors"][0]->message . "</p>";
      }
    } else {
      $returnString .= "<p class='text-danger'>Keine Veröffentlichung geplant.</p>";
    }
    return $returnString;
  }

}
