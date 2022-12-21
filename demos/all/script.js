import * as $g from "../../src/adaptui.js";
import * as templates from "../../src/templates.js";

window.$g = $g;

$g.waitForLoad().then(function() {
    templates.apply();

    $g.sel(".openActionMenu").on("click", function() {
        $g.sel("#actionMenu").menuOpen();
    });

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

    $g.sel("#dismissable > *").on("dismiss", function(event) {
        $g.sel(event.target).collapse().then(function() {
            $g.sel(event.target).remove();
        });
    });
});