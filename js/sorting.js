
(function(root, undefined) {

var sort = {

    // Needed to refresh state on changes.
    reset: function(day) {
        day.classList.remove('make-hidden', 'make-visible');
    },

    setVisible: function(day, bool) {
        if (bool === true) {
            day.classList.add('make-hidden');
        }
        else {
            day.classList.add('make-visible');   
        }
    },
    
    setHiddenTrue: function(day) { // Hide header
        this.reset(day);
        this.setVisible(day, true);
    },

    setHiddenFalse: function(day) { // Un-hide
        this.reset(day);
        this.setVisible(day, false);
    },

    getClasses: function (val) {

        if (val === "" || null || undefined) {
          return;
        }

        var container = document.getElementById("schedule");
        // The div where the hidden/visible classes are
        var div = container.getElementsByTagName("div");

        for (var i = 0; i < div.length; i++) {
            if (val == 'all') {
                this.reset(div[i]);
                this.setVisible(div[i], false);
            }
            else {
                this.reset(div[i]);
                
                // If selected value matches classname or is the day head, make visible
                if (div[i].classList.contains(val) || div[i].classList.contains('day-head')) {
                    this.setVisible(div[i], false);
                }
                else {
                    // Hide all others
                    this.setVisible(div[i], true);
                }
            }
        }
        // Now determine if header should be hidden.
        this.isHeaderVisible();
    },

    isHeaderVisible: function() {

        var mon=monday, tue=tuesday, wed=wednesday, thu=thursday, fri=friday, sat=saturday, sun=sunday;

        // Get length of classes that are hidden and set the max for that day
        var dayDetails = [
            {
                len: document.querySelectorAll('#monday .make-hidden').length,
                max: 7,
                day: mon
            },
            {
                len: document.querySelectorAll('#tuesday .make-hidden').length,
                max: 6,
                day: tue
            },
            {
                len: document.querySelectorAll('#wednesday .make-hidden').length,
                max: 5,
                day: wed
            },
            {
                len: document.querySelectorAll('#thursday .make-hidden').length,
                max: 6,
                day: thu
            },
            {
                len: document.querySelectorAll('#friday .make-hidden').length,
                max: 4,
                day: fri
            },
             {
                len: document.querySelectorAll('#saturday .make-hidden').length,
                max: 4,
                day: sat
            },
             {
                len: document.querySelectorAll('#sunday .make-hidden').length,
                max: 3,
                day: sun
            }

        ];

        // Iterate through the dayDetails object array...
        for (var i = 0; i < dayDetails.length; i++) {
            // If length of classes hidden equals the number of classes
            //  possible on that day, then hide header.
            if (dayDetails[i].len == dayDetails[i].max) {
              this.setHiddenTrue(dayDetails[i].day);
            }
            else {
                this.setHiddenFalse(dayDetails[i].day); 
            }
        }
    }
};

root.sort = sort;

}(this));