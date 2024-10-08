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

var openEphemeralScreenButton = ListButton() ("Open ephemeral screen");
var openEphemeralDialogButton = ListButton() ("Open ephemeral dialog");
var openEphemeralMenuButton = ListButton() ("Open ephemeral menu");

var ephemeralScreenCounter = 1;
var ephemeralDialogCounter = 1;
var ephemeralMenuCounter = 1;

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
        ),
        LineBreak() (),
        Container (
            openEphemeralScreenButton,
            openEphemeralDialogButton,
            openEphemeralMenuButton
        )
    )
);

openEphemeralScreenButton.on("click", function() {
    astronaut.addEphemeral(Screen (
        Header (
            IconButton({icon: "back", alt: "Back", bind: "back"}) (),
            Text("Ephemeral screen")
        ),
        Page(true) (
            Section (
                Heading() ("This is ephemeral screen #" + (ephemeralScreenCounter++)),
                Paragraph() ("It was generated on-the-fly and will be removed from the DOM when exited.")
            )
        )
    )).then((dialog) => dialog.screenForward());
});

openEphemeralDialogButton.on("click", function() {
    astronaut.addEphemeral(Dialog (
        DialogContent (
            Heading() ("This is ephemeral dialog #" + (ephemeralDialogCounter++)),
            Paragraph() ("It was generated on-the-fly and will be removed from the DOM when closed.")
        ),
        ButtonRow({mode: "end"}) (
            Button({bind: "close"}) ("Close")
        )
    )).then((dialog) => dialog.dialogOpen());
});

openEphemeralMenuButton.on("click", function() {
    astronaut.addEphemeral(Menu (
        MenuButton() ("Ephemeral menu #" + (ephemeralMenuCounter++)),
        MenuButton() ("Generated on-the-fly"),
        MenuButton() ("Removed from DOM on close"),
    )).then((dialog) => dialog.menuOpen());
});

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

function addData(icon = null) {
    var id = $g.core.generateKey();

    listViewData[id] = {
        name: Text(`Item ${listViewCounter++}`),
        id: CodeSnippet({
            styles: {
                "white-space": "nowrap"
            }
        }) (id),
        updated: Text("No"),
        icon
    };
}

function pickRandomId() {
    var keys = Object.keys(listViewData);

    return keys[Math.round(Math.random() * (keys.length - 1))];
}

for (var i = 0; i < 10; i++) {
    addData(i == 4 ? Icon("star", "dark embedded") () : null);
}

var listView = listViews.ListView({
    mode: "truncate",
    items: listViewData,
    keyOrder: ["name", "id", "updated"],
    imageKey: "icon"
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
    Section({mode: "wide"}) (
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