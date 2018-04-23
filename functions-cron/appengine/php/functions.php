<?php

function scrap_info($scrap_url) {

    global $output;

    $html = file_get_html($scrap_url);

    if ($html && is_object($html) && isset($html->nodes)) {

        $items = $html->find("#team-fixture-league-tables tr");

// loop through items on current page
        foreach ($items as $item) {

            $output_item = array();

            $counter = 0;
            $tds = $item->find("td");
            foreach ($tds as $td) {
                if ($counter > 0) {
                    $output_item[] = trim($td->plaintext);
                }
                $counter++;
            }

            if (!empty($output_item)) {
                $output[] = $output_item;
            }
        }

        $html->clear();
    }
}

function get_value($element, $selector_string, $index, $type = "text") {
    $value = "";
    $cont = $element->find($selector_string, $index);
    if ($cont) {
        if ($type == "href") {
            $value = $cont->href;
        } elseif ($type == "src") {
            $value = $cont->src;
        } elseif ($type == "text") {
            $value = trim($cont->plaintext);
        } elseif ($type == "content") {
            $value = trim($cont->content);
        } elseif ($type == "outertext") {
            $value = trim($cont->outertext);
        } else {
            $value = $cont->innertext;
        }
    }

    return trim($value);
}