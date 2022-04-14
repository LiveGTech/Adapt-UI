import * as astronaut from "../../astronaut/astronaut.js";

astronaut.unpack();

var mainPage = Page(true) (
    Section (
        Heading() ("This is a test of Astronaut"),
        Heading(2) ("This is another heading"),
        Label (
            Text("Test input"),
            Input({placeholder: "Type something here..."}) ()
        )
    )
);

var otherPage = Page() (
    Section (
        Heading() ("This is another page")
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