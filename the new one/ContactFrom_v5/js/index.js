firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
$("#loginandsignup").hide();
$("#dashboard").show();

database=firebase.database();
var userId = firebase.auth().currentUser.uid;
var firebaseRef=database.ref('/users/').child('first_name');
var fullname=document.getElementById("fullname");
var about=document.getElementById("aboutfir");
var fireref=  firebase.database().ref('users/').child(userId).child("About");
fireref.on('value',function (datasnapshot){
  about.innerHTML=datasnapshot.val();
});
var firerefsub=  firebase.database().ref('users/').child(userId).child("Sub");
firerefsub.on('value',function (datasnapshot){
  editmysubtitle.innerHTML=datasnapshot.val();
});
//ref.on('value',gotData,errData);
//firebaseRef.on('value',function (datasnapshot){
//  fullname.innerHTML=datasnapshot.val();
//});
fullname.innerHTML=user.email;



//.ref('users/').child(userId)
//ref("users")
var query = firebase.database().ref('users/').child(userId).orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      // childData will be the actual contents of the child

      var query1 = firebase.database().ref('users/').child(userId).child(key).orderByKey();
query1.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      // childData will be the actual contents of the child

      if(key=="dishName")
      {
        var childData = childSnapshot.val();
        var newl="<br>";
        var tobeadded="<div class='col-md-6 col-lg-4'><a class='portfolio-item d-block mx-auto' href='#" +childData+"'><div class='portfolio-item-caption d-flex position-absolute h-100 w-100'><div class='portfolio-item-caption-content my-auto w-100 text-center text-white'><i class='fa fa-search-plus fa-3x'></i></div></div><img class='img-fluid' src='img/portfolio/cake.png' alt=''> <h6>"+childData+"</h6><div id='placeithere'></div></a></div>"
        var theback="<div class=‘portfolio-modal mfp-hide’ id=‘"+childData+"’><div class=‘portfolio-modal-dialog bg-white’><a class=‘close-button d-none d-md-block portfolio-modal-dismiss’ href=‘#’><i class=‘fa fa-3x fa-times’></i></a><div class=‘container text-center’><div class=‘row’><div class=‘col-lg-8 mx-auto’><h2 class=‘text-secondary text-uppercase mb-0’>Project Name</h2><hr class=‘star-dark mb-5’><img class=‘img-fluid mb-5’ src=‘img/portfolio/cabin.png’ alt=‘‘><p class=‘mb-5’><dl><dt>Coffee</dt><dd>Black hot drink</dd><dt>Milk</dt><dd>White cold drink</dd></dl></p><a class=‘btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss’ href=‘#’><i class=‘fa fa-close’></i>Close Project</a></div></div></div></div></div>"
        $("#placeItHere").append(tobeadded,theback);
      //  $("#fortheback").append(theback);

      }

  });
});
      var childData = childSnapshot.val();





  });
});
//var recipref= firebase.ref('/users/').child(userId);
//recipref.on('value',function(snapsnap){
  //snapsnap.forEach(function(childSnapshot) {
   //var childKey = childSnapshot.key;
   //var childData = childSnapshot.val();
   // ...
   //alert(childData);
//})

//$("#fullname").text();

} else {
    // No user is signed in.
    //alert("Invalid credentials. Please try again.");
$("#dashboard").hide();
$("#loginandsignup").show();
  }
});

function gotData(data){
  console.log(data.val());
}
function errData(err){
  console.log(err);
}

$('.form').find('input, textarea').on('keyup blur focus', function (e) {

  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight');
			} else {
		    label.removeClass('highlight');
			}
    } else if (e.type === 'focus') {

      if( $this.val() === '' ) {
    		label.removeClass('highlight');
			}
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {

  e.preventDefault();

  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();

  $(target).fadeIn(600);

});


$("#loginBtn").click(
  function(){
    var email=$("#loginEmail").val();
    var pass=$("#loginPass").val();

    if(email!="" && pass!=""){
      $("#loginProgress").show();
      $("#loginBtn").hide();
    }

    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
  // ...
});
  }
);

$("#signoutBtn").click(
  function(){
    firebase.auth().signOut().then(function() {
  // Sign-out successful.

}).catch(function(error) {
  // An error happened.
});
  }
);

$("#register").click(
  function(){

    var email=$("#regEmail").val();
    var password=$("#regPass").val();
    var fname=$("#regfName").val();
    var lname=$("#reglName").val();

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
  // ...
});
alert( "you have successfully registered");
// Get a reference to the database service
var databaseRef = firebase.database().ref('users/' );
var userId = firebase.auth().currentUser;
var uid=firebase.database().ref().child('users').push().key;
var data={
  uid:uid,
  mail:email,
  first_name:fname,
  last_name:lname
}
//alert(data);
var updates={};
updates['/users/' +uid]=data; //'/users' +uid
firebase.database().ref().update(updates);

/*  firebase.database().ref('users/' ).set({
    fname: fname,
    lname: lname,
    email: email,

  }).catch(function(error){
    var errormsg=error.message;
    console.log(errormsg);
  });
*/
  }
);



/*
Polymer({
  is: 'my-notes',
  properties:{
    notes:{
      type:Object
    }
  },
  add: function(){
    this.$.query.ref.push({
      content:this.input.value
    });
this.$.input.value=null;
  }
});
*/


$('#justadd').click(
  function(){

    //var userId=firebase.auth().currentUser.uid;
    //alert(userId);

    var dishname=$("#dishName").val();
    var time=$("#dishTime").val();
    var type=$("#dishType").val();
    var health=$("#dishHealth").val();
    var fromcost=$("#dishFromcost").val();
    var tocost=$("#dishTocost").val();
    var ingredients=$("#dishIngredients").val();
    var servings=$("#dishServings").val();
    var description=$("#dishDescription").val();



    //var databaseRef = firebase.database().ref('users/' );
    var userId = firebase.auth().currentUser.uid;
    var uid=firebase.database().ref('users/').child(userId).push().key;
    //alert(uid);

    var data={
        userId:userId,
        dishName:dishname,
        dishTime: time,
       dishtype:type,
      //  dishHealth:health,
        //dishFromcost:fromcost,
      //  dishTocost:tocost,
        dishIngredients:ingredients,
        dishServings: servings,
        dishDescription: description
    }
//alert(time);
    var updates={};
    updates['/users/' +userId+ '/'+uid]=data; //'/users' +uid
    firebase.database().ref().update(updates);
//    firebase.database().ref().child('users').push().data;
alert("reached");

  }
);


$("#aboutmeedit").click(
  function(){
    var text=prompt("Write a description about yourself");
    if(text!=null)
    {
    //  document.getElementById("aboutfir").innerHTML=text;
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('users/').child(userId).child("About");
      //alert(uid);


  //alert(time);
      var updates={};
      updates['/users/' +userId+ '/'+"About"]=text; //'/users' +uid
      firebase.database().ref().update(updates);
    }
  }
);

$("#editsubbutton").click(
  function(){
    var text=prompt("Write a description about yourself");
    if(text!=null)
    {
        var userId = firebase.auth().currentUser.uid;
        var updates={};
        updates['/users/' +userId+ '/'+"Sub"]=text; //'/users' +uid
        firebase.database().ref().update(updates);
      }
  }
);
