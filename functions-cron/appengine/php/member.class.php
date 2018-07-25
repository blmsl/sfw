<?php

trait sfwMember
{
    /**
     * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
     */
    public $memberCollection = null;
    private $members = array();

    public function getMembers()
    {
        if (count($this->members) === 0) {
            $dbMembers = $this->memberCollection;
            foreach ($dbMembers->documents() as $doc) {
                $this->members[$doc["mainData"]["firstName"] . '-' . $doc["mainData"]["lastName"] . '-' . $doc["mainData"]['birthday']] = $doc;
            }
        }
        return $this->members;
    }

    public function generateDriveMemberTableHeader()
    {
        $returnString = '';
        $returnString .= '<table class="table table-striped table-bordered table-hover table-sm">';
        $returnString .= '<thead class="thead-light">';
        $returnString .= '<tr>';
        $returnString .= '<th>Anrede</th>';
        $returnString .= '<th>Name</th>';
        $returnString .= '<th>Vorname</th>';
        $returnString .= '<th>Straße</th>';
        $returnString .= '<th>Haus-Nr.</th>';
        $returnString .= '<th>PLZ</th>';
        $returnString .= '<th>Ort</th>';
        $returnString .= '<th>Titel</th>';
        $returnString .= '<th>Verein-Status</th>';
        $returnString .= '<th>Verein-Eintritt</th>';
        $returnString .= '<th>Verein-Austritt</th>';
        $returnString .= '<th>Verein-Beitrag</th>';
        $returnString .= '<th>AH-Status</th>';
        $returnString .= '<th>AH-Eintritt</th>';
        $returnString .= '<th>AH-Austritt</th>';
        $returnString .= '<th>AH-Beitrag</th>';
        $returnString .= '<th>Festnetz</th>';
        $returnString .= '<th>Handy</th>';
        $returnString .= '<th>E-Mail</th>';
        $returnString .= '<th>Geburtsdatum</th>';
        $returnString .= '<th>Funktionär</th>';
        $returnString .= '<th>Bemerkung</th>';
        $returnString .= '<th>bereits <br />vorhanden?</th>';
        $returnString .= '</tr>';
        $returnString .= '</thead>';
        $returnString .= '<tbody>';
        return $returnString;
    }

    public function generateDFBMemberTableHeader()
    {
        $returnString = '';
        $returnString .= '<table class="table table-striped table-bordered table-hover table-sm">';
        $returnString .= '<thead class="thead-light">';
        $returnString .= '<tr>';
        $returnString .= '<th>Passnr.</th>';
        $returnString .= '<th>Name</th>';
        $returnString .= '<th>Vorname</th>';
        $returnString .= '<th>Altersklasse</th>';
        $returnString .= '<th>Geburtsdatum</th>';
        $returnString .= '<th>Spielrecht Pflicht / Verband</th>';
        $returnString .= '<th>Spielrecht Freundschaft / Privat</th>';
        $returnString .= '<th>Abmeldung</th>';
        $returnString .= '<th>Spielerstatus</th>';
        $returnString .= '<th>Gast/Zweitspielrecht</th>';
        $returnString .= '<th>Spielzeit</th>';
        $returnString .= '<th>Spielart</th>';
        $returnString .= '<th>Passdruck</th>';
        $returnString .= '<th>Einsetzbar</th>';
        $returnString .= '<th>Stammverein</th>';
        $returnString .= '<th>bereits <br />vorhanden?</th>';
        $returnString .= '</tr>';
        $returnString .= '</thead>';
        $returnString .= '<tbody>';
        return $returnString;
    }

    public function generateDFBMemberRow($member, $saveStatus)
    {
        $returnString = '';
        $returnString .= '<tr>';
        $returnString .= '<td>' . $member[0] . '</td>';
        $returnString .= '<td>' . $member[1] . '</td>';
        $returnString .= '<td>' . $member[2] . '</td>';
        $returnString .= '<td>' . $member[3] . '</td>';
        $returnString .= '<td>' . $this->getGermanDate($member[4]) . '</td>';
        $returnString .= '<td>' . $this->getGermanDate($member[5]) . '</td>';
        $returnString .= '<td>' . $this->getGermanDate($member[6]) . '</td>';
        $returnString .= '<td>' . $member[7] . '</td>';
        $returnString .= '<td>' . $member[8] . '</td>';
        $returnString .= '<td>' . $this->getGermanDate($member[9]) . '</td>';
        $returnString .= '<td>' . $member[10] . '</td>';
        $returnString .= '<td>' . $member[11] . '</td>';
        $returnString .= '<td>' . $this->getGermanDate($member[12]) . '</td>';
        $returnString .= '<td>' . $member[13] . '</td>';
        $returnString .= '<td>' . $member[14] . '</td>';
        $returnString .= '<td>';
        $returnString .= $this->generateExistingFlag($saveStatus["newEntry"]);
        $returnString .= '</td>';
        $returnString .= '</tr>';
        return $returnString;
    }

    public function generateDriveMemberRow($member, $existing = false)
    {
        $returnString = '';
        $returnString .= '<tr>';
        $returnString .= '<td>' . $member[0] . '</td>';
        $returnString .= '<td>' . $member[1] . '</td>';
        $returnString .= '<td>' . $member[2] . '</td>';
        $returnString .= '<td>' . $member[3] . '</td>';
        $returnString .= '<td>' . $member[4] . '</td>';
        $returnString .= '<td>' . $member[5] . '</td>';
        $returnString .= '<td>' . $member[6] . '</td>';
        $returnString .= '<td>' . $member[7] . '</td>';
        $returnString .= '<td>' . $member[8] . '</td>';
        $returnString .= '<td>' . $member[9] . '</td>';
        $returnString .= '<td>' . $member[10] . '</td>';
        $returnString .= '<td>' . $member[11] . '</td>';
        $returnString .= '<td>' . $member[12] . '</td>';
        $returnString .= '<td>' . $member[13] . '</td>';
        $returnString .= '<td>' . $member[14] . '</td>';
        $returnString .= '<td>' . $member[15] . '</td>';
        $returnString .= '<td>' . $member[16] . '</td>';
        $returnString .= '<td>' . $member[17] . '</td>';
        $returnString .= '<td>' . $member[18] . '</td>';
        $returnString .= '<td>' . $member[19] . '</td>';
        if (count($member) > 19) {
            $returnString .= '<td>' . $member[20] . '</td>';
        } else {
            $returnString .= '<td>&nbsp;</td>';
        }
        $returnString .= '<td>';
        if ($existing) {
            $returnString .= '<span style="color: green">&#10004;</span>';
        } else {
            $returnString .= '<span style="color: red">-</span>';
        }
        $returnString .= '</td>';
        $returnString .= '</tr>';
        return $returnString;
    }

    public function generateExistingFlag($existing)
    {
        if ($existing) {
            return '<span style="color: green">&#10004;</span>';
        }
        return '<span style="color: red">-</span>';
    }

    public function getGermanDate($date)
    {
        $date = DateTime::createFromFormat('d.m.Y', $date);
        if ($date)
            return $date->format('d.m.Y');
        return false;
    }

    public function generateMemberTableFooter()
    {
        $returnString = '';
        $returnString .= '</tbody>';
        $returnString .= '</table>';
        return $returnString;
    }

    public function saveDriveMember($member, $club)
    {
        $birthday = DateTime::createFromFormat('d.m.Y', $member[19]);

        if ($birthday) {
            $club ? true : false;
            // $id = $member[1] . "-" . $member[2] . "-" . $birthday->format('Y-m-d');

            /*if (key_exists($id, $this->members)) {
                echo "Spieler vorhanden <br />";
            } else {
                echo "Spieler erstellen " . $id . "<br />";
            }*/
        }

        /* $data = array(
            "id" => $id,
            "driveImport" => true,
            "clubData" => array(
                "assignedClub" => $club["id"],
                "status" => $member[8],
                "joined" => $member[9],
                "left" => $member[10],
                "payment" => $member[11],
                "positionsInClub" => $member[20] ? $member[20] : '',
            ),
            "mainData" => array(
                "gender" => $member[0] === 'Frau' ? 'female' : 'male',
                "firstName" => $member[2],
                "lastName" => $member[1],
                "title" => $member[7],
                "birthday" => $birthday->format('Y-m-d')
            ),
            "address" => array(
                "streetName" => $member[3],
                "houseNumber" => $member[4],
                "zip" => $member[5],
                "city" => $member[6],
            ),
            "ahData" => array(
                "status" => $member[12],
                "joined" => $member[13],
                "left" => $member[14],
                "payment" => $member[15],
            ),
            "contact" => array(
                "phoneHome" => $member[16],
                "phoneMobile" => $member[17],
                "email" => $member[18]
            ),
        ); */
    }

    public function saveDFBMember($member, $club, $memberList)
    {
        $birthday = DateTime::createFromFormat('d.m.Y', $member[4]);
        $official = DateTime::createFromFormat('d.m.Y', $member[5]) ? DateTime::createFromFormat('d.m.Y', $member[5])->format('Y-m-d') : '';
        $friendly = DateTime::createFromFormat('d.m.Y', $member[6]) ? DateTime::createFromFormat('d.m.Y', $member[6])->format('Y-m-d') : '';
        $guestRight = DateTime::createFromFormat('d.m.Y', $member[9]) ? DateTime::createFromFormat('d.m.Y', $member[9])->format('Y-m-d') : '';
        $passPrint = DateTime::createFromFormat('d.m.Y', $member[12]) ? DateTime::createFromFormat('d.m.Y', $member[12])->format('Y-m-d') : '';
        $signOut = DateTime::createFromFormat('d.m.Y', $member[7]);

        $id = $member[1] . "-" . $member[2] . "-" . $birthday->format('Y-m-d');

        $data = array(
            "id" => $id,
            "gender" => strpos($member[3], 'innen') > -1 ? 'female' : 'male',
            "dfbImport" => true,
            "clubData" => array(
                "assignedClub" => $club["id"]
            ),
            "mainData" => array(
                "firstName" => $member[2],
                "lastName" => $member[1],
                "birthday" => $birthday->format('Y-m-d')
            ),
            "dfbData" => array(
                "passNumber" => $member[0],
                "ageGroup" => $member[3],
                "eligibleForOfficialMatches" => $official,
                "eligibleForFriendlyMatches" => $friendly,
                "signOut" => $signOut,
                "playerStatus" => $member[8],
                "guestPlayer" => array(
                    "guestRight" => $guestRight,
                    "season" => $member[10],
                    "type" => $member[11],
                ),
                "passPrint" => $passPrint,
                "allowedToPlay" => $member[13]
            )
        );

        if (!key_exists($id, $memberList)) {
            return array(
                'id' => $id,
                'data' => $this->saveFireStoreObject($this->memberCollection, $data),
                'newEntry' => true
            );
        } else {
            return array(
                'id' => $id,
                'data' => $data,
                'newEntry' => false
            );
        }

    }

}
