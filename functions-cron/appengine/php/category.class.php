<?php

trait sfwCategory
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $categoryCollection = null;
  private $categories = array();

  public function getCategories()
  {
    if (count($this->categories) === 0) {
      $dbCategories = $this->categoryCollection;
      foreach ($dbCategories->documents() as $doc) {
        $this->categories[$doc["title"] . '-' . $doc["assignedCategoryType"]] = $doc;
      }
    }
    return $this->categories;
  }

  public function saveCategory($title, $assignedCategoryType)
  {
    if (!key_exists($title . '-' . $assignedCategoryType, $this->getCategories())) {
      $this->categories[$title . '-' . $assignedCategoryType] = $this->saveFireStoreObject($this->categoryCollection, array(
        'title' => $title,
        'assignedCategoryType' => $assignedCategoryType
      ), null);
    }
    return $this->categories[$title . '-' . $assignedCategoryType];
  }

}
