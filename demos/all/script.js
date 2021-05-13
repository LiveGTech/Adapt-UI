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

    $g.sel("#homeButton").on("click", function() {
        if (!$g.sel("#home").get().hasAttribute("hidden")) {
            return;
        }

        $g.sel("#home").switchFrom($g.sel("#about").get());

        $g.sel("#aboutButton").get().removeAttribute("selected");
        $g.sel("#homeButton").get().setAttribute("selected", "");
    });

    $g.sel("#aboutButton").on("click", function() {
        if (!$g.sel("#about").get().hasAttribute("hidden")) {
            return;
        }

        $g.sel("#about").switchFrom($g.sel("#home").get());

        $g.sel("#homeButton").get().removeAttribute("selected");
        $g.sel("#aboutButton").get().setAttribute("selected", "");
    });

    $g.sel("#checkboxIndeterminate").setValue("indeterminate");
});