
fetch('news.json')
  .then(function (responseData) {
    return responseData.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log(err);
  });

function appendData(data)
{
    var containerData = document.getElementById("newsList");
    for (var i = 0; i < data.item.length; ++i) {
          var div = document.createElement("div");
          var output = "<div class='newsItem card' id='" + i + "'><h3 class='card-title'>";
          output += data.item[i].title + "</h3>" + "<br/><p class='card-text'>";
          output += data.item[i].description + "</p><a class='btn btn-primary' href=" + data.item[i].link;
          output += ">Go to Website</a><br/><br/></div>";
          div.innerHTML = output;
          containerData.appendChild(div);
    }
}

$(document).ready(function() {
  $("#newsList").fadeIn(3000);
})