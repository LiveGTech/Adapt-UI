import * as $g from "../../src/adaptui.js";
import * as astronaut from "../../astronaut/astronaut.js";
import * as listViews from "../../astronaut/assemblies/listviews/listviews.js";

astronaut.unpack();

const LIGHT_MODE_STYLES = new astronaut.MediaQueryStyleSet("prefers-color-scheme: dark", {
    display: "none"
});

const DARK_MODE_STYLES = new astronaut.MediaQueryStyleSet("prefers-color-scheme: light", {
    display: "none"
});

var mainPage = Page(true) (
    Section (
        Heading() ("This is a test of Astronaut"),
        Heading(2) ("This is another heading"),
        Paragraph({styleSets: [LIGHT_MODE_STYLES]}) ("Viewing in light mode"),
        Paragraph({styleSets: [DARK_MODE_STYLES]}) ("Viewing in dark mode ", Badge() ("Certified dark")),
        Label (
            Text("Test input"),
            Input({placeholder: "Type something here..."}) ()
        ),
        Label (
            Text("Test selection input"),
            SelectionInput({
                value: "option2"
            }) (
                SelectionInputOption("option1") ("Some option"),
                SelectionInputOption("option2") ("Another option"),
                SelectionInputOption("option3") ("Yet another option")
            )
        )
    )
);

var otherPage = Page() (
    Section (
        Heading() ("This is another page"),
        SkeletonLoader("Dummy content") (
            Heading(2) (),
            astronaut.repeat(3, Paragraph() ()),
            Heading(3) (),
            Label (
                Text(),
                Input() ()
            )
        )
    )
);

var listViewData = {};
var listViewCounter = 1;

function addData() {
    var id = $g.core.generateKey();

    listViewData[id] = {
        name: Text(`Item ${listViewCounter++}`),
        id: CodeSnippet({
            styles: {
                "white-space": "nowrap"
            }
        }) (id),
        updated: Text("No")
    };
}

function pickRandomId() {
    var keys = Object.keys(listViewData);

    return keys[Math.round(Math.random() * (keys.length - 1))];
}

for (var i = 0; i < 10; i++) {
    addData();
}

var listView = listViews.ListView({
    mode: "truncate",
    items: listViewData,
    keyOrder: ["name", "id", "updated"]
}) (
    TableHeaderCell({
        mode: "resize",
        styles: {
            "width": "100%"
        }
    }) ("Name"),
    TableHeaderCell({mode: "resize"}) ("ID"),
    TableHeaderCell({mode: "resize"}) ("Updated?")
);

var addListViewItemButton = ListButton() ("Add item");
var updateListViewItemButton = ListButton() ("Update item");
var removeListViewItemButton = ListButton() ("Remove item");

addListViewItemButton.on("click", function() {
    addData();

    listView.inter.syncItems(listViewData);
});

updateListViewItemButton.on("click", function() {
    if (Object.keys(listViewData).length == 0) {
        return;
    }

    listViewData[pickRandomId()].name = Text(`Updated ${listViewCounter++}`);
    listViewData[pickRandomId()].updated = Text("Yes");

    listView.inter.syncItems(listViewData);
});

removeListViewItemButton.on("click", function() {
    if (Object.keys(listViewData).length == 0) {
        return;
    }

    delete listViewData[pickRandomId()];

    listView.inter.syncItems(listViewData);
});

var listViewDemoPage = Page() (
    Section() (
        Heading() ("List view demo"),
        listView,
        LineBreak() (),
        Container (
            addListViewItemButton,
            updateListViewItemButton,
            removeListViewItemButton
        )
    )
);

astronaut.render(
    Screen(true) (
        Header (
            HeaderPageMenuButton() (),
            Text("Astronaut test"),
            HeaderActionButton("star", "Example action") ()
        ),
        PageMenu (
            PageMenuButton({page: mainPage}) ("Main page"),
            PageMenuButton({page: otherPage}) ("Other page"),
            Separator() (),
            PageMenuButton({page: listViewDemoPage}) ("List view demo")
        ),
        mainPage,
        otherPage,
        listViewDemoPage
    )
);