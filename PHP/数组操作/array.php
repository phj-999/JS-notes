<?php
 $a = [
    'm'=>'ceshi',
    'n' => 'haha'
 ];
 $b = [
    'm'=> 'ceshi2',
    'o'=>'hahaha2',
    'p'=>'fddsf',
    'q'=> [
        'cs'=>"erweiceshi"
    ]
    ];

    $c = [
        "m"=> "ceshi3",
        "cc"=> 123
    ];

    $d = $a+ $b + $c;
    // print_r($d);
//     Array
// (
//     [m] => ceshi
//     [n] => haha
//     [o] => hahaha2
//     [p] => fddsf
//     [q] => Array
//         (
//             [cs] => erweiceshi
//         )

//     [cc] => 123
// )

    $e = array_merge($a, $b, $c);
    print_r($e);

//     Array
// (
//     [m] => ceshi3
//     [n] => haha
//     [o] => hahaha2
//     [p] => fddsf
//     [q] => Array
//         (
//             [cs] => erweiceshi
//         )

//     [cc] => 123
// )

$F = [1,2,3];  
$G=[1,2,"3"];
var_dump($F==$G); //true
var_dump($F === $G); //false   

?>