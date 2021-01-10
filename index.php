<?php
error_reporting(0);
$url =$_GET['q'];
$id = end(explode('/', $url));
$api =file_get_contents("https://wapi.voot.com/ws/ott/getMediaInfo.json?platform=Web&pId=2&mediaId=$id");
$apis =json_decode($api);
$entryID=$apis->assets->EntryId;
$MediaID=$apis->assets->MediaID;
$title =$apis->assets->MediaName;
$des =$apis->assets->Metas[1]->Value;
$url =$apis->assets->Files[3]->URL;
if($url ==""){
$status ="invalid error";
}
else{
$status="ok";
}
$apii = array("mediaID" => $MediaID, "title" => $title, "description" => $des, "video_url" => $url);
$api =json_encode($apii);
header("Content-Type: application/json");
echo $api;