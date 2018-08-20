<?php

#setlocale(LC_TIME, "de_DE"); //only necessary if the locale isn't already set
define("SFW_DATE_FORMAT", "d.m.Y H:i");
define("TK_PRINT_ENABLED", false); # enables the tk_print's | use while debugging

/**
 * Returns the global variable "tk_count_printed"
 * @return array|mixed
 */
function &tk_init() {
    if (is_null(@$GLOBALS['tk_count_printed'])) $GLOBALS['tk_count_printed'] = array();
    return $GLOBALS['tk_count_printed'];
}

/**
 * Dump outs the given $object pretty and registers their print-counts.
 * @param $title
 * @param $object
 */
function tk_print($title, $object) {
    if(!TK_PRINT_ENABLED) return;

    $tk_count_printed = &tk_init();
    if (is_null(@$tk_count_printed[$title])) $tk_count_printed[$title] = 0;

    echo $tk_count_printed[$title];
    echo " - <b>$title: </b>";
    var_dump($object);
    echo "<br/>";
    $tk_count_printed[$title] = $tk_count_printed[$title] + 1;
}

/**
 * Prints how many times a tk_print is called for each given $title
 */
function tk_print_counts() {
    if(!TK_PRINT_ENABLED) return;

    echo "<h3>Counts</h3>";
    var_dump(@$GLOBALS['tk_count_printed']);
}

/**
 * Notizen:
 * "if ($i > 0) {" wurde ersetzt mit "if ($i >= 0) {" weil der erste Wert/Row nicht angezeigt wird (vom alten Code)
 *
 */
