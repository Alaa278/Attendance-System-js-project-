window.addEventListener("load", function () {
    /*   ////////////// pop up   /////////*/
    let boxContainer = document.querySelector(".box_container");
    let mybtn = document.getElementsByClassName("myBtn");
    let myclose = document.getElementById("close");
    for (let i = 0; i < mybtn.length; i++) {
        mybtn[i].addEventListener("click", showBox)
    }
    function showBox(e) {
        boxContainer.style.transform = "scale(1,1)";
        boxContainer.firstElementChild.style.transform = "scale(1,1)";
        //  console.log(e) ; 
        let btnclass = e.target.textContent;
        let mydevs = boxContainer.firstElementChild.children;
        for (let i = 1; i < mydevs.length; i++) {
            mydevs[i].style.display = "none";
            if (mydevs[i].classList.contains(btnclass)) {
                mydevs[i].style.display = "block";

            }

        }

    }
    function hideBox() {
        boxContainer.style.transform = "scale(0,0)";
        boxContainer.firstElementChild.style.transform = "scale(0,0)";

    };
    if (myclose) {
        myclose.addEventListener("click", hideBox);
    }




    /*document.addEventListener("keydown", function (e) {
       // console.log(e.keyCode);
        if (e.keyCode == 32) {
            hideBox();
        }
        else
        {
            console.log("sss")
        }
    });*/


    /*/////////////////////////////////////////////////*/

    /*/////////////////////forms validation ///////////*/
    $(".userfirst").focus();

    //////////////// function for error ////////////////////
    function inputfailed(data) {
        data.focus();
        data.select();
        redError(data);
    };
    ////////////////// error span//////////////////////////
    function redError(data) {
        $(data).addClass("myshadow").next().css("display", "block");
    };
    ///////////////////function for sucess////////////
    function inputSucces(data) {
        $(data).removeClass("myshadow").next().css("display", "none");
    };
    ////////////////////////////////////////////
    // register
    $(".box_item form small").css("display", "none");
    $(".box_item2 form small").css("display", "none");
    // first name and last name
    $(".userfirst, .userlast").blur(function () {
        namevalid(this);
    }); // name
    function namevalid(data) {
        if (!isusernamevalide(data)) {
            inputfailed(data);
        } else {
            inputSucces(data);
        }
    };

    function isusernamevalide(data) {
        let usernamepattern = /^[A-Za-z]{3,15}$/;
        return $(data).val().match(usernamepattern);
    };
    console.log(document.getElementById("useratten"));
    console.log($("#useratten"));


    //////////// user address validation ////////////////

    $(".useraddress").blur(function () {
        addressvalid(this);
    }); // address

    //////////
    function addressvalid(data) {
        if (!isusernaddressvalide(data)) {
            inputfailed(data);
        } else {
            inputSucces(data);
        }
    };
    function isusernaddressvalide(data) {
        let usernamepattern = /^[A-Za-z0-9 ]{3,30}$/;
        return $(data).val().match(usernamepattern);
    }
    ///////////// email validation //////////////
    $(".useremail").blur(function () {
        emailvalid(this);
    });
    function emailvalid(data) {
        if (!isuseremailvalide(data)) {
            inputfailed(data);
        } else {
            inputSucces(data);
        }
    }
    function isuseremailvalide(data) {
        let usernamepattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return $(data).val().match(usernamepattern);
    };
    ///////////////////////////////////////
    ///////////// user age validation ///////////////// 

    $(".userage").blur(function () {
        agevalide(this);
    });
    function agevalide(data) {
        if (!isuseragevalide(data)) {
            inputfailed(data);
        } else {
            inputSucces(data);
        }
    }
    function isuseragevalide(data) {
        let usernamepattern = /^(1[90]|[2-6][0-9])$/;
        return $(data).val().match(usernamepattern);
    };
    let data1 = $(".userage");
    let data2 = $(".useremail");
    let data3 = $(".useraddress");
    let data4 = $(".userfirst");
    let data5 = $(".userlast");
    //////////////////register button validation/////////////

    $("#form1").submit(function (e) {

        if (!(isuseragevalide(data1) && isuseremailvalide(data2) && isusernaddressvalide(data3) && isusernamevalide(data4) && isusernamevalide(data5))) {
            e.preventDefault();
            if (!isuseragevalide(data1)) {
                redError(data1);
            }
            if (!isuseremailvalide(data2)) {
                redError(data2);
            }
            if (!isusernaddressvalide(data3)) {
                redError(data3);
            }
            if (!isusernamevalide(data4)) {
                redError(data4);
            }
            if (!isusernamevalide(data5)) {
                redError(data5);
            }
        }
        else {
            e.preventDefault();
            sendEmail(data1, data2, data3, data4, data5);
            sendEmailUser();
            hideBox();
        }

    });

    ///////////////////login user/////////////////////////////////
    $(".loginname, .useratten").blur(function () {
        loginvalid(this);
    });
    function loginvalid(data) {
        if (!isloginvalid(data)) {
            inputfailed(data);
        } else {
            inputSucces(data);
        }
    };

    function isloginvalid(data) {
        let usernamepattern = /^(_)[A-Za-z0-9]{6,18}$/;
        return $(data).val().match(usernamepattern);
    };
    /////////////// login password /////////////////////

    $(".loginpass").blur(function () {
        loginpasvalid(this);
    });
    function loginpasvalid(data) {
        if (!isloginpasvalid(data)) {
            inputfailed(data);
        } else {
            inputSucces(data);
        }
    };

    function isloginpasvalid(data) {
        let usernamepattern = /^[A-Za-z0-9]{6,15}$/;
        return $(data).val().match(usernamepattern);
    };

    let data6 = $(".loginname");
    let data7 = $(".loginpass");
    $("#form2").submit(function (e) {
        e.preventDefault();
        if (!(isloginvalid(data6) && isloginpasvalid(data7))) {
            e.preventDefault();
            if (!isloginvalid(data6)) {
                redError(data6);
            }
            if (!isloginpasvalid(data7)) {
                redError(data7);

            }
        }
        else {

            e.preventDefault();
            fetch(`http://localhost:3000/employees?username=${data6.val()}&password=${data7.val()}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(jsonResponse => {
                    console.log(jsonResponse);
                    if (jsonResponse.length === 0) {
                        alert('this user doent exist')
                    } else {
                        alert('correct username and password')
                        localStorage.setItem('user', JSON.stringify(jsonResponse[0]))
                        open('attendance.html');
                        // alert(JSON.stringify(jsonResponse[0]));          
                        setTimeout(function () { location.reload(); }, 10);
                    }
                })


        }
    });

    ////////////////////////////////////////////////////////////
    /////////// admin validation //////////////////////////////
    /////////////admin user name/////////////////////////////
    $(".admintext").blur(function () {
        adminName(this);
    });
    function adminName(data) {
        if (!isadminNameValide(data)) {
            inputfailed(data);
        } else {
            inputSucces(data);
        }
    }
    function isadminNameValide(data) {
        let usernamepattern = /^(admin)$/;
        return $(data).val().match(usernamepattern);
    };
    ////////////////////////////////////////////////////////////
    /////////////admin password //////////////////////////////

    $(".adminpass").blur(function () {
        adminPass(this);
    });
    function adminPass(data) {
        if (!isadminPasValide(data)) {
            inputfailed(data);
        } else {
            inputSucces(data);
        }
    }
    function isadminPasValide(data) {
        let usernamepattern = /^(admin123)$/;
        return $(data).val().match(usernamepattern);
    };

    let data8 = $(".admintext");
    let data9 = $(".adminpass");
    $("#form3").submit(function (e) {
        if (!(isadminNameValide(data8) && isadminPasValide(data9))) {
            console.log(e);
            e.preventDefault();

            if (!isadminNameValide(data8)) {
                redError(data8);
            }
            if (!isadminPasValide(data9)) {
                redError(data9);
            }
        }
        else {
            e.preventDefault();
            open('admin.html');
            hideBox();
        }


    })
    /////////////////////////////////////////////
    //txyttyimohrdkvru

    //////////// send email function to admin //////////////
    function sendEmail(data1, data2, data3, data4, data5) {

        Email.send({
            Host: "smtp.gmail.com",
            Username: "alaaelbehairy12@gmail.com",
            Password: "txyttyimohrdkvru",
            To: "alaaelbehairy12@gmail.com",
            From: `${data2.val()}`,
            Subject: "This is subject of email",
            Body: `first name: ${data4.val()} <br/> 
                last name: ${data5.val()} <br/>
                Email: ${data2.val()} <br/>
                Address: ${data3.val()} <br/>
                Age: ${data1.val()} `,
        })
            .then(alert('success'))
    };



    ///////////// sen email to user function ///////
    function sendEmailUser() {
        newEmployee = {
            username: usename(),
            password: generatePass(),
            firstname: data4.val(),
            lastname: data5.val(),
            address: data3.val(),
            email: data2.val(),
            age: data1.val(),
            attendance: [],
            late: [],
            absent: [],
            excuse: [] ,
        }
        console.log(newEmployee)

        Email.send({
            Host: "smtp.gmail.com",
            Username: "alaaelbehairy12@gmail.com",
            Password: "txyttyimohrdkvru",
            To: `${data2.val()}`,
            From: "alaaelbehairy12@gmail.com",
            Subject: "This is subject of email",
            Body: `User Name: ${newEmployee.username} <br/> 
                   Password: ${newEmployee.password} <br/>`,
        }).then(
            fetch('http://localhost:3000/employees', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(newEmployee)
            }).then(alert('success'))

        )
    };

    ///////////// function generate user name and password ///////////
    function usename() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    function generatePass() {
        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let string_length = 8;
        let randomstring = "";
        for (let i = 0; i < string_length; i++) {
            let rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        };
        return randomstring;
    };

    /////////////// attendance page ////////////////

    let boxContainer2 = document.querySelector(".box_container2");
    //  let confbtn = document.getElementById("confirm");
    function hideBox2() {
        boxContainer2.style.transform = "scale(0,0)";
        boxContainer2.firstElementChild.style.transform = "scale(0,0)";
    };

    //////////////////////////////////////////////////////

    user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    function userAttendance() {
        $("#emName")[0].innerText = `${(user.firstname)} ${(user.lastname)}`;
        let dayDatae = new Date();
        let ampm = (dayDatae.getHours() >= 12) ? "PM" : "AM";
        let hour = dayDatae.getHours();
        let min = dayDatae.getMinutes();
        let sec = dayDatae.getSeconds();
        let time = hour + ":" + min + ":" + sec + ":" + ampm;
        $("#emAttendance")[0].innerText = time;
        $("#nameInf")[0].innerText = `${(user.firstname)} ${(user.lastname)}`;
        $("#ageInf")[0].innerText = user.age;
        $("#mailInf")[0].innerText = user.email;
        $("#timeInf")[0].innerText = time;

        //////////////////////////////////
        if (hour >= '7' && hour <= '9' && min <= "15" && ampm == 'Am') {
            $("#stateInf ")[0].innerText = "Attendance";
            user.attendance.push(new Date().toLocaleString());

        }
        else if (hour >= '9' && min > '15' && min <= '30' && ampm == 'Am') {
            $("#stateInf ")[0].innerText = "Late";
            user.late.push(new Date().toLocaleString());

        }
        else {
            $("#stateInf ")[0].innerText = "Absent";
            user.absent.push(new Date().toLocaleString());

        }
        //////////////////////update data in json//////////////////////////////////

        fetch(`http://localhost:3000/employees/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(user))
            })

        /////////////////////////////////////////////////////
        $("#mattendance")[0].innerText = user.attendance.length;
        $("#mlate")[0].innerText = user.late.length;
        $("#mabsent")[0].innerText = user.absent.length;
    }

    let useratten = $(".useratten");
    $("#confgForm").submit(function (e) {
        if (!isloginvalid(useratten)) {
            redError(useratten);
            e.preventDefault();
        }
        else {
            e.preventDefault();
            if (useratten.val() == user.username) {
                hideBox2();
                userAttendance();
            }
            else {
                alert("please enter your own username in login")
            }
        }
    })

    ////////// daily and monthly report ///////////
    let bage1 = document.getElementById("badge1");
    let bage2 = document.getElementById("badge2");
    let daily = document.getElementsByClassName("daily")[0];
    let montly = document.getElementsByClassName("monthly")[0];
    if (bage1) {
        bage1.addEventListener("click", function () {
            daily.style.display = "block";
            montly.style.display = "none";
            bage1.classList.add("bdgeStyle");
            bage2.classList.remove("bdgeStyle");
        });
    }
    if (bage2) {

        bage2.addEventListener("click", function () {
            daily.style.display = "none";
            montly.style.display = "block";
            bage2.classList.add("bdgeStyle");
            bage1.classList.remove("bdgeStyle");

        });

    }
    ////////////////////// logout button ////////////
    $("#logout").click(function () {
        window.close();
        localStorage.clear();
    });
    ////////////////// admin login////////////////////////////
    let arr = [];
    let empdata = function () {

        fetch(`http://localhost:3000/employees`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(jsonResponse => {
                console.log(jsonResponse);

                arr = jsonResponse
                allEmployee();
                fullReport();
                lateReport();
                absentReport();
                attendanceReport();
                return arr

            })
    };
    empdata();

    //////////////////////////////////////////////////////

    function allEmployee() {
        let emparr = arr;
        for (let i = 0; i < emparr.length; i++) {
            $("#empbody").append(`<tr><td>${emparr[i].id}</td><td>${emparr[i].firstname} ${emparr[i].lastname}</td>
        <td>${emparr[i].username}</td><td>${emparr[i].password}</td><td>${emparr[i].email}</td><td>${emparr[i].address}</td>
        <td>${emparr[i].age}</td><td>${emparr[i].attendance.length}</td><td>${emparr[i].late.length}</td><td>${emparr[i].absent.length}</td></tr>`)
        }
    };

    function fullReport() {
        let emparr = arr;
        for (let i = 0; i < emparr.length; i++) {
            $("#fullbody").append(`<tr><td>${emparr[i].firstname} ${emparr[i].lastname}</td><td>${emparr[i].username}</td>
        <td>${emparr[i].password}</td><td>${emparr[i].email}</td><td>${emparr[i].address}</td>
        <td>${emparr[i].age}</td><td>${emparr[i].attendance.length}</td><td>${emparr[i].late.length}</td><td>${emparr[i].absent.length}</td></tr>`)
        }
    };

    function attendanceReport() {
        let emparr = arr;
        for (let i = 0; i < emparr.length; i++) {
            $("#attenbody").append(`<tr><td>${emparr[i].firstname} ${emparr[i].lastname}</td><td>${emparr[i].username}</td>
        <td>${emparr[i].attendance.length}</td></tr>`)
        }
    };

    function lateReport() {
        let emparr = arr;
        for (let i = 0; i < emparr.length; i++) {
            $("#latebody").append(`<tr><td>${emparr[i].firstname} ${emparr[i].lastname}</td><td>${emparr[i].username}</td>
        <td>${emparr[i].late.length}</td></tr>`)
        }
    };

    function absentReport() {
        let emparr = arr;
        for (let i = 0; i < emparr.length; i++) {
            $("#AbsentRepo").append(`<tr><td>${emparr[i].firstname} ${emparr[i].lastname}</td><td>${emparr[i].username}</td>
        <td>${emparr[i].absent.length}</td></tr>`)
        }
    };
    ///////////////////////////
    $(".admin .badge:eq(0)").click(function () {
        $(this).addClass("tableStyle").siblings().removeClass("tableStyle");
        $("#allEmp").css("display", "table").siblings().css("display", "none");

    });


    $(".admin .badge:eq(1)").click(function () {
        $(this).addClass("tableStyle").siblings().removeClass("tableStyle");
        $("#fullRepo").css("display", "table").siblings().css("display", "none");
    });

    $(".admin .badge:eq(2)").click(function () {
        $(this).addClass("tableStyle").siblings().removeClass("tableStyle");
        $("#attenRepo").css("display", "table").siblings().css("display", "none");
    });

    $(".admin .badge:eq(3)").click(function () {
        $(this).addClass("tableStyle").siblings().removeClass("tableStyle");
        $("#lateRepo").css("display", "table").siblings().css("display", "none");
    });

    $(".admin .badge:eq(4)").click(function () {
        $(this).addClass("tableStyle").siblings().removeClass("tableStyle");
        $("#AbsentRepo").css("display", "table").siblings().css("display", "none");
    });


});