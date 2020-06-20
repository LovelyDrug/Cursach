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
const spacingBoxOuter = 6;
const defaultSpacing = 50;
const defaultXalign = 0;
const defaultNumber = 0;
const one = 1;

const emptyWindow = new Gtk.Window();
emptyWindow.windowPosition = Gtk.WindowPosition.CENTER;
emptyWindow.connect('destroy', Gtk.main_quit);
emptyWindow.set_default_size(defaultLength, defaultHeight);
emptyWindow.set_titlebar(header);
emptyWindow.borderWidth = borderWidth;
emptyWindow.show_all();

const ListBoxWindow = Lang.Class({
  Name: 'ListBoxWindow',
  Extends: Gtk.Window,

  _init() {
    this.parent({ title: 'Options' });
    this.borderWidth = borderWidth;
    const boxOuter = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL,
      spacing: spacingBoxOuter });
    this.add(boxOuter);

    const listbox = new Gtk.ListBox();
    listbox.selectionMode = Gtk.SelectionMode.NONE;
    boxOuter.pack_start(listbox, true, true, defaultNumber);

    const rowDate = new Gtk.ListBoxRow();
    const hboxDate = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL,
      spacing: defaultSpacing });
    rowDate.add(hboxDate);
    const vboxDate = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    hboxDate.pack_start(vboxDate, true, true, defaultNumber);

    const labelDate = new Gtk.Label({ label: 'Automatic Date & Time',
      xalign: defaultXalign });
    const labelInternet = new Gtk.Label({ label: 'Requires internet access',
      xalign: defaultXalign });
    vboxDate.pack_start(labelDate, true, true, defaultNumber);
    vboxDate.pack_start(labelInternet, true, true, defaultNumber);

    const swtch = new Gtk.Switch();
    const hboxSwitch = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL,
      spacing: defaultSpacing });
    swtch.valign = Gtk.Align.CENTER;
    hboxSwitch.pack_start(swtch, false, true, defaultNumber);

    listbox.add(rowDate);

    const rowUpdate = new Gtk.ListBoxRow();
    const hboxUpdate = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL,
      spacing: defaultSpacing });
    rowUpdate.add(hboxUpdate);
    const labelUpdate = new Gtk.Label({ label: 'Enable Automatic Update',
      xalign: defaultXalign });
    const checkUpdate = new Gtk.CheckButton();
    hboxUpdate.pack_start(labelUpdate, true, true, defaultNumber);
    hboxUpdate.pack_start(checkUpdate, false, true, defaultNumber);

    listbox.add(rowUpdate);

    const rowFormat = new Gtk.ListBoxRow();
    const hboxFormat = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL,
      spacing: defaultSpacing });
    rowFormat.add(hboxFormat);
    const labelFormat = new Gtk.Label({ label: 'Date Format',
      xalign: defaultXalign });

    const comboFormat = new Gtk.ComboBoxText();
    comboFormat.insert(defaultNumber, '0', '24-hour');
    comboFormat.insert(one, '1', 'AM/PM');
    hboxFormat.pack_start(labelFormat, true, true, defaultNumber);
    hboxFormat.pack_start(comboFormat, false, true, defaultNumber);

    listbox.add(rowFormat);

    const cities = [
      'Kyiv', 'Kharkiv', 'Lviv', 'Donetsk', 'Odessa', 'Dnipro', 'Zaporizhia',
      'Mykolaiv', 'Mariupol', 'Luhansk', 'Sevastopol', 'Vinnytsia', 'Makiivka',
      'Simferopol', 'Kherson', 'Poltava'
    ];
    const comboCity = new Gtk.ComboBoxText();

    const rowCity = new Gtk.ListBoxRow();
    const hboxCity = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL,
      spacing: defaultSpacing });
    rowCity.add(hboxCity);
    const labelCity = new Gtk.Label({ label: 'City', xalign: defaultXalign });

    listbox.add(rowCity);

    cities.forEach((city, index) => {
      comboCity.insert(index, ' ${index} ', city);
      hboxCity.pack_start(labelCity, true, true, defaultNumber);
      hboxCity.pack_start(comboCity, false, true, defaultNumber);
    });
  }
});
const OptionsWindow = new ListBoxWindow();
OptionsWindow.connect('destroy-event', Gtk.main_quit);
OptionsWindow.show_all();
Gtk.main();
