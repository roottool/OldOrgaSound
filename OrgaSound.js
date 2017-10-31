    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
    var config = {

    };
    firebase.initializeApp(config);

    // Get a reference to the storage service, which is used to create references in your storage bucket
    //var storage = firebase.storage();
    var storageRef = firebase.storage().ref();

    audio = new Audio();
    angular.module('App', ['ngAudio'])
    .controller('AppController', function($scope,ngAudio){
        $scope.display = function(){
        var str = $scope.displayText;
            $scope.text = str;
            if ($scope.text == "tomarunja"){
            var stream = "https://orgasound-6b59e.firebaseapp.com/" + str + ".ogg";
            sound = new Audio(stream);
            sound.volume = $scope.volume;
            sound.play();
            } else if ($scope.text == "orga"){
                // Create a reference to the file we want to download
                var starsRef = storageRef.child('orga/' + $scope.text + '.ogg');
    
                // Get the download URL
                starsRef.getDownloadURL().then(function(url) {
                    audio.pause();
                    audio.currentTime = 0;
                    audio.volume = $scope.volume;
                    audio.src = url;
                    audio.play();
                }).catch(function(error) {
    
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                    case 'storage/object_not_found':
                        // File doesn't exist
                        console.log("a");
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.log("b");
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        console.log("c");
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        console.log("d");
                        break;
                    }
                });
            } else {
            // Create a reference to the file we want to download
            var starsRef = storageRef.child('sound/naniyatte.ogg');

            // Get the download URL
            starsRef.getDownloadURL().then(function(url) {
                sound = new Audio(url);
                sound.volume = $scope.volume;
                sound.play();
            }).catch(function(error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                case 'storage/object_not_found':
                    // File doesn't exist
                    console.log("a");
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    console.log("b");
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    console.log("c");
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    console.log("d");
                    break;
                }
            });
            }
        }

        $scope.stop = function(){
            audio.pause();
            audio.currentTime = 0;
        }
    });