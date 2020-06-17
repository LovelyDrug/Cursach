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
const spacingBox_outer = 6;
const defaultSpacing = 50;
const defaultXalign = 0;
const defaultNumber = 0;
const one = 1;

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

        let box_outer = new Gtk.Box({orientation: Gtk.Orientation.VERTICAL, spacing: spacingBox_outer });
        this.add(box_outer);

        let listbox = new Gtk.ListBox();
        listbox.selection_mode = Gtk.SelectionMode.NONE;
        box_outer.pack_start(listbox, true, true, defaultNumber);

        let rowDate = new Gtk.ListBoxRow();
        let hboxDate = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: defaultSpacing});
        rowDate.add(hboxDate);
        let vboxDate = new Gtk.Box({orientation: Gtk.Orientation.VERTICAL});
        hboxDate.pack_start(vboxDate, true, true, defaultNumber);

        let labelDate = new Gtk.Label({label: 'Automatic Date & Time', xalign: defaultXalign});
        let labelInternet = new Gtk.Label({label: 'Requires internet access', xalign: defaultXalign});
        vboxDate.pack_start(labelDate, true, true, defaultNumber);
        vboxDate.pack_start(labelInternet, true, true, defaultNumber);

        let swtch = new Gtk.Switch();
        let hboxSwitch= new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: defaultSpacing});
        swtch.valign = Gtk.Align.CENTER;
        hboxSwitch.pack_start(swtch, false, true, defaultNumber);

        listbox.add(rowUpdate);

        let rowUpdate = new Gtk.ListBoxRow();
        let hboxUpdate = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: defaultSpacing});
        rowUpdate.add(hboxUpdate);
        let labelUpdate = new Gtk.Label({label: 'Enable Automatic Update', xalign: defaultXalign});
        let checkUpdate = new Gtk.CheckButton();
        hboxUpdate.pack_start(labelUpdate, true, true, defaultNumber);
        hboxUpdate.pack_start(checkUpdate, false, true, defaultNumber);

        listbox.add(rowFormat);

        let rowFormat = new Gtk.ListBoxRow();
        let hboxFormat = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: defaultSpacing});
        rowFormat.add(hboxFormat);
        let labelFormat = new Gtk.Label({label: 'Date Format', xalign: defaultXalign});

        let comboFormat = new Gtk.ComboBoxText();
        comboFormat.insert(defaultNumber, '0', '24-hour');
        comboFormat.insert(one, '1', 'AM/PM');
        hboxFormat.pack_start(labelFormat, true, true, defaultNumber);
        hboxFormat.pack_start(comboFormat, false, true, defaultNumber);


        let listedCities = new Gtk.ListBox();
        let cities = [
            'Kyiv', 'Kharkiv', 'Lviv', 'Donetsk', 'Odessa', 'Dnipro', 'Zaporizhia',
            'Mykolaiv', 'Mariupol', 'Luhansk', 'Sevastopol', 'Vinnytsia', 'Makiivka', 
            'Simferopol', 'Kherson', 'Poltava'
        ];
        let comboCity = new Gtk.ComboBoxText();

        listedCities.add(rowCity);
        
        let rowCity = new Gtk.ListBoxRow();
        let hboxCity = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: defaultSpacing});
        rowCity.add(hboxCity);
        let labelCity = new Gtk.Label({label: 'City', xalign: defaultXalign});
        
        cities.forEach((city, index) => {
            comboCity.insert(index, ' ${index} ', city);
            hboxCity.pack_start(labelCity, true, true, defaultNumber);
            hboxCity.pack_start(comboCity, false, true, defaultNumber);
        });
    }
});
let OptionsWindow = new ListBoxWindow();
OptionsWindow.connect('destroy-event', Gtk.main_quit);
OptionsWindow.show_all();
Gtk.main();
