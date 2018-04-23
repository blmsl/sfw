<?php

#ini_set('display_errors', 1);
#ini_set('max_execution_time', 0);
#error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
# header("Content-Type: text/html; charset=utf-8");

require "../simple_html_dom.php";
require "../functions.php";
require '../../vendor/autoload.php';


use google\appengine\api\taskqueue\PushTask;
use google\appengine\api\taskqueue\PushQueue;
use Google\Cloud\Firestore\FirestoreClient;

# putenv('GOOGLE_APPLICATION_CREDENTIALS=SFW-Dev-f571e0042e97.json');

$urls = array(
    "123" => "http://www.fussball.de/mannschaft/sf-winterbach-sf-winterbach-saarland/-/saison/01VES1INK8000000VS548985VULO2RKO/team-id/01DIPRBFPS000000VV0AG811VTMPFBM2#!/"
);

foreach ($urls as $key => $url) {

    $task1 = new PushTask('/someUrl');

    $output = array();
    scrap_info($url);
    #echo "<pre>";
    #print_r($output);
    #echo "</pre>";
    // ToDo: Sent this outputted array to firestore->collection('match-results').document($key)
}

if(count($output) > 0){
    $db = new FirestoreClient();
    $collection = $db->collection('standings');
    foreach ($output as $value) {
        $collection->set([
            'place' => $value[0],
            'team' => $value[1],
            'games' => $value[2],
            'g' => $value[3],
            'u' => $value[4],
            'v' => $value[5],
            'goal_ratio' => $value[6],
            'goal_difference' => $value[7],
            'points' => $value[8]
        ]);
    }
}

printf('Store data to the standings collection.' . PHP_EOL);



/*
$sendgridSender = getenv('SENDGRID_SENDER');
$sendgridApiKey = getenv('SENDGRID_API_KEY');
$sendgridRecipient = getenv('ADMIN_MAIL');

$sender = new SendGrid\Email(null, $sendgridSender);
$recipient = new SendGrid\Email(null, $sendgridRecipient);
$subject = 'This is a test email';
$body = new SendGrid\Content('text/plain', 'Example text body.');
$mail = new SendGrid\Mail($sender, $subject, $recipient, $body);
$sendgrid = new SendGrid($sendgridApiKey);
$response = $sendgrid->client->mail()->send()->post($mail);
var_dump($response);
if ($response->statusCode() < 200 || $response->statusCode() >= 300) {
    echo "Mail sent";
    // new Response($response->body(), $response->statusCode());
} else {
    echo "Not sent";
} */