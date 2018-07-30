<?php

trait sfwCategoryType
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $categoryTypeCollection = null;
  private $categoryTypes = array();

  public function saveCategoryType($link)
  {
    return $this->saveFireStoreObject($this->categoryTypeCollection, array("link" => $link), null);
  }

  public function getCategoryTypes()
  {
    $dbCategoryTypes = $this->categoryTypeCollection;
    foreach ($dbCategoryTypes->documents() as $doc) {
      $this->categoryTypes[$doc["link"]] = $doc;
    }
    if (count($this->categoryTypes) === 0) {
      $this->setDefaultCategoryTypes(array(
        "team.types",
        "location.types"
      ));
    }
    return $this->categoryTypes;
  }

  public function setDefaultCategoryTypes($defaultCategoryTypes)
  {
    foreach ($defaultCategoryTypes AS $defaultCategoryType) {
      $currentCategoryType = $this->saveCategoryType($defaultCategoryType);
      $this->categoryTypes[$currentCategoryType['link']] = $currentCategoryType;
    }
  }

}
