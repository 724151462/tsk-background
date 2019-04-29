var stompClient = null;
var index = 1;
var token = '9647dd84abb76fe6d78480b55f69d323';
var courseId='0608367675f54267aa6960fd0557cc1b';
var userId='1';

// function setConnected(connected) {
//     $("#connect").prop("disabled", connected);
//     $("#disconnect").prop("disabled", !connected);
//     if (connected) {
//         $("#conversation").show();
//     }
//     else {
//         $("#conversation").hide();
//     }
//     $("#greetings").html("");
// }

export function connect(resolve,reject) {
    var socket = new SockJS('http://120.36.137.90:9008/websocket');
    stompClient = Stomp.over(socket);
    // try {
        stompClient.connect({'token': token,'courseId':courseId}, function (frame) {
            stompTopic();
            stompQueue();
            resolve(stompClient)
          },
        function errorCallBack (error) {
            // 连接失败时（服务器响应 ERROR 帧）的回调方法
                reject('error');
            }
        )
    // } catch (error) {
    //     console.log(error)
    // }
    // var timeOut = Math.random() * 2;
    // console.log('set timeout to: ' + timeOut + ' seconds.');
    // setTimeout(function () {
    //     if (timeOut < 1) {
    //         console.log('call resolve()...');
    //         resolve('200 OK');
    //     }
    //     else {
    //         console.log('call reject()...');
    //         reject('timeout in ' + timeOut + ' seconds.');
    //     }
    // }, timeOut * 1000);
}

function stompTopic(){
    stompClient.subscribe('/teamsking/helloWorld', function (result) {
        alert(result)
        showMessage(result);
    },{'token': token});
}

function stompQueue(){

    stompClient.subscribe('/user/' + userId + '/teamsking/classroom',function(result){
        showMessage(result);
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

// function sendBroadcast() {
//     stompClient.send("/teamsking/helloWorld", {'token': token}, JSON.stringify({'name': $("#name").val()}));
// }

// function testPoint() {
//     stompClient.send("/teamsking/testPoint",{'token': token},JSON.stringify({'name': $("#name").val()}));
// }
export function sign() {
    stompClient.send("/course/start",{'token': token},
        JSON.stringify({
            "bean":50,
            "classroomId":1,
            "courseId":"0608367675f54267aa6960fd0557cc1b",
            "userId":1
        }));
}
export function signClose() {
    stompClient.send("/teamsking/course/sign/close",{'token': token},
        JSON.stringify({
            "bean":50,
            "classroomId":1,
            "courseId":"0608367675f54267aa6960fd0557cc1b",
            "userId":1
        }));
}

export function exam() {
    stompClient.send("/teamsking/course/exam/start",{'token': token},
        JSON.stringify({
            "bean":16,
            "classroomId":1,
            "courseId":"0608367675f54267aa6960fd0557cc1b",
            "userId":1
        }));
}
function examClose() {
    stompClient.send("/teamsking/course/exam/finish",{'token': token},
        JSON.stringify({
            "bean":16,
            "classroomId":1,
            "courseId":"0608367675f54267aa6960fd0557cc1b",
            "userId":1
        }));
}

function showMessage(message) {

    alert(message)
    //$("#showMessage").find('tr').eq(0).remove()
}

// function clear() {
//     $("#showMessage").find('tr').remove()
// }

// $(function () {
//     $("form").on('submit', function (e) {
//         e.preventDefault();
//     });
//     $( "#connect" ).click(function() { connect(); });
//     $( "#disconnect" ).click(function() { disconnect(); });
//     $( "#send" ).click(function() { sendBroadcast(); });
//     $( "#point" ).click(function() { testPoint(); });
//     $( "#clear" ).click(function() { clear(); });
//     $( "#sign" ).click(function() { sign(); });
//     $( "#signClose" ).click(function() { signClose(); });
//     $( "#exam" ).click(function() { exam(); });
//     $( "#examClose" ).click(function() { examClose(); });
// });