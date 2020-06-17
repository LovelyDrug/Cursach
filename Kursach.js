'use strict';

const { Gtk } = imports.gi;
const Lang = imports.lang;

Gtk.init(null);

const header = new Gtk.HeaderBar();
header.set_title('Test');
header.set_subtitle('Kursach');
header.set_show_close_button(true);

const defaultLength = 750;
const defaultHeight = 270;
const borderWidth = 10;

const emptyWindow = new Gtk.Window();
emptyWindow.window_position = Gtk.WindowPosition.CENTER;
emptyWindow.connect('destroy', Gtk.main_quit);
emptyWindow.set_default_size(defaultLength, defaultHeight);
emptyWindow.set_titlebar(header);
emptyWindow.border_width = borderWidth;
emptyWindow.show_all();

const ListBoxRowWithData = Lang.Class({
    Name: 'ListBoxRowWithData',
    Extends: Gtk.ListBoxRow,
    
    _init: function(data) {
        this.parent();
        this.data = data;
        this.add(new Gtk.Label({label: data}));
    }
});

const ListBoxWindow = Lang.Class({
    Name: 'ListBoxWindow',
    Extends: Gtk.Window,

    _init: function() {
        this.parent({title: 'Options'});
        this.border_width = borderWidth;

        const defaultSpacing = 50;
        const defaultXalign = 0;
        const box_outerSpacing = 6;

        let box_outer = new Gtk.Box({orientation: Gtk.Orientation.VERTICAL, spacing: box_outerSpacing});
        this.add(box_outer);

        let listbox = new Gtk.ListBox();
        listbox.selection_mode = Gtk.SelectionMode.NONE;
        box_outer.pack_start(listbox);

        let rowDate = new Gtk.ListBoxRow();
        let hboxDate = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: defaultSpacing});
        rowDate.add(hboxDate);
        let vboxDate = new Gtk.Box({orientation: Gtk.Orientation.VERTICAL});
        hboxDate.pack_start(vboxDate);

        let labelDate = new Gtk.Label({label: 'Automatic Date & Time', xalign: defaultXalign});
        let labelInternet = new Gtk.Label({label: 'Requires internet access', xalign: defaultXalign});
        vboxDate.pack_start(labelDate);
        vboxDate.pack_start(labelInternet);

        let swtchDate = new Gtk.Switch();
        swtchDate.valign = Gtk.Align.CENTER;
        hbox.pack_start(swtchDate);

        listbox.add(rowUpdate);

        rowUpdate = new Gtk.ListBoxRow();
        hboxUpdate = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: defaultSpacing});
        rowUpdate.add(hboxUpdate);
        let labelUpdate = new Gtk.Label({label: 'Enable Automatic Update', xalign: defaultXalign});
        let checkUpdate = new Gtk.CheckButton();
        hboxUpdate.pack_start(labelUpdate);
        hboxUpdate.pack_start(checkUpdate);

        listbox.add(rowFormat);

        rowFormat = new Gtk.ListBoxRow();
        hboxFormat = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: defaultSpacing});
        rowFormat.add(hboxFormat);
        labelFormat = new Gtk.Label({label: 'Date Format', xalign: defaultXalign});

        let comboFormat = new Gtk.ComboBoxText();
        comboFormat.insert(0, '0', '24-hour');
        comboFormat.insert(1, '1', 'AM/PM');
        hboxFormat.pack_start(labelFormat);
        hboxFormat.pack_start(comboFormat);

        let cities = [
            'Kyiv', 'Kharkiv', 'Lviv', 'Donetsk', 'Odessa', 'Dnipro', 'Zaporizhia',
            'Mykolaiv', 'Mariupol', 'Luhansk', 'Sevastopol', 'Vinnytsia', 'Makiivka', 
            'Simferopol', 'Kherson', 'Poltava'
        ];
        
        listbox.add(rowCity);
        
        let comboCity = new Gtk.ComboBoxText();
        rowCity = new Gtk.ListBoxRow();
        hboxCity = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: defaultSpacing});
        rowCity.add(hboxCity);
        labelCity = new Gtk.Label({label: 'City', xalign: defaultXalign});
        
        cities.forEach((city, index) => {
            comboCity.insert(index, ' ${index} ', city);
            hboxCity.pack_start(labelCity);
            hboxCity.pack_start(comboCity);
        });

        let sortFunc = function(row1, row2) {
            return row1.data.toLowerCase() > row2.data.toLowerCase();
        };

        let filterFunc = function(row) {
            return (row.data != 'Fail');
        };

        listbox2.set_sort_func(sortFunc);
        listbox2.set_filter_func(filterFunc);
        
        listbox2.connect('row-activated', row => print(row.data));

        box_outer.pack_start(listbox2);
        listbox2.show_all();
    }
});
let OptionsWindow = new ListBoxWindow();
OptionsWindow.connect('destroy-event', Gtk.main_quit);
OptionsWindow.show_all();
Gtk.main();
