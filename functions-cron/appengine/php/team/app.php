<?php


use google\appengine\api\taskqueue\PushTask;
use google\appengine\api\taskqueue\PushQueue;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

$app = new Application();


$app->get('/', function () use ($app) {

    $urls = array(
        "123" => "http://www.fussball.de/mannschaft/sf-winterbach-sf-winterbach-saarland/-/saison/01VES1INK8000000VS548985VULO2RKO/team-id/01DIPRBFPS000000VV0AG811VTMPFBM2#!/"
    );

    $taskList = array();
    $queue = new PushQueue();

    foreach ($urls as $key => $url) {
        $taskList[] = new PushTask('/team/standings', ['url' => $url]);
    }

    $queue->addTasks($taskList);
});

$app->post('/team/standings', function (Request $req) use ($app) {
    return 'url: ' . $req->get('url');
});

return $app;
