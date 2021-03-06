    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
    var config = {

    };
    firebase.initializeApp(config);

    // Get a reference to the storage service, which is used to create references in your storage bucket
    //var storage = firebase.storage();
    var storageRef = firebase.storage().ref();

    var re = /^orga[0-9]*$/;
    audio = new Audio();

    angular.module('App', [])
        .controller('AppController', function ($scope) {
            var milkcocoa = new MilkCocoa('');
            $scope.myApp = milkcocoa.dataStore('ng-test');
            $scope.user = "";
            $scope.msgBoxes = "";

            $scope.readMes = function (e) {
                $scope.myApp.stream().next(function (err, data) {
                    $scope.msgBoxes = data;
                    $scope.$apply();
                    if (typeof $scope.msgBoxes[$scope.msgBoxes.length - 1].value.text != "undefined" &&
                        $scope.msgBoxes[$scope.msgBoxes.length - 1].value.text != "") {
                        play($scope.msgBoxes[$scope.msgBoxes.length - 1].value.text);
                        var obj = document.getElementById('bodyScroll');
                        if (!obj) return;
                        scrollTo(0, obj.scrollHeight);
                    }
                });
            }

            $scope.sendMes = function () {
                if (typeof $scope.user != "undefined" && typeof $scope.msg != "undefined" &&
                    $scope.user != "" && $scope.msg != "") {
                    $scope.myApp.push({
                        name: $scope.user,
                        text: $scope.msg
                    });
                    $scope.msg = "";
                }
            }

            $scope.myApp.on('push', function (event) {
                $scope.readMes();
            });

            $scope.stop = function () {
                audio.pause();
                audio.currentTime = 0;
            }

            function play(text) {
                if (re.test(text)) {
                    // Create a reference to the file we want to download
                    var starsRef = storageRef.child('orga/' + text + '.ogg');

                    // Get the download URL
                    starsRef.getDownloadURL().then(function (url) {
                        audio.pause();
                        audio.currentTime = 0;
                        audio.volume = $scope.volume;
                        audio.src = url;
                        audio.play();
                    }).catch(function (error) {
                        OutputError(error)
                    });
                } else {
                    // Create a reference to the file we want to download
                    var starsRef = storageRef.child('sound/' + text + '.ogg');

                    // Get the download URL
                    starsRef.getDownloadURL().then(function (url) {
                        sound = new Audio(url);
                        sound.volume = $scope.volume;
                        sound.play();
                    }).catch(function (error) {
                        OutputError(error)
                    });
                }
            }

            function OutputError(error) {
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
            }
        });