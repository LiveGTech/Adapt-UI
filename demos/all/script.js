import * as $g from "../../src/adaptui.js";

window.$g = $g;

$g.waitForLoad().then(function() {
    $g.sel("#inputSlider").on("change", function() {
        console.log("hi");
        $g.sel("#progress").setValue(String($g.sel("#inputSlider").getValue() / 100));
    });

    $g.sel("#checkboxIndeterminate").setValue("indeterminate");
});

setTimeout(function() {
    $g.sel("dialog").dialogOpen();
}, 3000);

setTimeout(function() {
    $g.sel("dialog").dialogClose();
}, 6000);