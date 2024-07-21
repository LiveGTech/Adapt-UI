/*
    Adapt UI

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as astronaut from "../../astronaut.js";

var c = astronaut.components;

export var ListView = astronaut.component({name: "ListView", positionals: ["items", "keyOrder"]}, function(props, children, inter) {
    var selectAllCheckbox = c.CheckboxInput({
        mode: "secondary",
        attributes: {
            "title": props.strings?.["selectAll"] || "Select all",
            "aria-label": props.strings?.["selectAll"] || "Select all"
        }
    }) ();

    var tableMain = c.TableMain() ();

    var rows = {};

    function checkAllSelected() {
        var allSelected = true;

        Object.values(rows).forEach(function(row) {
            if (!row.find("input[type='checkbox']").getValue()) {
                allSelected = false;
            }
        });

        selectAllCheckbox.setValue(allSelected);
    }

    function getCells(item) {
        var checkbox = c.CheckboxInput({
            attributes: {
                "aria-label": props.strings?.["selectItem"] || "Select item"
            }
        }) ();

        checkbox.on("change", function() {
            checkAllSelected();
        });

        return [
            c.TableCell (
                checkbox,
            ),
            ...props.keyOrder.map((cellKey) => c.TableCell() (item[cellKey] || Text("")))
        ];
    }

    inter.setItem = function(key, data) {
        if (rows[key]) {
            var isSelected = inter.checkItemIsSelected(key);

            rows[key].clear().add(...getCells(data));

            inter.setItemSelection(key, isSelected);

            checkAllSelected();

            return;
        }

        rows[key] = c.TableRow() (
            ...getCells(data)
        );

        tableMain.add(rows[key]);

        inter.setItemSelection(key, selectAllCheckbox.getValue());

        checkAllSelected();
    };

    inter.removeItem = function(key) {
        if (!rows[key]) {
            return;
        }

        rows[key].remove();

        delete rows[key];
    };

    inter.syncItems = function(data) {
        var usedKeys = [];

        Object.keys(data).forEach(function(key) {
            inter.setItem(key, data[key]);

            usedKeys.push(key);
        });

        Object.keys(rows).forEach(function(key) {
            if (usedKeys.includes(key)) {
                return;
            }

            inter.removeItem(key);
        });
    };

    inter.checkItemIsSelected = function(key) {
        return rows[key]?.find("input[type='checkbox']").getValue() || false;
    };

    inter.getSelection = function() {
        return Object.keys(rows).filter((key) => inter.checkItemIsSelected(key));
    };

    inter.setItemSelection = function(key, selected) {
        rows[key].find("input[type='checkbox']").setValue(selected);
    };

    inter.setSelection = function(selection) {
        Object.keys(rows).forEach(function(key) {
            inter.setItemSelection(key, selection.includes(key));
        });
    };

    Object.keys(props.items).forEach(function(itemKey) {
        inter.setItem(itemKey, props.items[itemKey]);
    });

    selectAllCheckbox.on("change", function() {
        var shouldSelectAll = selectAllCheckbox.getValue();

        Object.values(rows).forEach(function(row) {
            row.find("input[type='checkbox']").setValue(shouldSelectAll)
        });
    });

    return c.Table (
        c.TableHeader (
            c.TableRow (
                c.TableHeaderCell() (selectAllCheckbox),
                ...children
            )
        ),
        tableMain
    );
});