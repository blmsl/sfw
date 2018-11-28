<?php

trait sfwCategoryType
{
    /**
     * @var $categoryTypeCollection \Google\Cloud\Firestore\CollectionReference
     */
    public $categoryTypeCollection = null;
    private $categoryTypes = array();

    /**
     * @param $link string
     * @param $batch \Google\Cloud\Firestore\WriteBatch
     * @return array
     */
    public function getCategoryTypeByLink($link, $batch)
    {
        $query = $this->categoryTypeCollection->where('link', '=', $link);
        $snapshot = $query->documents();

        if ($snapshot->isEmpty()) {
            return $this->saveFireStoreObject($this->categoryTypeCollection, array('link' => $link), $batch);
        }

        if ($snapshot->size() === 1) {
            foreach ($snapshot as $doc) {
                return array(
                    'id' => $doc["id"],
                    'title' => $doc["link"]
                );
            }
        }
    }

}
