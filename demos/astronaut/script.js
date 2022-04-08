import * as astronaut from "../../astronaut/astronaut.js";

astronaut.unpack();

astronaut.render(
    Screen(true) (
        Section (
            Heading() ("This is a test of Astronaut"),
            Heading(2) ("This is another heading"),
            Label (
                Text("Test input"),
                Input({placeholder: "Type something here..."}) ()
            )
        )
    )
);