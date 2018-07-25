<?php

trait sfwDrive
{
    private $driveFile;

    public function getDriveFile($queryString)
    {
        return $this->driveFile = $this->driveService->files->listFiles(array(
            'includeTeamDriveItems' => true,
            'supportsTeamDrives' => true,
            'q' => 'name="' . $queryString .'"'
        ));
    }

}