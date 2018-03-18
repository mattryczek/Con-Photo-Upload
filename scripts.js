//Stuff that runs when page is first rendered.
window.onload = function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCBgGi6UO37ETezhX9mw5wwbrTppXC_Tyc",
        authDomain: "condb-b5234.firebaseapp.com",
        databaseURL: "https://condb-b5234.firebaseio.com/",
        storageBucket: "condb-b5234.appspot.com"
    };

    firebase.initializeApp(config);
    var auth = firebase.auth();

    auth.onAuthStateChanged(function(user) {
        if (user) {
            console.log('Anonymous user signed-in.');
        }
        else {
            console.log('There was no anonymous session. Creating a new anonymous user.');
            // Sign the user in anonymously since accessing Storage requires the user to be authorized.
            auth.signInAnonymously();
        }
    });



    // Create a root reference
    window.storageRef = firebase.storage().ref();
};

function showSuccess(e) {
    if (e === "OK") {
        $('#forminner').hide();
        $('#success').show();
    } else {
        showError(e);
    }
}

function submitForm(){
    var netid = $('#netid').val();
    console.log(netid);
    if (!netid) {
        showError('NetID field cannot be blank');
        document.getElementById("netid").focus();
        return;
    }

    if ((netid.length > 7) || (netid.length < 6)){
        showError('Incorrect NetID format.<br>NetIDs are 3 letters, followed by 3 or 4 numbers.');
        return;
    }
    else{
        // Create a reference first
        var imageRef = storageRef.child($('#netid').val().toLowerCase() + '.jpg');

        //var blob = new Blob([window.thePic], { type: "image/jpeg" });

        imageRef.putString(window.thePic, 'data_url').then(function(snapshot) {
            console.log('Uploaded!');
            showSuccess('OK');
        },function(error) {
            console.log('Upload error');
            console.log(error);
            showError(error);
        });            
    }
}

function startOver() {

    showMessage('');
    $('#netid').val('');
    $('#uploadText').val('');
    $('#upload').val('');

    $('#success').hide();
    $('#forminner').show();
}

function showError(e) {
    $('#progress').addClass('red-text').html(e);
}

function showMessage(e) {
    $('#progress').removeClass('red-text').html(e);
}