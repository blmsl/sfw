<?php

trait sfwCategoryType
{
  /**
   * @var $categoryTypeCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $categoryTypeCollection = null;
  private $categoryTypes = array();

  /* public function saveCategoryType($link)
  {
    return $this->saveFireStoreObject($this->categoryTypeCollection, array("link" => $link), null);
  } */

  public function getCategoryTypes()
  {
    foreach ($this->categoryTypeCollection->documents() as $doc) {
      $this->categoryTypes[$doc["link"]] = array(
        "id" => $doc["id"]
      );
    }
    /* if (count($this->categoryTypes) === 0) {
      $this->setDefaultCategoryTypes(array(
        "team.types",
        "team.position.types",
        "location.types",
        "club.position.types"
      ));
    } */
    return $this->categoryTypes;
  }

  /* public function setDefaultCategoryTypes($defaultCategoryTypes)
  {
    foreach ($defaultCategoryTypes AS $defaultCategoryType) {
      $currentCategoryType = $this->saveCategoryType($defaultCategoryType);
      $this->categoryTypes[$currentCategoryType['link']] = $currentCategoryType;
    }
  } */

}
