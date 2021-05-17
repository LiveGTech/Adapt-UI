import * as $g from "../../src/adaptui.js";

window.$g = $g;

$g.waitForLoad().then(function() {
    $g.sel("#inputSlider").on("change", function() {
        $g.sel("#progress").setValue(String($g.sel("#inputSlider").getValue() / 100));
    });

    $g.sel("#navigateForwardButton").on("click", function() {
        $g.sel("#otherPage").screenForward();
    });

    $g.sel("#openDialogButton").on("click", function() {
        $g.sel("#dialog").dialogOpen();
    });

    $g.sel("#checkboxIndeterminate").setValue("indeterminate");
});