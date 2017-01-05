var bbmUtil = { };
bbmUtil.accessible = false;

/**
 * Performs steps necessary to start using BBM Platform.
 * 
 * Steps necessary:
 * - Sets static BBM platform callbacks which the application wishes to use.
 * - Call blackberry.bbm.platform.register() with your UUID.
 */
bbmUtil.init = function () {
    /**
     * Invoked when the application's access to BBM platform changes.
     */
    blackberry.bbm.platform.onaccesschanged = function (accessible, status) {
        bbmUtil.accessible = accessible; // Save the accessible state

        // If allowed, initialize the application
        if (status == "allowed") {
			try{profileBox.addItem("Playing huZZle puZZle","local:///img/icon.png");}
			catch(e0){}
			bbmconnected();
			
        } else {
        var menuitem = new blackberry.ui.menu.MenuItem(false, 1, "Connect To BBM",bbmUtil.requestPermissionAndRegister);
		if(!MB.bbmcon)blackberry.ui.menu.addMenuItem(menuitem);
        MB.bbmcon=true;
		reqbbm();
            if (status == "user") {
				
           //  alert("<button onclick='' class='btn btn-warning'>Connect to BBM</button>");
            }
        }
    };
    blackberry.bbm.platform.io.onconnectionaccepted = function (type, connection) {
        //connections.setupConnection(type, connection);
    };
    blackberry.bbm.platform.io.onuserreachable = function (user) {
        alert(user.displayName + " was unreachable, but can now receive messages.");
    };
    blackberry.bbm.platform.io.ondataexpired = function (user, data) {
        alert(user.displayName + " did not receive all messages");
    };
    blackberry.bbm.platform.users.onupdate = function (user, event) {
        if (event === "invited") {
            alert("You were invited to a chat. Go to BBM to accept it.");
        } else if(user.handle === blackberry.bbm.platform.self.handle) {
           // userProfile.populate();
        }
    };

    /*
     * Finally the application should register with the platform.
     */
    bbmUtil.register();
};

/**
 * Registers the application with BBM. Static callbacks should be set before this method is called.
 * Called by {@link bbmUtil.init()}.
 * @see bbmUtil.init()
 */
bbmUtil.register = function () {
    blackberry.bbm.platform.register({
        // TODO You must define your own UUID
        uuid: "F87bcbc0-aa5a-11e0-9f1c-FF33700c9a11"
    });
};

/**
 * Invoked by a "Connect to BBM" button which appears when registration fails due to the user blocking
 * the application.
 * 
 * Prompts the user to connect the application to BBM, which brings the user to the application's
 * BBM Options screen to connect it. If the user connects then it re-registers using {@link bbmUtil.register()}.
 */
bbmUtil.requestPermissionAndRegister = function () {
    blackberry.bbm.platform.requestUserPermission(function (allowed) {
        if (allowed) {
            bbmUtil.register();
        }
    });
};

/**
 * Shows a Contact Picker allowing the user to invite contacts to download the application.
 */
bbmUtil.inviteToDownload = function () {
    blackberry.bbm.platform.users.inviteToDownload(function (result) {
        if (result === "limitreached") {
            alert("Invitation limit reached, please select fewer next time.");
        } else {
            // User finished inviting
        }
    });
};

/**
 * Shows a Contact Picker allowing the user to start a chat with other users within BBM.
 */
bbmUtil.startBBMChat = function () {
    blackberry.bbm.platform.users.startBBMChat(function () {
        // Continue with application...
    }, "Have you tried " + blackberry.app.name + "?");
};

/**
 * Returns an access status message to be displayed to the user.
 * @param {String} status The status code.
 */
bbmUtil.getStatusMessage = function (status) {
    if (status === "user") {
        return "You decided not to connect " + blackberry.app.name + " to BBM";
    } else if (status === "rim") {
        return blackberry.app.name + " has been banned by RIM.";
    } else if (status === "resetrequired") {
        return "A device restart is required to use this application.";
    } else if (status === "nodata") {
        return "There was no data coverage. Please try again when you are in data coverage.";
    } else if (status === "temperror") {
        return "A temporary error occured. Please try again in 30 minutes.";
    }
};

bbmUtil.getJoinRequestDeclinedReason = function (reason) {
    if (reason === "hostdeclined") {
        return "The host declined your join request";
    } else if (reason === "hostppidinvalid") {
        return "The host PPID was invalid";
    } else if (reason === "appnotrunning") {
        return "The host was not running " + blackberry.app.name;
    } else if (reason === "connectionnotfound") {
        return "The user was not hosting a connection";
    } else if (reason === "connectionfull") {
        return "The host's connection was full";
    }
};

bbmUtil.getJoinRequestCanceledReason = function (reason) {
    if (reason === "peercanceled") {
        return "The peer canceled the request";
    } else if (reason === "peerleft") {
        return "The peer exited " + blackberry.app.name;
    }
};

/**
 * Returns string for a number of users.
 * @param {blackberry.bbm.platform.users.BBMPlatformUser[]} users The users.
 */
bbmUtil.getUsersString = function (users) {
    var usersStr, i;
    if (users.length === 0) {
        return "no users";
    } else {
        usersStr = users[0].displayName;
        for (i = 1; i < users.length; i++) {
            usersStr += ", " + users[i].displayName;
        }
        return usersStr;
    }
};

var util = { };

/**
 * Allows the user to select a local icon.
 */
util.selectIcon = function (cancelChoice) {
    var choices = ["Orange", "Apple", "Pear", cancelChoice],
        choice = blackberry.ui.dialog.customAsk("Select an icon", choices),
        icons =   ["orange.png", "apple.png", "pear.png"];
    if (choice >= icons.length) {
        return undefined;
    } else {
        return "local:///images/icons/" + icons[choice];
    }
};

/**
 * Manages the user profile content div.
 */
var userProfile = { };

userProfile.populate = function () {
    var self = blackberry.bbm.platform.self;
    this.populateBasics(self);
    this.populateLocation(self.location);
};

userProfile.populateBasics = function (self) {
    var displayPictureImg =  document.getElementById("user-profile-display-picture"),
        displayNameDiv =     document.getElementById("user-profile-display-name"),
        personalMessageDiv = document.getElementById("user-profile-personal-message");

    displayPictureImg.src =        self.displayPicture;
    displayNameDiv.innerHTML =     self.displayName;
    personalMessageDiv.innerHTML = self.personalMessage;
};

userProfile.populateLocation = function (location) {
    var locationDisabledMessage = document.getElementById("user-profile-location-disabled"),
        locationDetails =         document.getElementById("user-profile-location-details"),
        locationFlag =     document.getElementById("user-profile-location-flag"),
        locationCountry =  document.getElementById("user-profile-location-country"),
        locationTimezone = document.getElementById("user-profile-location-timezone");

    if (location) {  // User has enabled location on their BBM profile
        locationDisabledMessage.style.display = "none";
        locationDetails.style.display = "block";

        locationFlag.src =           location.flag;
        locationCountry.innerHTML =  location.countryCode;
        locationTimezone.innerHTML = "GMT " + (location.timezoneOffset / 60);
    } else {        // User has disabled location on their BBM profile
        locationDisabledMessage.style.display = "block";
        locationDetails.style.display = "none";
    }
};

userProfile.selectDisplayPicture = function () {
    var displayPicture = util.selectIcon("Cancel");
    if (displayPicture) {
        blackberry.bbm.platform.self.setDisplayPicture(displayPicture, function (accepted) {
            if(accepted) {
                // User allowed change
            } else {
                // User denied change
            }
        });
    }
};

userProfile.setPersonalMessage = function (msg) {
   var personalMessage = msg;
    blackberry.bbm.platform.self.setPersonalMessage(personalMessage, function (accepted) {
        if(accepted) {
    
        } else {
	
        }
    });
};

userProfile.setStatus = function (status, statusMsg) {
     blackberry.bbm.platform.self.setStatus(status, statusMsg, function (accepted) {
        if(accepted) {
            // User allowed change
        } else {
            // User denied change
        }
    });
};

/**
 * Manages the profile box content div.
 */
var profileBox = { };

profileBox.itemIcon = "";

profileBox.populate = function () {
    var itemsDiv = document.getElementById("profile-box-items"),
        items = blackberry.bbm.platform.self.profilebox.items,
        i,
        itemDiv,
        icon;
    if (items.length === 0) {
        itemsDiv.innerHTML = "There are no profile box items.";
    } else {
        itemsDiv.innerHTML = "Select a profile box item to delete it.";
        for (i = items.length - 1; i >= 0; i--) {
            itemDiv = document.createElement("div");
            icon = items[i].icon;
            if (!icon) {
                icon = "";
            }
            itemDiv.innerHTML = '<div x-blackberry-focusable="true" class="profile-box-item" onclick="profileBox.removeItem(' + items[i].id + ');"><img class="profile-box-icon" src="' + icon + '"/><div class="profile-box-text">' + items[i].text + '</div></div>';
            itemsDiv.appendChild(itemDiv);
        }
    }
};

profileBox.removeItem = function (id) {
    var answer = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_OK_CANCEL, "Delete this item?"),
        items,
        i;
    if (answer === blackberry.ui.dialog.D_OK) {
        items = blackberry.bbm.platform.self.profilebox.items;
        for (i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                blackberry.bbm.platform.self.profilebox.removeItem(items[i]);
                this.populate();
                break;
            }
        }
    }
};
profileBox.addItem = function (itemText,itemIcon) {
  
        itemOptions = { text: itemText, icon: itemIcon };
        blackberry.bbm.platform.self.profilebox.addItem(itemOptions);
     //   this.populate();
};

/**
 * Manages the invite to BBM content div.
 */
var inviteToBBM = { };

/**
 * A list of the contact invitations to be sent.
 * @type blackberry.bbm.platform.users.ContactInvitation[]
 */
inviteToBBM.invitations = [];

/**
 * Adds a contact invitation to inviteToBBM.invitations.
 */
inviteToBBM.addContact = function (nameVal,pinVal) {
    
    if (nameVal.length === 0) {
        alert("Name cannot be empty");
        return;
    }
    if (pinVal.length !== 8) {
        alert("PIN must be 8 characters long");
        return;
    }
   	this.invitations.push({name:nameVal,pin:pinVal});
};

/**
 * Sends the invitations in inviteToBBM.invitations.
 */
inviteToBBM.invite = function (pin,nm) {
   
   if(!bbmUtil.accessible)return;
    blackberry.bbm.platform.users.inviteToBBM(function () {
        // Continue with application...
    }, [{pin:pin,name:nm}]);
  
  //  var contactsDiv = document.getElementById("invite-to-bbm-contacts");
 //   contactsDiv.innerHTML = "";
};

/**
 * Manages the file transfer content div.
 */
var fileTransfer = { };
fileTransfer.sendFile = function (file) {
	var txt = file.split("/");
	txt = " Filename: "+ txt[txt.length - 1];
    blackberry.bbm.platform.users.sendFile(file, txt, function (reason) {
        var message = fileTransfer.getFailureMessage(reason);
        if (message) {
            alert(message);
        }
    });
};
fileTransfer.getFailureMessage = function (reason) {
    if (reason === "filenotfound") {
        return "The file does not exist.";
    } else if (reason === "filetoolarge") {
        return "The file is too large.";
    } else if (reason === "fileforwardlocked") {
        return "The file is DRM protected.";
    } else if (reason === "filebadtype") {
        return "The user is unable to receive files of this type.";
    } else if (reason === "fileempty") {
        return "The file is empty and cannot be sent.";
    } else if (reason === "usercanceled") {
        return "You canceled the file transfer.";
    } else if (reason === "noncontact") {
        return "You may only send files to your BBM contacts.";
    }
};

/**
 * Manages the peer content div.
 */
