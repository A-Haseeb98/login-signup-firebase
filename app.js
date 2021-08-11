function register() {
    let fname = document.getElementById(`fname`)
    let lname = document.getElementById(`lname`)
    let email = document.getElementById(`email`)

    ValidateEmail(email);

    function ValidateEmail(mail) {
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail.value)) {
            alert(`si`)
            return (true)

        }
        alert("You have entered an invalid email address!")
        return (false)
    }


    let password = document.getElementById(`password`)
    let dob = document.getElementById(`dob`)
    let phone = document.getElementById(`phone`)
    let address = document.getElementById(`address`)
    let city = document.getElementById(`city`)
    let province = document.getElementById(`province`)
    let zip = document.getElementById(`zip`)


    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userData) => {
            var obj = {
                userFirstName: fname.value,
                userlastName: lname.value,
                userEmail: email.value,
                userPassword: password.value,
                userDateOfBirth: dob.value,
                userPhone: phone.value,
                userAddress: address.value,
                userCity: city.value,
                userProvice: province.value,
                userZip: zip.value
            }
            var user = userData.user;
            firebase.database().ref(`users/${user.uid}`).set(obj)
                .then(() => {
                    alert(`successfully signup`)
                    window.location.href = "index.html"
                })


        })

        .catch((err) => {
            var err = err.message;
            console.log(err)
        })
}

function login() {

    let email = document.getElementById(`email`)
    let password = document.getElementById(`password`)

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            var user = res.user;
            console.log(user)
            console.log(`success`)
            firebase.database().ref(`users/${user.uid}`)
                .once(`value`, (data) => {
                    localStorage.setItem(`userData`, JSON.stringify(data.val()))
                })
                .then(() => {
                    alert(`login Sucessfull`)
                    window.location = "home.html"

                })

        })

        .catch((err) => {
            var error = err.message;
            console.log(error)
        })
}


function getData() {
    let data = JSON.parse(localStorage.getItem(`userData`))
    console.log(data.userFirstName)


    let printData = ` 
<div class="form-row">
    <div class="form-group col-md-6 mt-3">
        <label for="fname">First name</label>
        <input type="text" class="form-control" id="fname" value="${data.userFirstName}">
    </div>
    <div class="form-group col-md-6 mt-3">
        <label for="lname">Last Name</label>
        <input type="text" class="form-control" id="lname"value="${data.userlastName}">
    </div>
</div>

<div class="form-row">
    <div class="form-group col-md-6">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" value="${data.userEmail}">
    </div>
    <div class="form-group col-md-6">
        <label for="password">Password</label>
        <input type="text" class="form-control" value="${data.userPassword}" id="password">
    </div>
</div>
<div class="form-row">
    <div class="form-group col-md-6">
        <label for="dob">Date of Birth</label>
        <input type="text" class="form-control" id="dob" value="${data.userDateOfBirth}" placeholder="">
    </div>
    <div class="form-group col-md-6">
        <label for="phone">phone No</label>
        <input type="text" class="form-control" id="phone" value="${data.userPhone}" placeholder="">
    </div>


</div>
<div class="form-group">
    <label for="address">Address </label>
    <input type="text" class="form-control" id="address" value="${data.userAddress}" placeholder="">
</div>
<div class="form-row">
    <div class="form-group col-md-6">
        <label for="city">City</label>
        <input type="text" class="form-control"  value="${data.userCity}" id="city">
    </div>
    <div class="form-group col-md-4">
        <label for="province">Province</label>
        <input type="text" class="form-control"  value="${data.userProvice}" id="zip">
       
    </div>
    <div class="form-group col-md-2">
        <label for="zip">Zip</label>
        <input type="text" class="form-control"  value="${data.userZip}" id="zip">
    </div>
</div>

<button type="submit" onclick="logOut()" class="btn btn-dark">logout</button>

`
    container.innerHTML += (printData);

}

function logOut() {
    localStorage.clear("users");
    window.location = "index.html"
}

