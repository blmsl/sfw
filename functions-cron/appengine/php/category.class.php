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
    foreach ($this->categoryCollection->documents() as $doc) {
      $this->categories[$doc["title"]] = array(
        'assignedCategoryType' => $doc["assignedCategoryType"],
        'id' => $doc['id']
      );
    }
    return $this->categories;
  }

  /*
  public function saveCategory($title, $assignedCategoryType)
  {
    if (!key_exists($title . '-' . $assignedCategoryType, $this->getCategories())) {
      $this->categories[$title . '-' . $assignedCategoryType] = $this->saveFireStoreObject($this->categoryCollection, array(
        'title' => $title,
        'assignedCategoryType' => $assignedCategoryType
      ), null);
    }
    return $this->categories[$title . '-' . $assignedCategoryType];
  } */

}
