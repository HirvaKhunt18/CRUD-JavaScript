
var submitForm = document.querySelector("#form");
var allInput = submitForm.querySelectorAll("input");
var addUser = document.querySelector("#adduser");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close");
addUser.onclick = function () {
    modal.classList.add("active");

}
closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    var i;
    for (i = 0; i < allInput.length; i++) {
        allInput[i].value = "";
    }
});

//global variable

var allData = [];
var idEl = document.querySelector("#id");
var fnameEl = document.querySelector("#fname");
var lnameEl = document.querySelector("#lname");
var ageEl = document.querySelector("#age");
var genderEl = document.getElementsByName("gender");
var emailEl = document.querySelector("#email");
var countryEl = document.querySelector("#country");
var stateEl = document.querySelector("#state");
var cityEl = document.querySelector("#city");
var quliEl = document.querySelector("#quli");
var it = document.querySelector("#IT");
var ce = document.querySelector("#CE");
var submitBtn = document.querySelector("#submitBtn");
var updateBtn = document.querySelector("#updateBtn");
var submitForm = document.querySelector("#form");
var mailformat = /^([A-Za-z0-9.\-]+)@([A-Za-z0-9-]+).([a-z]{2,20})$/;





//CASCADE DROPDOWN

var worldData = {
    USA: {
        California: ["Los Angeles", "San Diego", "Sacramento"],
        Texas: ["Houston", "Austin", "Dallas"],
        Florida: ["Miami", "Orlando", "Tampa"],
    },
    India: {
        Gujarat: ["Rajkot", "Ahemdabad", "Junagadh"],
        WestBengal: ["Kolkata", "Silliguri", "Durgapur"],
        TamilNadu: ["Chennai", "Madurai"],
        Karnataka: ["Bangalore", "Mangalore"],

    },
    Canada: {
        Alberta: ["Calgary", "Edmonton", "Red Deer"],
        BritishColumbia: ["Vancouver", "Kelowna"],
        Manitoba: ["Winnipeg", "Brandon"],
    },
    Germany: {
        Bavaria: ["Munich", "Nuremberg"],
        NorthRhine: ["Cologne", "Düsseldorf"],
    },
}
window.onload = function () {
    //  var countryEl = document.getElementById("country"),
    //      stateEl = document.getElementById("state"),
    //      cityEl = document.getElementById("city");

    for (var country in worldData) {
        countryEl.options[countryEl.options.length] = new Option(country, country);
    }

    countryEl.onchange = function () {
        stateEl.length = 1;
        cityEl.length = 1;
        if (this.selectedIndex < 1) return;
        for (var state in worldData[this.value]) {
            stateEl.options[stateEl.options.length] = new Option(state, state);
        }
    };
    countryEl.onchange();
    stateEl.onchange = function () {
        cityEl.length = 1;
        if (this.selectedIndex < 1) return;
        var city = worldData[countryEl.value][this.value];
        for (var i = 0; i < city.length; i++) {
            cityEl.options[cityEl.options.length] = new Option(city[i], city[i]);
        }



    };


};


//submit part 
submitBtn.onclick = function (e) {
    e.preventDefault();

    if (validateData()) {
        submitData();
        submitForm.reset('');
        closeBtn.click();
        getDataFromLocal();

    }
};

if (localStorage.getItem("allData") != null) {

    allData = JSON.parse(localStorage.getItem("allData"));

}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}
function validateData() {
    let isValid = true;
    if (fname.value === '') {
        setError(fname, '*Please Enter First Nmae');
        isValid = false;
    } else {
        setSuccess(fname, '');
    }


    if (lnameEl.value == "") {
        setError(lname, "*Please Enter Last Name ");
        isValid = false;
    } else {
        setSuccess(lname, '');
    }


    if (ageEl.value == "") {
        setError(age, "*Please Enter Age ");
        isValid = false;
    } else {
        setSuccess(age, '');
    }


    if ((genderEl[0].checked == false) && (genderEl[1].checked == false)) {
        setError(gender, "*Please Select Gender ");
        isValid = false;
    } else {
        setSuccess(gender, '');
    }


    if (emailEl.value.match(mailformat)) {
        setSuccess(email, '');
    } else {
        setError(email, "*Please Enter Valid Email Address");
        isValid = false;
    }


    if (countryEl.value == 0) {
        setError(country, "*Please Select Country ");
        isValid = false;
    } else {
        setSuccess(country, '');
    }


    if (stateEl.value == 0) {
        setError(state, "*Please Select State ");
        isValid = false;
    } else {
        setSuccess(state, '');
    }


    if (cityEl.value == 0) {
        setError(city, "*Please Select City ");
        isValid = false;
    } else {
        setSuccess(city, '');
    }


    if ((ce.checked || it.checked) == 0) {
        setError(quli, "*Please Select at least one course ");
        isValid = false;
    } else {
        setSuccess(quli, '');
    }

    if (isValid) {
        return true;
    } else {
        return false;
    }
};

function submitData() {

    let q = "";
    if (ce.checked && it.checked) {
        q = `${ce.value},${it.value}`;
    }
    else if (ce.checked) {
        q = ce.value;
    }
    else if (it.checked) {
        q = it.value;
    }

    setTimeout(function () {
        window.location.reload();
    }, 10);


    allData.push({
        fname: fnameEl.value,
        lname: lnameEl.value,
        age: ageEl.value,
        gender: genderEl[0].checked ? "Female" : "male",
        email: emailEl.value,
        country: countryEl.value,
        state: stateEl.value,
        city: cityEl.value,
        quli: q
    });
       
    var userString = JSON.stringify(allData);
    localStorage.setItem("allData", userString);
   
   
    
    alert("Data Inserted Successfully!");
    
    
}

//Swal.fire("Inserted", "Data Inserted Successfully !");
//showing data on table from localstorage

var tableData = document.querySelector("#datatable");
const getDataFromLocal = () => {
    tableData.innerHTML = "";
    allData.forEach((data, index) => {

        tableData.innerHTML += `
            <tr index='${index}'>
                <td>${index + 1} </td>
                <td>${data.fname}</td>
                <td>${data.lname}</td>
                <td>${data.age} </td>
                <td>${data.gender}</td>
                <td>${data.email}</td>
                <td>${data.country}</td>
                <td>${data.state}</td>
                <td>${data.city}</td>
                <td>${data.quli}</td>
                <td>
                    <button class="btn btn-sm btn-success"  id="editbtn">
                        <i class="fa fa-edit"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" id="delbtn">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>`
    });

    //delete button
    var i;
    var allDelBtn = document.querySelectorAll("#delbtn");

    for (i = 0; i < allDelBtn.length; i++) {
        allDelBtn[i].onclick = function () {
            var tr = this.parentElement.parentElement;
            let id = tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this record!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    allData.splice(id, 1);
                    localStorage.setItem("allData", JSON.stringify(allData));
                    tr.remove();
                    swal("Record has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Record is safe!");
                }
            });
            
        };
    }




    //update data
    var allEdit = document.querySelectorAll("#editbtn");

    for (i = 0; i < allEdit.length; i++) {
        allEdit[i].onclick = function () {

            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("td");

            var index = tr.getAttribute("index");
            var fname = td[1].innerHTML;
            var lname = td[2].innerHTML;
            var age = td[3].innerHTML;
            var gender = td[4].innerHTML;
            var email = td[5].innerHTML;
            var country = td[6].innerHTML;
            var state = td[7].innerHTML;
            var city = td[8].innerHTML;
            var q = td[9].innerHTML;

            addUser.click();
            document.getElementById('userformtitle').innerHTML= 'Update Details';
            document.getElementById('submitBtn').style.display= 'none';
            document.getElementById('updateBtn').style.visibility= 'visible';
            document.getElementById('updateBtn').style.background = 'blue';
          


            fnameEl.value = fname;
            lnameEl.value = lname;
            ageEl.value = parseInt(age);
            if (gender == "Female") genderEl[0].checked = true;
            else genderEl[1].checked = true;
            emailEl.value = email;

            countryEl.value = country;
            const event = new Event('change');
            countryEl.dispatchEvent(event);

            stateEl.value = state;
            const event1 = new Event('change');
            stateEl.dispatchEvent(event1);

            cityEl.value = city;
            if (q == "CE,IT") {
                ce.checked = true;
                it.checked = true;
            }
            else if (q == "CE") ce.checked = true;
            else it.checked = true;





            updateBtn.onclick = function () {

                if (ce.checked == true && it.checked == true) {
                    q = "CE,IT";
                }
                else if (ce.checked == true) q = "CE";
                else q = "IT";

                allData[index] = {
                    fname: fnameEl.value,
                    lname: lnameEl.value,
                    age: ageEl.value,
                    gender: genderEl[0].checked ? "Female" : "male",
                    email: emailEl.value,
                    country: countryEl.value,
                    state: stateEl.value,
                    city: cityEl.value,
                    quli: q
                }
                
                localStorage.setItem("allData", JSON.stringify(allData));
               if(swal){
                swal("Updated", "Data Updated Successfully !");
            }
            setTimeout(function () {
               window.location.reload();
            }, 1200);
                
               


            }
        }
    }
};
getDataFromLocal();













