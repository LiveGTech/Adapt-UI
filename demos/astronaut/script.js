import * as astronaut from "../../astronaut/astronaut.js";

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

astronaut.render(
    Screen(true) (
        Header (
            HeaderPageMenuButton() (),
            Text("Astronaut test"),
            HeaderActionButton("star", "Example action") ()
        ),
        PageMenu (
            PageMenuButton({page: mainPage}) ("Main page"),
            PageMenuButton({page: otherPage}) ("Other page")
        ),
        mainPage,
        otherPage
    )
);