//define functions here
var tok = "952051ffcccee38cc65f1fa9c75cdd60f78ace3b"

var url = "https://api.github.com"

var createGist = function(file_name, content, description, token){
  var data = {
    "description": description,
    "public": true,
    "files": {
      [file_name]: {
        "content": content
      }
    }
  }

  var tokenSubmit = "token " + token
  $.ajax({
    url: url + '/gists',
    method: 'POST',
    data: JSON.stringify(data),
    dataType: 'json',
    headers: {
      Authorization: tokenSubmit
    },
    success: function(response){
      var username = response["owner"]["login"]
      myGists(username, token);
    }
  })
};

var myGists = function (username, token){
  $.ajax({
    url: url + `/users/` + username + `/gists`,
    method: `GET`,
    success: function(response){
      $('ul.my-gists').empty()
      response.forEach(function(resp){
        console.log(response)
        var name = Object.keys(resp.files)[0]
        var gist_url = resp.html_url
        $('ul.my-gists').append('<li><a href="' + gist_url + '">' + name + '</a></li>')
      })
    },
    headers: {
      Authorization: "token " + token
    }
  })
};

var bindCreateButton = function() {
  // call functions here
  var descr = $('input[name="description"]').val();
  var filename = $('input[name="file_name"]').val();
  var cont = $('textarea[name="contents"]').val();
  var token = $('input[name="token"]').val();
  createGist(filename, cont, descr, token);


};

$(document).ready(function(){


});
