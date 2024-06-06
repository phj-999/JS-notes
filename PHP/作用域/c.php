<?php
  $c = 'hahaha';
  $a = 35;

  function test(){
    global $c, $a;
    $a = 0;
    $c = "zero";
    $GLOBALS['c']='trtrt';
    $GLOBALS['a']= '11111111';
    echo $GLOBALS['c'].'---'.$GLOBALS['a'];

  }
  test();
  echo $a;
  echo $c;
  print($_SERVER['SERVER_ADDR']);
?>